(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global['sample-es6-library'] = {})));
}(this, (function (exports) { 'use strict';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classCallCheck = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

var _classCallCheck = unwrapExports(classCallCheck);

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document) && _isObject(document.createElement);
var _domCreate = function (it) {
  return is ? document.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

var $Object = _core.Object;
var defineProperty$2 = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

var defineProperty = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty$2, __esModule: true };
});

unwrapExports(defineProperty);

var createClass = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
});

var _createClass = unwrapExports(createClass);

var newArrowCheck = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
};
});

var _newArrowCheck = unwrapExports(newArrowCheck);

var request = require('request');
var rp = require('request-promise');

/**
 * Gets a list of devices
 *
 * @param {Object} client - Client object previously instantiated
 * @param {string} capability - The capability to filter by; if not specified,
 *  all devices will be returned.
 * @param {string} url - The URL to make the request to. Used to handle paging;
 *  calling clients should not need to specify this.
 * @param {Array} devicesAccum - An accumulator for recursive API calls to
 *  handle paged result sets. Calling clients should not need to specify this.
 * @returns {Object} - The request-promise for this API request.
 */
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
        _newArrowCheck(this, _this);

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

/**
 * Gets a list of devices.
 *
 * @param {Object{}} client - Client object previously instantiated
 * @param {string} deviceId - The selected Device ID
 * @returns {Object} - The request-promise for this API request.
 */
function getOne(client, deviceId) {
    var _this2 = this;

    var options = {
        method: 'GET',
        url: client.url + "devices/" + deviceId,
        headers: client.headers,
        json: true
    };

    return rp(options).then(function (response) {
        _newArrowCheck(this, _this2);

        return response;
    }.bind(this)).catch(function (err) {
        console.log('Error getting device: ' + String(err));
    });
}

/**
 * Get full status of a device.
 *
 * @param {Object{}} client - Client object previously instantiated
 * @param {string} deviceId - the selected Device ID
 * @returns {Object} - The request-promise for this API request.
 */

function getFullStatus(client, deviceId) {
    var _this3 = this;

    var options = {
        method: 'GET',
        url: client.url + "devices/" + deviceId + "/status",
        headers: client.headers,
        json: true
    };

    return rp(options).then(function (response) {
        _newArrowCheck(this, _this3);

        return response;
    }.bind(this)).catch(function (err) {
        console.log('Error getting device status: ' + String(err));
    });
}

/**
* Get component status of a device.
*
* @param {Object{}} client - Client object previously instantiated
* @param {string} deviceId - the selected Device ID
* @param {string} componentId - the slected component ID
* @returns {Object} - The request-promise for this API request.
*/

function getComponentStatus(client, deviceId, componentId) {
    var _this4 = this;

    var options = {
        method: 'GET',
        url: client.url + "devices/" + deviceId + "/components/" + componentId + "/status",
        headers: client.headers,
        json: true
    };

    return rp(options).then(function (response) {
        _newArrowCheck(this, _this4);

        return response;
    }.bind(this)).catch(function (err) {
        console.log('Error getting device component status: ' + String(err));
    });
}

/**
* Get capability status of a device.
*
* @param {Object{}} client - Client object previously instantiated
* @param {string} deviceId - the selected Device ID
* @param {string} componentId - the slected component ID
* @param {string} capabilityId - the slected capbility ID
* @returns {Object} - The request-promise for this API request.
*/

function getCapabilityStatus(client, deviceId, componentId, capabilityId) {
    var _this5 = this;

    var options = {
        method: 'GET',
        url: client.url + "devices/" + deviceId + "/components/" + componentId + "/capabilities/" + capabilityId + "/status",
        headers: client.headers,
        json: true
    };

    return rp(options).then(function (response) {
        _newArrowCheck(this, _this5);

        return response;
    }.bind(this)).catch(function (err) {
        console.log('Error getting device capability status: ' + String(err));
    });
}

