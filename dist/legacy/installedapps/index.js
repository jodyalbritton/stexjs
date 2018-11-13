'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _newArrowCheck2 = require('babel-runtime/helpers/newArrowCheck');

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

exports.list = list;
exports.show = show;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('request');
var rp = require('request-promise');

function list(client, url, appsAccum) {
    var _this = this;

    var options = {
        method: 'GET',
        url: client.url + "installedapps",
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
        url: client.url + "installedapps/" + appId,
        headers: client.headers,
        json: true
    };

    return rp(options);
}
//# sourceMappingURL=index.js.map