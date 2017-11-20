var navigator = require('navigator')
var device = navigator.userAgent;
var reg = /(iphone|ipad|android)/i;
var phone = device.match(reg);

module.exports = phone
