// These exports expose the v1 interface and objects.
var sdk = require("remote-pay-cloud-api");

// These exports expose the beta method of using the Clover device
var Clover = require("./Clover.js");
var CloverOAuth = require("./CloverOAuth.js");
var CloverError = require("./CloverError.js");
var CardEntryMethods = require("./CardEntryMethods.js");
var WebSocketDevice = require("./WebSocketDevice.js");
var RemoteMessageBuilder = require("./RemoteMessageBuilder.js");
var LanMethod = require("./LanMethod.js");
var XmlHttpSupport = require("./xmlHttpSupport.js");
var Endpoints = require("./Endpoints.js");
var CloverID = require("./CloverID.js");
var KeyPress = require("./KeyPress.js");
var VoidReason = require("./VoidReason.js");
var CookiePersistance = require("./CookiePersistance.js");
var JSONToCustomObject = require("./JSONToCustomObject.js");
var MethodToMessage = require("./MethodToMessage.js");

var base = sdk.base;
var customers = sdk.customers;
var device = sdk.device;
var hours = sdk.hours;
var inventory = sdk.inventory;
var order = sdk.order;
var payments = sdk.payments;
var printer = sdk.printer;
var remotepay = sdk.remotepay;
var remotemessage = sdk.remotemessage;

var CloverConnectorImpl = require("./CloverConnectorImpl.js");
var CloverConnectorFactory = require("./CloverConnectorFactory.js");
var DelegateCloverConnectorListener = require("./DelegateCloverConnectorListener.js");
var DebugCloverConnectorListener = require("./DebugCloverConnectorListener.js");

//var Logger = require('./Logger.js');
var DebugConfig = require('./DebugConfig.js');

// These exports expose the v1.2 CloverConnector and supporting objects
var version = '1.2.0';
var CloverConnector = require('./dist/com/clover/remote/client/CloverConnector.js').CloverConnector;
var CloverDeviceFactory = require('./dist/com/clover/remote/client/device/CloverDeviceFactory.js').CloverDeviceFactory;
var CloverTransport = require('./dist/com/clover/remote/client/transport/CloverTransport.js').CloverTransport;
var CloverTransportObserver = require('./dist/com/clover/remote/client/transport/CloverTransportObserver.js').CloverTransportObserver;
var WebSocketCloverTransport = require('./dist/com/clover/remote/client/transport/websocket/WebSocketCloverTransport.js').WebSocketCloverTransport;
var Logger = require('./dist/com/clover/remote/client/util/Logger.js').Logger;

// Export all of the pieces.
module.exports = {
    Clover: Clover,
    CloverOAuth: CloverOAuth,
    CloverError: CloverError,
    CardEntryMethods: CardEntryMethods,
    WebSocketDevice: WebSocketDevice,
    RemoteMessageBuilder: RemoteMessageBuilder,
    LanMethod: LanMethod,
    XmlHttpSupport: XmlHttpSupport,
    Endpoints: Endpoints,
    CloverID: CloverID,
    KeyPress: KeyPress,
    VoidReason: VoidReason,
    CookiePersistance: CookiePersistance,
    JSONToCustomObject: JSONToCustomObject,
    MethodToMessage: MethodToMessage,
    base: base,
    customers: customers,
    device: device,
    hours: hours,
    inventory: inventory,
    order: order,
    payments: payments,
    printer: printer,
    remotepay: remotepay,
    remotemessage: remotemessage,
    CloverConnectorImpl: CloverConnectorImpl,
    CloverConnectorFactory: CloverConnectorFactory,
    DelegateCloverConnectorListener: DelegateCloverConnectorListener,
    DebugCloverConnectorListener: DebugCloverConnectorListener,
    DebugConfig: DebugConfig,
    version: version,
    CloverConnector: CloverConnector,
    CloverDeviceFactory: CloverDeviceFactory,
    CloverTransport: CloverTransport,
    CloverTransportObserver: CloverTransportObserver,
    WebSocketCloverTransport: WebSocketCloverTransport,
    Logger: Logger
}

//
// Expose the module.
//
// module.exports = exports['default'];
