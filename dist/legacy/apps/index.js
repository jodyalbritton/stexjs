'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _newArrowCheck2 = require('babel-runtime/helpers/newArrowCheck');

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

exports.list = list;
exports.show = show;
exports.createWebhookApp = createWebhookApp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('request');
var rp = require('request-promise');

function list(client, url, appsAccum) {
    var _this = this;

    var options = {
        method: 'GET',
        url: client.url + "apps",
        headers: client.headers,
        json: true
    };

    return rp(options).then(function (response) {
        (0, _newArrowCheck3.default)(this, _this);

        if (!appsAccum) {
            appsAccum = [];
        }
        appsAccum = appsAccum.concat(response.items);
        if (response._links.next) {
            return list(options, response._links.next.href, appsAccum);
        }
        return appsAccum;
    }.bind(this)).catch(function (err) {
        console.log('Error getting apps: ' + String(err));
    });
}

function show(client, appId) {
    var options = {
        method: 'GET',
        url: client.url + "apps/" + appId,
        headers: client.headers,
        json: true
    };

    return rp(options);
}

function createWebhookApp(client, appName, displayName, description, singleInstance, targetUrl) {
    var _this2 = this;

    var body = {
        appName: appName,
        displayName: displayName,
        description: description,
        singleInstance: singleInstance,
        appType: "WEBHOOK_SMART_APP",
        webhookSmartApp: {
            targetUrl: targetUrl
        }
    };

    var options = {
        method: 'POST',
        url: client.url + "apps",
        headers: client.headers,
        body: body,
        json: true
    };

    return rp(options).then(function (response) {
        (0, _newArrowCheck3.default)(this, _this2);

        return response;
    }.bind(this)).catch(function (err) {
        console.log('Error installing app: ' + String(err));
    });
}
//# sourceMappingURL=index.js.map