/**
* Execute Commands on a device.
*
* @param {Object{}} client - Client object previously instantiated
* @param {string} deviceId - the selected Device ID
* @param {string} componentId - the slected component ID
* @param {string} capabilityId - the slected capbility ID
* @param {string} command - the slected command
* @param {Array} args - The command arguments
* @returns {Object} - The request-promise for this API request.
*/

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
        _newArrowCheck(this, _this6);

        return response;
    }.bind(this)).catch(function (err) {
        console.log('Error executing command: ' + String(err));
    });
}

var request$1 = require('request');
var rp$1 = require('request-promise');

/**
 * Gets a list of apps.
 *
 * @param {Object} client - Client object previously instantiated
 * 
 * @param {string} url - The URL to make the request to. Used to handle paging;
 *  calling clients should not need to specify this.
 * @param {Array} appsAccum - An accumulator for recursive API calls to
 *  handle paged result sets. Calling clients should not need to specify this.
 * @returns {Object} - The request-promise for this API request.
 */
function list$1(client, url, appsAccum) {
    var _this = this;

    var options = {
        method: 'GET',
        url: client.url + "apps",
        headers: client.headers,
        json: true
    };

    return rp$1(options).then(function (response) {
        _newArrowCheck(this, _this);

        if (!appsAccum) {
            appsAccum = [];
        }
        appsAccum = appsAccum.concat(response.items);
        if (response._links.next) {
            return list$1(options, response._links.next.href, appsAccum);
        }
        return appsAccum;
    }.bind(this)).catch(function (err) {
        console.log('Error getting apps: ' + String(err));
    });
}

/**
 * Gets one apps.
 *
 * @param {Object{}} client - Client object previously instantiated
 * @param {string} appId - The selected App ID
 * @returns {Object} - The request-promise for this API request.
 */
function show(client, appId) {
    var options = {
        method: 'GET',
        url: client.url + "apps/" + appId,
        headers: client.headers,
        json: true
    };

    return rp$1(options);
}

/**
 * Create a webhook smartapp
 * 
 * @param {Object{}} client - Client object previously instantiated 
 * @param {string} appName - A globally unique, developer-defined identifier for an app.
 * @param {string} displayName - A default display name for an app.
 * @param {string} description - A default description for an app.
 * @param {boolean} singleInstance - Inform the installation systems that a particular app can only be installed once within a user's account.
 * @param {string} targetUrl - The callback url for the app
*/

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

    return rp$1(options).then(function (response) {
        _newArrowCheck(this, _this2);

        return response;
    }.bind(this)).catch(function (err) {
        console.log('Error installing app: ' + String(err));
    });
}

var request$2 = require('request');
var rp$2 = require('request-promise');

/**
 * Gets a list of locations.
 *
 * @param {Object} client - Client object previously instantiated
 * @param {string} capability - The capability to filter by; if not specified,
 *  all locations will be returned.
 * @param {string} url - The URL to make the request to. Used to handle paging;
 *  calling clients should not need to specify this.
 * @param {Array} locationsAccum - An accumulator for recursive API calls to
 *  handle paged result sets. Calling clients should not need to specify this.
 * @returns {Object} - The request-promise for this API request.
 */
