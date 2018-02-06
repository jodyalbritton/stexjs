'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _newArrowCheck2 = require('babel-runtime/helpers/newArrowCheck');

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

exports.list = list;
exports.getOne = getOne;
exports.getFullStatus = getFullStatus;
exports.getComponentStatus = getComponentStatus;
exports.getCapabilityStatus = getCapabilityStatus;
exports.executeCommand = executeCommand;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('request');
var rp = require('request-promise');

function list(client, capability, url, devicesAccum) {
    var _this = this;

    var options = {
        method: 'GET',
        url: url ? url : client.url + "devices",
        headers: client.headers,
        qs: capability ? { capability: capability } : {},
        json: true
    };

    return rp(options).then(function (response) {
        (0, _newArrowCheck3.default)(this, _this);

        if (!devicesAccum) {
            devicesAccum = [];
        }
        devicesAccum = devicesAccum.concat(response.items);
        if (response._links.next) {
            return list(options, capability, response._links.next.href, devicesAccum);
        }
        return devicesAccum;
    }.bind(this)).catch(function (err) {
        console.log('Error getting devices: ' + String(err));
    });
}

function getOne(client, deviceId) {
    var _this2 = this;

    var options = {
        method: 'GET',
        url: client.url + "devices/" + deviceId,
        headers: client.headers,
        json: true
    };

    return rp(options).then(function (response) {
        (0, _newArrowCheck3.default)(this, _this2);

        return response;
    }.bind(this)).catch(function (err) {
        console.log('Error getting device: ' + String(err));
    });
}

function getFullStatus(client, deviceId) {
    var _this3 = this;

    var options = {
        method: 'GET',
        url: client.url + "devices/" + deviceId + "/status",
        headers: client.headers,
        json: true
    };

    return rp(options).then(function (response) {
        (0, _newArrowCheck3.default)(this, _this3);

        return response;
    }.bind(this)).catch(function (err) {
        console.log('Error getting device status: ' + String(err));
    });
}

function getComponentStatus(client, deviceId, componentId) {
    var _this4 = this;

    var options = {
        method: 'GET',
        url: client.url + "devices/" + deviceId + "/components/" + componentId + "/status",
        headers: client.headers,
        json: true
    };

    return rp(options).then(function (response) {
        (0, _newArrowCheck3.default)(this, _this4);

        return response;
    }.bind(this)).catch(function (err) {
        console.log('Error getting device component status: ' + String(err));
    });
}

function getCapabilityStatus(client, deviceId, componentId, capabilityId) {
    var _this5 = this;

    var options = {
        method: 'GET',
        url: client.url + "devices/" + deviceId + "/components/" + componentId + "/capabilities/" + capabilityId + "/status",
        headers: client.headers,
        json: true
    };

    return rp(options).then(function (response) {
        (0, _newArrowCheck3.default)(this, _this5);

        return response;
    }.bind(this)).catch(function (err) {
        console.log('Error getting device capability status: ' + String(err));
    });
}

function executeCommand(client, deviceId, componentId, capabilityId, command, args) {
    var _this6 = this;

    var body = {
        commands: [{
            component: componentId,
            capability: capabilityId,
            command: command,
            arguments: args
        }]
    };

    var options = {
        method: 'POST',
        url: client.url + "devices/" + deviceId + "/commands",
        headers: client.headers,
        body: body,
        json: true
    };

    return rp(options).then(function (response) {
        (0, _newArrowCheck3.default)(this, _this6);

        return response;
    }.bind(this)).catch(function (err) {
        console.log('Error executing command: ' + String(err));
    });
}
//# sourceMappingURL=index.js.map