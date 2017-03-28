import sdk = require('remote-pay-cloud-api');
import http = require('http');

import {RemoteMessageParser} from '../../../../json/RemoteMessageParser';

import {PairingDeviceConfiguration} from '../PairingDeviceConfiguration';
import {CloverDeviceConfiguration} from '../../device/CloverDeviceConfiguration';
import {CloverDevice} from '../../device/CloverDevice';
import {CloverWebSocketClient} from './CloverWebSocketClient';

import {CloverTransport} from '../CloverTransport';
import {Logger} from '../../util/Logger';
import {CloverWebSocketClientListener} from "./CloverWebSocketClientListener";
import {CloverTransportObserver} from '../CloverTransportObserver';
import {WebSocketCloverDeviceConfiguration} from "../../device/WebSocketCloverDeviceConfiguration";

/**
 * WebSocket Clover Transport
 * 
 * This is a websocket implementation of the Clover Transport.
 */
export class WebSocketCloverTransport extends CloverTransport implements CloverWebSocketClientListener {

	// Create a logger
	private logger: Logger = Logger.create();

	private posName: string;
	private serialNumber: string;
	private authToken: string;

	private reconnectDelay: number = 3000;
	endpoint: string;

	pairingDeviceConfiguration: PairingDeviceConfiguration; // Network Pay display specific

	webSocket: CloverWebSocketClient;
	webSocketImplClass: any;

	status: string = "Disconnected";
	/**
	 * prevent reconnects if shutdown was requested
	 */
	shutdown: boolean = false;

	// KeyStore trustStore; // nope, browser handled.

	isPairing: boolean = true;

	messageParser : RemoteMessageParser;

	reconnector = function() {
        if (!this.shutdown) {
            try {
                this.initialize(this.endpoint);
            } catch (e) {
                this.reconnect();
            }
        }
    }.bind(this);

    public reconnect(): void {
        if (this.shutdown) {
            this.logger.debug("Not attempting to reconnect, shutdown...");
            return;
        }
        setTimeout(this.reconnector, this.reconnectDelay);
    }

    public static METHOD: string = "method";
	public static PAYLOAD: string = "payload";

    public constructor(endpoint:string,
                       heartbeatInterval:number,
                       reconnectDelay:number,
                       retriesUntilDisconnect:number,
                       posName:string,
                       serialNumber:string,
                       authToken:string,
                       webSocketImplClass:any,
                       friendlyId?:string,
                       allowOvertakeConnection?:boolean) {
	//public constructor(deviceConfiguration: WebSocketCloverDeviceConfiguration) {
		super();  // implicit?
		this.endpoint = endpoint;
		// this.heartbeatInterval = Math.max(10, heartbeatInterval);
		this.reconnectDelay = Math.max(0, reconnectDelay);
		// this.maxPingRetriesBeforeDisconnect = Math.max(0, retriesUntilDisconnect);
		this.posName = posName;
		this.serialNumber = serialNumber;
		this.authToken = authToken;
		this.webSocketImplClass = webSocketImplClass;

		// from WebSocketCloverDeviceConfiguration.getMessagePackageName, which needs to be changeable
		// 'com.clover.remote_protocol_broadcast.app'
		this.messageParser = RemoteMessageParser.getDefaultInstance();

		this.initialize(this.endpoint);
	}

	public sendMessage(message: string): number {
		// let's see if we have connectivity

		if(this.webSocket != null && this.webSocket.isOpen()) {
			try {
				this.webSocket.send(message);
			} catch(e){
				this.reconnect();
			}
			return 0;
		} else {
            this.reconnect();
		}
		return -1;
	}

	private clearWebsocket(): void { // synchronized
		if (this.webSocket != null) {
			this.webSocket.clearListener();
		}
		this.webSocket = null;
	}

	private initialize(deviceEndpoint: string): void  { // synchronized

		if (this.webSocket != null) {
			if (this.webSocket.isOpen() || this.webSocket.isConnecting()) {
				return;
			} else {
				this.clearWebsocket();
			}
		}

		this.webSocket = new CloverWebSocketClient(deviceEndpoint, this, 5000, this.webSocketImplClass);

		this.webSocket.connect();
		this.logger.debug('connection attempt done.');
	}

	public dispose():void {
		this.shutdown = true;
		if (this.webSocket != null) {
			this.notifyDeviceDisconnected();
			try {
				this.webSocket.close();
			} catch (e) {
				this.logger.error('error disposing of transport.', e);
			}
		}
		this.clearWebsocket();
	}

	public connectionError(ws: CloverWebSocketClient):void {
		this.logger.debug('Not Responding...');

		if (this.webSocket == ws) {
			for (let observer of this.observers) {
				this.logger.debug('onConnectionError');
				observer.onDeviceDisconnected(this);
			}
		}
		// this.reconnect();
	}

	public onNotResponding(ws: CloverWebSocketClient): void {
		this.logger.debug('Not Responding...');
		if (this.webSocket == ws) {
			for (let observer of this.observers) {
				this.logger.debug('onNotResponding');
				observer.onDeviceDisconnected(this);
			}
		}
	}

	public onPingResponding(ws: CloverWebSocketClient): void {
		this.logger.debug("Ping Responding");
		if (this.webSocket == ws) {
			for (let observer of this.observers) {
				this.logger.debug("onPingResponding");
				observer.onDeviceReady(this);
			}
		}
	}