function list$2(client, url, locationsAccum) {
    var _this = this;

    var options = {
        method: 'GET',
        url: client.url + "locations",
        headers: client.headers,
        json: true
    };

    return rp$2(options).then(function (response) {
        _newArrowCheck(this, _this);

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

/**
 * Gets a list of locations.
 *
 * @param {Object{}} client - Client object previously instantiated
 * @param {string} locationId - The selected Location ID
 * @returns {Object} - The request-promise for this API request.
 */
function show$1(client, locationId) {
    var options = {
        method: 'GET',
        url: client.url + "locations/" + locationId,
        headers: client.headers,
        json: true
    };

    return rp$2(options);
}

var request$3 = require('request');
var rp$3 = require('request-promise');

/**
 * Gets a list of installed apps.
 *
 * @param {Object} client - Client object previously instantiated
 * 
 * @param {string} url - The URL to make the request to. Used to handle paging;
 *  calling clients should not need to specify this.
 * @param {Array} appsAccum - An accumulator for recursive API calls to
 *  handle paged result sets. Calling clients should not need to specify this.
 * @returns {Object} - The request-promise for this API request.
 */
function list$3(client, url, appsAccum) {
    var _this = this;

    var options = {
        method: 'GET',
        url: client.url + "installedapps",
        headers: client.headers,
        json: true
    };

    return rp$3(options).then(function (response) {
        _newArrowCheck(this, _this);

        if (!appsAccum) {
            appsAccum = [];
        }
        appsAccum = appsAccum.concat(response.items);
        if (response._links.next) {
            return list$3(options, response._links.next.href, appsAccum);
        }
        return appsAccum;
    }.bind(this)).catch(function (err) {
        console.log('Error getting apps: ' + String(err));
    });
}

/**
 * Gets one installed.
 *
 * @param {Object{}} client - Client object previously instantiated
 * @param {string} appId - The selected App ID
 * @returns {Object} - The request-promise for this API request.
 */
function show$2(client, appId) {
    var options = {
        method: 'GET',
        url: client.url + "installedapps/" + appId,
        headers: client.headers,
        json: true
    };

    return rp$3(options);
}

var request$4 = require('request');
var rp$4 = require('request-promise');

function createDeviceSubscription(client, appId, deviceId, componentId, capability, attribute, stateChangeOnly, value) {
    var body = {

        sourceType: 'DEVICE',
        device: {
            deviceId: deviceId,
            componentId: componentId,
            capability: capability,
            attribute: attribute,
            value: value,
            stateChangeOnly: stateChangeOnly
        }

    };

    var options = {
        method: 'POST',
        url: client.url + "installedapps/" + appId + "/subscriptions",
        headers: client.headers,
        body: body,
        json: true
    };

    return rp$4(options);
}

function deleteAppSubscriptions(client, appId) {

    var options = {
        method: 'DELETE',
        url: client.url + "installedapps/" + appId + "/subscriptions",
        headers: client.headers,
        json: true
    };

    return rp$4(options);
}

var request$5 = require('request');
var rp$5 = require('request-promise');

/**
 * Gets a list of scenes.
 *
 * @param {Object} client - Client object previously instantiated
 * @param {string} locationId - The location to filter by; if not specified,
 *  all scenes will be returned.
 * @param {string} url - The URL to make the request to. Used to handle paging;
 *  calling clients should not need to specify this.
 * @param {Array} scenesAccum - An accumulator for recursive API calls to
 *  handle paged result sets. Calling clients should not need to specify this.
 * @returns {Object} - The request-promise for this API request.
 */
function list$4(client, url, scenesAccum) {
    var _this = this;

    var options = {
        method: 'GET',
        url: client.url + "scenes",
        headers: client.headers,
        json: true
    };

    return rp$5(options).then(function (response) {
        _newArrowCheck(this, _this);

        if (!scenesAccum) {
            scenesAccum = [];
        }
        scenesAccum = scenesAccum.concat(response.items);
        if (response._links) {
            return getScenes(options, response._links.next.href, scenesAccum);
        }
        return scenesAccum;
    }.bind(this)).catch(function (err) {
        console.log('Error getting scenes: ' + String(err));
    });
}

/**
* Execute Scene
*
* @param {Object{}} client - Client object previously instantiated
* @param {string} sceneId - the selected Device ID
* @returns {Object} - The request-promise for this API request.
*/

function executeCommand$1(client, sceneId) {
    var _this2 = this;

    var body = {};

    var options = {
        method: 'POST',
        url: client.url + "scenes/" + sceneId + "/execute",
        headers: client.headers,
        body: body,
        json: true
    };

    return rp$5(options).then(function (response) {
        _newArrowCheck(this, _this2);

        return response;
    }.bind(this)).catch(function (err) {
        console.log('Error executing scene: ' + String(err));
    });
}

var StexClient = function () {
    function StexClient(access_token) {
        _classCallCheck(this, StexClient);

        this.access_token = access_token;
        this.url = 'https://api.smartthings.com/v1/';
        this.headers = {
            'Authorization': 'Bearer ' + access_token,
            'Content-type': 'application/json'
        };
    }

    /**
    * Locations
    */

    /**
     * Gets a list of locations.
     * @param {Object} client - Client object
     * @param {string} capability - The capability to filter by; if not specified,
     *  all locations will be returned.
     * @param {Array} locationsAccum - An accumulator for recursive API calls to
     *  handle paged result sets. Calling clients should not need to specify this.
     * 
     * @returns {Object} - The request-promise for this API request.
     */


    _createClass(StexClient, [{
        key: 'listLocations',
        value: function listLocations(client, locationsAccum) {
            return list$2(client, locationsAccum);
        }

        /**
         * Returns a request-promise for the status of the specified locationId.
         *
         * @param {string} deviceId - The ID of the location.
         *
         * @returns {Object} - The request-promise for this API call.
         */

    }, {
        key: 'showLocation',
        value: function showLocation(client, locationId) {
            return show$1(client, locationId);
        }

        /**
         * DEVICES
         */

        /**
         * Gets a list of devices.
         *
         * @param {string} capability - The capability to filter by; if not specified,
         *  all devices will be returned.
         * @param {Array} devicesAccum - An accumulator for recursive API calls to
         *  handle paged result sets. Calling clients should not need to specify this.
         * @returns {Object} - The request-promise for this API request.
         */

    }, {
        key: 'listDevices',
        value: function listDevices(client, capability, devicesAccum) {
            return list(client, capability, devicesAccum);
        }

        /**
         * Returns a request-promise for the object of the specified deviceId.
         *
         * @param {string} deviceId - The ID of the device.
         *
         * @returns {Object} - The request-promise for this API call.
         */

    }, {
        key: 'showDevice',
        value: function showDevice(client, deviceId) {
            return getOne(client, deviceId);
        }

        /**
         * Returns a request-promise for the status of the specified deviceId.
         *
         * @param {string} deviceId - The ID of the device.
         *
         * @returns {Object} - The request-promise for this API call.
         */

    }, {
        key: 'showDeviceFullStatus',
        value: function showDeviceFullStatus(client, deviceId) {
            return getFullStatus(client, deviceId);
        }

        /**
         * Returns a request-promise for the status of the specified deviceId.
         *
         * @param {string} deviceId - The ID of the device.
         * 
         * @param {string} componentId - The ID of the component 
         *
         * @returns {Object} - The request-promise for this API call.
         */

    }, {
        key: 'showDeviceComponentStatus',
        value: function showDeviceComponentStatus(client, deviceId, component) {
            return getComponentStatus(client, deviceId, component);
        }

        /**
         * Returns a request-promise for the status of the specified deviceId.
         *
         * @param {string} deviceId - The ID of the device.
         * 
         * @param {string} componentId - The ID of the component 
         * 
         * @param {string} capabilityId - The ID of the capability 
         *
         * @returns {Object} - The request-promise for this API call.
         */

    }, {
        key: 'showDeviceCapabilityStatus',
        value: function showDeviceCapabilityStatus(client, deviceId, componentId, capabilityId) {
            return getCapabilityStatus(client, deviceId, componentId, capabilityId);
        }

        /**
         * Returns a request-promise for the status of the specified deviceId.
         *
         * @param {string} deviceId - The ID of the device.
         * 
         * @param {string} componentId - The ID of the component 
         * 
         * @param {string} capabilityId - The ID of the capability 
         * 
         * @param {string} command - the command
         * 
         * @param {Array} args - the command arguments
         *
         * @returns {Object} - The request-promise for this API call.
         */

    }, {
        key: 'executeDeviceCommands',
        value: function executeDeviceCommands(client, deviceId, componentId, capabilityId, command, args) {
            return executeCommand(client, deviceId, componentId, capabilityId, command, args);
        }

        /**
         * Apps
        */

        /**
         * Gets a list of apps.
         * @param {Object} client - Client object
         *  all apps will be returned.
         * @param {Array} appsAccum - An accumulator for recursive API calls to
         *  handle paged result sets. Calling clients should not need to specify this.
         * 
         * @returns {Object} - The request-promise for this API request.
         */

    }, {
        key: 'listApps',
        value: function listApps(client, appsAccum) {
            return list$1(client, appsAccum);
        }

        /**
         * Returns a request-promise for the status of the specified appId.
         *
         * @param {string} appsId - The ID of the app.
         *
         * @returns {Object} - The request-promise for this API call.
         */

    }, {
        key: 'showApp',
        value: function showApp(client, appId) {
            return show(client, appId);
        }

        /**
        * Create a webhook smartapp
        * 
        * @param {Object{}} client - Client object previously instantiated 
        * 
        * @param {string} appName - A globally unique, developer-defined identifier for an app.
        * 
        * @param {string} displayName - A default display name for an app.
        * 
        * @param {string} description - A default description for an app.
        * 
        * @param {boolean} singleInstance - Inform the installation systems that a particular app can only be installed once within a user's account.
        * 
        * @param {string} targetUrl - The callback url for the app
        */

    }, {
        key: 'createWebhookApp',
        value: function createWebhookApp$$1(client, appName, displayName, description, singleInstance, targetUrl) {
            return createWebhookApp(client, appName, displayName, description, singleInstance, targetUrl);
        }

        /**
         * Installed Apps
        */

        /**
         * Gets a list of installed apps.
         * @param {Object} client - Client object
         *  all apps will be returned.
         * @param {Array} appsAccum - An accumulator for recursive API calls to
         *  handle paged result sets. Calling clients should not need to specify this.
         * 
         * @returns {Object} - The request-promise for this API request.
         */

    }, {
        key: 'listInstalledApps',
        value: function listInstalledApps(client, appsAccum) {
            return list$3(client, appsAccum);
        }

        /**
         * Returns a request-promise for the status of the specified appId.
         *
         * @param {string} appsId - The ID of the app.
         *
         * @returns {Object} - The request-promise for this API call.
         */

    }, {
        key: 'showInstalledApp',
        value: function showInstalledApp(client, appId) {
            return show$2(client, appId);
        }

        /**
         * Scenes 
        */

        /**
         * Gets a list of scenes.
         * @param {Object} client - Client object
         * @param {string} locationId - The location to filter by; if not specified,
         *  all scenes will be returned.
         * @param {Array} scenesAccum - An accumulator for recursive API calls to
         *  handle paged result sets. Calling clients should not need to specify this.
         * 
         * @returns {Object} - The request-promise for this API request.
        */

    }, {
        key: 'listScenes',
        value: function listScenes(client, scenesAccum) {
            return list$4(client, scenesAccum);
        }

        /**
         *
         * @param {string} sceneId - The ID of the device.
         * 
         * @returns {Object} - The request-promise for this API call.
         */

    }, {
        key: 'executeScene',
        value: function executeScene(client, sceneId) {
            return executeCommand$1(client, sceneId);
        }

        /**
        * Subcriptions
        */

    }, {
        key: 'createDeviceSubscription',
        value: function createDeviceSubscription$$1(client, appId, deviceId, componentId, capability, attribute, stateChangeOnly, value) {

            return createDeviceSubscription(client, appId, deviceId, componentId, capability, attribute, stateChangeOnly, value);
        }
    }, {
        key: 'deleteAppSubscriptions',
        value: function deleteAppSubscriptions$$1(client, appId) {
            return deleteAppSubscriptions(client, appId);
        }
    }]);

    return StexClient;
}();

exports.StexClient = StexClient;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
