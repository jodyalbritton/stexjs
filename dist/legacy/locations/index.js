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

function list(client, url, locationsAccum) {
    var _this = this;

    var options = {
        method: 'GET',
        url: client.url + "locations",
        headers: client.headers,
        json: true
    };

    return rp(options).then(function (response) {
        (0, _newArrowCheck3.default)(this, _this);

        if (!locationsAccum) {
            locationsAccum = [];
        }
        locationsAccum = locationsAccum.concat(response.items);
        if (response._links) {
            return getLocations(options, response._links.next.href, locationsAccum);
        }
        return locationsAccum;
    }.bind(this)).catch(function (err) {
        console.log('Error getting locations: ' + String(err));
    });
}

function show(client, locationId) {
    var options = {
        method: 'GET',
        url: client.url + "locations/" + locationId,
        headers: client.headers,
        json: true
    };

    return rp(options);
}
//# sourceMappingURL=index.js.map