	public onOpen(ws: CloverWebSocketClient): void {

		this.logger.debug("Open...");
		if (this.webSocket == ws) {
			// notify connected
			this.notifyDeviceConnected();
			this.sendPairRequest();
		}
	}

	private sendPairRequest(): void {
		this.isPairing = true;
        let prm: sdk.remotemessage.PairingRequestMessage = new sdk.remotemessage.PairingRequestMessage();
		prm.setName(this.posName);
		prm.setSerialNumber(this.serialNumber);
		prm.setApplicationName(this.posName);
		prm.setAuthenticationToken(this.authToken);

		this.objectMessageSender.sendObjectMessage(prm);
	}

    public onClose(ws: CloverWebSocketClient, code: number, reason: string, remote: boolean): void {
        this.logger.debug("onClose: " + reason + ", remote? " + remote);

        if (this.webSocket == ws) {
            if(!this.webSocket.isClosing()) {
				this.webSocket.clearListener();
				this.webSocket.close();
            }
			this.clearWebsocket();
            for (let observer of this.observers) {
                this.logger.debug("onClose");
                observer.onDeviceDisconnected(this);
            }
            if(!this.shutdown) {
				this.reconnect();
            }
        }
    }

    //private extractPayloadFromRemoteMessageJson(remoteMessageJson): any {
		//// Get the sdk.remotemessage.Message type for this message
		//var responseMessageType = MethodToMessage.getType(remoteMessageJson.method);
		//// Create an instance of the message
		//if(responseMessageType) {
		//	var remotemessageMessage = new responseMessageType;
		//	// Populate the message using the remoteMessageJson, which is a json object that is a
		//	// sdk.remotemessage.RemoteMessage
		//	this.messageParser.parseMessage(remoteMessageJson, remotemessageMessage, false);
		//	// remotemessageMessage is a sdk.remotemessage.Message that is populated.
		//	return remotemessageMessage;
		//}
		//return null;
    //}
    //
    /**
     * Messed up way ts/js does function overloading
     *
     * @param ws
     * @param message
     */
    public onMessage(ws: CloverWebSocketClient, message: string): void;
    public onMessage(message: string): void;
    public onMessage(wsOrMessage: any, messageOnly?: string): void {
        if (typeof wsOrMessage == 'string') {
            super.onMessage(wsOrMessage);
        } else {
            this.onMessage_cwscl(wsOrMessage, messageOnly);
        }
    }

    public onMessage_cwscl(ws: CloverWebSocketClient, message: string): void { // CloverWebSocketClientListener
        if (this.webSocket == ws) {
            if(this.isPairing) {
                let remoteMessage: sdk.remotemessage.RemoteMessage = this.messageParser.parseToRemoteMessage(message);
                var sdkMessage: sdk.remotemessage.Message = this.messageParser.parseMessageFromRemoteMessageObj(remoteMessage);

				if(sdkMessage) {
					if (sdk.remotemessage.Method.PAIRING_CODE == sdkMessage.getMethod()) {
						this.logger.debug("Got PAIRING_CODE");
						var pcm:sdk.remotemessage.PairingCodeMessage = sdkMessage;
						var pairingCode:string = pcm.getPairingCode();
						this.pairingDeviceConfiguration.onPairingCode(pairingCode);
					} else if (sdk.remotemessage.Method.PAIRING_RESPONSE == sdkMessage.getMethod()) {
						this.logger.debug("Got PAIRING_RESPONSE");
						var response:sdk.remotemessage.PairingResponse = sdkMessage;
						if (sdk.remotemessage.PairingState.PAIRED == response.getPairingState() ||
							sdk.remotemessage.PairingState.INITIAL == response.getPairingState()) {
							this.logger.debug("Got PAIRED pair response");
							this.isPairing = false;
							this.authToken = response.getAuthenticationToken();

							try {
								this.pairingDeviceConfiguration.onPairingSuccess(this.authToken);
							} catch (e) {
								this.logger.debug("Error:" + e);
							}
							this.notifyDeviceReady();
						} else if (sdk.remotemessage.PairingState.FAILED == sdkMessage.getMethod()) {
							this.logger.debug("Got FAILED pair response");
							this.isPairing = true;
							this.sendPairRequest();
						}
					} else if (sdk.remotemessage.Method.ACK != sdkMessage.getMethod() || sdk.remotemessage.Method.UI_STATE != sdkMessage.getMethod()) {
						this.logger.debug("Unexpected method: '" + sdkMessage.getMethod() + "' while in pairing mode.");
					}
				} else {
					this.logger.warn("Unrecognized message", message)
				}
            } else {
                for (let observer of this.observers) {
                    this.logger.debug("Got message: " + message);
                    observer.onMessage(message);
                }
            }
        }
    }

    public onSendError(payloadText: string): void {
        // TODO:
        /*for (let observer of this.observers) {
         CloverDeviceErrorEvent errorEvent = new CloverDeviceErrorEvent();
         }*/
    }

    public setPairingDeviceConfiguration(pairingDeviceConfiguration: PairingDeviceConfiguration): void {
        this.pairingDeviceConfiguration = pairingDeviceConfiguration;
    }
}
