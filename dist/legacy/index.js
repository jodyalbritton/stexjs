'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StexClient = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _devices = require('./devices');

var devices = _interopRequireWildcard(_devices);

var _apps = require('./apps');

var apps = _interopRequireWildcard(_apps);

var _locations = require('./locations');

var locations = _interopRequireWildcard(_locations);

var _installedapps = require('./installedapps');

var installedApps = _interopRequireWildcard(_installedapps);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StexClient = exports.StexClient = function () {
  function StexClient(access_token) {
    (0, _classCallCheck3.default)(this, StexClient);

    this.access_token = access_token;
    this.url = 'https://api.smartthings.com/v1/';
    this.headers = {
      'Authorization': 'Bearer ' + access_token,
      'Content-type': 'application/json'
    };
  }

  (0, _createClass3.default)(StexClient, [{
    key: 'listLocations',
    value: function listLocations(client, locationsAccum) {
      return locations.list(client, locationsAccum);
    }
  }, {
    key: 'showLocation',
    value: function showLocation(client, locationId) {
      return locations.show(client, locationId);
    }
  }, {
    key: 'listDevices',
    value: function listDevices(client, capability, devicesAccum) {
      return devices.list(client, capability, devicesAccum);
    }
  }, {
    key: 'showDevice',
    value: function showDevice(client, deviceId) {
      return devices.getOne(client, deviceId);
    }
  }, {
    key: 'showDeviceFullStatus',
    value: function showDeviceFullStatus(client, deviceId) {
      return devices.getFullStatus(client, deviceId);
    }
  }, {
    key: 'showDeviceComponentStatus',
    value: function showDeviceComponentStatus(client, deviceId, component) {
      return devices.getComponentStatus(client, deviceId, component);
    }
  }, {
    key: 'showDeviceCapabilityStatus',
    value: function showDeviceCapabilityStatus(client, deviceId, componentId, capabilityId) {
      return devices.getCapabilityStatus(client, deviceId, componentId, capabilityId);
    }
  }, {
    key: 'executeDeviceCommands',
    value: function executeDeviceCommands(client, deviceId, componentId, capabilityId, command, args) {
      return devices.executeCommand(client, deviceId, componentId, capabilityId, command, args);
    }
  }, {
    key: 'listApps',
    value: function listApps(client, appsAccum) {
      return apps.list(client, appsAccum);
    }
  }, {
    key: 'showApp',
    value: function showApp(client, appId) {
      return apps.show(client, appId);
    }
  }]);
  return StexClient;
}();
//# sourceMappingURL=index.js.map