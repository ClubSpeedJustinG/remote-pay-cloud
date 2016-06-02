/**
 * Autogenerated by Avro
 * 
 * DO NOT EDIT DIRECTLY
 */

// Prototype.js required
require("prototype");
var payments_CardType = require("../payments/CardType");
var payments_Payment = require("../payments/Payment");
var payments_Type = require("../payments/Type");

  /**
  * @constructor
  */
  Authorization = Class.create( {
    /**
    * Initialize the values for this.
    * @private
    */
    initialize: function() {
      this._class_ = Authorization;
      this.id = undefined;
      this.payment = undefined;
      this.tabName = undefined;
      this.amount = undefined;
      this.cardType = undefined;
      this.last4 = undefined;
      this.authcode = undefined;
      this.type = undefined;
      this.note = undefined;
      this.closingPayment = undefined;
      this.createdTime = undefined;
    },

    /**
    * Set the field value
    * Unique identifier
    *
    * @param {String} id 
    */
    setId: function(id) {
      this.id = id;
    },

    /**
    * Get the field value
    * Unique identifier
      * @return {String} 
    */
    getId: function() {
      return this.id;
    },

    /**
    * Set the field value
    * Payment that the auth was opened with
    *
    * @param {Payment} payment 
    */
    setPayment: function(payment) {
      this.payment = payment;
    },

    /**
    * Get the field value
    * Payment that the auth was opened with
      * @return {Payment} 
    */
    getPayment: function() {
      return this.payment;
    },

    /**
    * Set the field value
    * Name of tab
    *
    * @param {String|Null} tabName 
    */
    setTabName: function(tabName) {
      this.tabName = tabName;
    },

    /**
    * Get the field value
    * Name of tab
      * @return {String|Null} 
    */
    getTabName: function() {
      return this.tabName;
    },

    /**
    * Set the field value
    * Amount authorized
    *
    * @param {Number} amount must be a long integer
    */
    setAmount: function(amount) {
      this.amount = amount;
    },

    /**
    * Get the field value
    * Amount authorized
      * @return {Number} must be a long integer
    */
    getAmount: function() {
      return this.amount;
    },

    /**
    * Set the field value
    * Type of credit card used for authorization
    *
    * @param {CardType} cardType 
    */
    setCardType: function(cardType) {
      this.cardType = cardType;
    },

    /**
    * Get the field value
    * Type of credit card used for authorization
      * @return {CardType} 
    */
    getCardType: function() {
      return this.cardType;
    },

    /**
    * Set the field value
    * Last 4 digits of credit card used for authorization
    *
    * @param {String} last4 
    */
    setLast4: function(last4) {
      this.last4 = last4;
    },

    /**
    * Get the field value
    * Last 4 digits of credit card used for authorization
      * @return {String} 
    */
    getLast4: function() {
      return this.last4;
    },

    /**
    * Set the field value
    * Authorization code
    *
    * @param {String} authcode 
    */
    setAuthcode: function(authcode) {
      this.authcode = authcode;
    },

    /**
    * Get the field value
    * Authorization code
      * @return {String} 
    */
    getAuthcode: function() {
      return this.authcode;
    },

    /**
    * Set the field value
    * @param {Type} type 
    */
    setType: function(type) {
      this.type = type;
    },

    /**
    * Get the field value
    * @return {Type} 
    */
    getType: function() {
      return this.type;
    },

    /**
    * Set the field value
    * @param {String|Null} note 
    */
    setNote: function(note) {
      this.note = note;
    },

    /**
    * Get the field value
    * @return {String|Null} 
    */
    getNote: function() {
      return this.note;
    },

    /**
    * Set the field value
    * Payment that the auth was closed with
    *
    * @param {Payment} closingPayment 
    */
    setClosingPayment: function(closingPayment) {
      this.closingPayment = closingPayment;
    },

    /**
    * Get the field value
    * Payment that the auth was closed with
      * @return {Payment} 
    */
    getClosingPayment: function() {
      return this.closingPayment;
    },

    /**
    * Set the field value
    * Time authorization was recorded on server
    *
    * @param {Number} createdTime must be a long integer
    */
    setCreatedTime: function(createdTime) {
      this.createdTime = createdTime;
    },

    /**
    * Get the field value
    * Time authorization was recorded on server
      * @return {Number} must be a long integer
    */
    getCreatedTime: function() {
      return this.createdTime;
    },
    getMetaInfo: function(fieldName) {
      var curclass = this._class_;
      do {
        var fieldMetaInfo = curclass._meta_.fields[fieldName];
        if(fieldMetaInfo) {
          return fieldMetaInfo;
        }
        curclass = curclass.superclass;
      } while(curclass);
      return null;
    },

    toString: function() {
      return JSON.stringify(this);
    }

  });

Authorization._meta_ =  {fields:  {}};
Authorization._meta_.fields["id"] = {};
Authorization._meta_.fields["id"].type = String;
Authorization._meta_.fields["payment"] = {};
Authorization._meta_.fields["payment"].type = payments_Payment;
Authorization._meta_.fields["tabName"] = {};
Authorization._meta_.fields["tabName"].type = String;
Authorization._meta_.fields["amount"] = {};
Authorization._meta_.fields["amount"].type = Number;
Authorization._meta_.fields["cardType"] = {};
Authorization._meta_.fields["cardType"].type = payments_CardType;
Authorization._meta_.fields["last4"] = {};
Authorization._meta_.fields["last4"].type = String;
Authorization._meta_.fields["authcode"] = {};
Authorization._meta_.fields["authcode"].type = String;
Authorization._meta_.fields["type"] = {};
Authorization._meta_.fields["type"].type = payments_Type;
Authorization._meta_.fields["note"] = {};
Authorization._meta_.fields["note"].type = String;
Authorization._meta_.fields["closingPayment"] = {};
Authorization._meta_.fields["closingPayment"].type = payments_Payment;
Authorization._meta_.fields["createdTime"] = {};
Authorization._meta_.fields["createdTime"].type = Number;

//
// Expose the module.
//
if ('undefined' !== typeof module) {
module.exports = Authorization;
}
