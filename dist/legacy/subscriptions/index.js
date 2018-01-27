'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createDeviceSubscription = createDeviceSubscription;
exports.deleteAppSubscriptions = deleteAppSubscriptions;
var request = require('request');
var rp = require('request-promise');

function createDeviceSubscription(client, appId, deviceId, componentId, capability, attribute, value, stateChangeOnly, subscriptionName) {
    var body = {

        sourceType: 'DEVICE',
        device: {
            deviceId: deviceId,
            componentId: componentId,
            capability: capability,
            attribute: attribute,
            value: value,
            stateChangeOnly: stateChangeOnly,
            subscriptionName: subscriptionName
        }

    };

    var options = {
        method: 'POST',
        url: client.url + "installedapps/" + appId + "/subscriptions",
        headers: client.headers,
        body: body,
        json: true
    };

    return rp(options);
}

function deleteAppSubscriptions(client, appId) {

    var options = {
        method: 'DELETE',
        url: client.url + "installedapps/" + appId + "/subscriptions",
        headers: client.headers,
        body: body,
        json: true
    };

    return rp(options);
}
//# sourceMappingURL=index.js.map