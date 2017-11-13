(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("validator"), require("validate.js"), require("moment"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["validator", "validate.js", "moment", "react"], factory);
	else if(typeof exports === 'object')
		exports["Validator"] = factory(require("validator"), require("validate.js"), require("moment"), require("react"));
	else
		root["Validator"] = factory(root["validator"], root["validate.js"], root["moment"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_21__, __WEBPACK_EXTERNAL_MODULE_22__, __WEBPACK_EXTERNAL_MODULE_23__, __WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(12);

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

module.exports = {
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(6)();
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomByte = __webpack_require__(13);

function encode(lookup, number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = encode;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validation = exports.Message = undefined;

var _Message = __webpack_require__(5);

var _Message2 = _interopRequireDefault(_Message);

var _Validation = __webpack_require__(18);

var _Validation2 = _interopRequireDefault(_Validation);

var _Validator = __webpack_require__(19);

var _Validator2 = _interopRequireDefault(_Validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Validator2.default;
exports.Message = _Message2.default;
exports.Validation = _Validation2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shortid = __webpack_require__(10);

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * @author: Seok Kyun. Choi. 최석균 (Syaku)
                                                                                                                                                                                                                              * @site: http://syaku.tistory.com
                                                                                                                                                                                                                              * @since: 2017. 9. 8.
                                                                                                                                                                                                                              */

var propTypes = {
  render: _propTypes2.default.func.isRequired,
  valid: _propTypes2.default.shape().isRequired,
  tagName: _propTypes2.default.string,
  once: _propTypes2.default.bool
};

var defaultProps = {
  tagName: 'div',
  once: false
};

var Message = function Message(props) {
  var valid = props.valid;
  var render = props.render;

  var error = valid.error,
      assert = _objectWithoutProperties(valid, ['error']);

  var message = Object.keys(assert).map(function (key) {
    return assert[key];
  }).filter(function (f) {
    return f.error;
  });

  var Render = props.once ? render(_extends({}, message[0], { key: _shortid2.default.generate() })) : message.map(function (data) {
    return render(_extends({}, data, { key: _shortid2.default.generate() }));
  });

  return _react2.default.createElement(props.tagName, {}, Render);
};

Message.defaultProps = defaultProps;
Message.propTypes = propTypes;

exports.default = Message;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(7);
var invariant = __webpack_require__(8);
var ReactPropTypesSecret = __webpack_require__(9);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(11);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(0);
var encode = __webpack_require__(3);
var decode = __webpack_require__(14);
var build = __webpack_require__(15);
var isValid = __webpack_require__(16);

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(17) || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.decode = decode;
module.exports.isValid = isValid;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

function randomByte() {
    if (!crypto || !crypto.getRandomValues) {
        return Math.floor(Math.random() * 256) & 0x30;
    }
    var dest = new Uint8Array(1);
    crypto.getRandomValues(dest);
    return dest[0] & 0x30;
}

module.exports = randomByte;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(0);

/**
 * Decode the id to get the version and worker
 * Mainly for debugging and testing.
 * @param id - the shortid-generated id.
 */
function decode(id) {
    var characters = alphabet.shuffled();
    return {
        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
    };
}

module.exports = decode;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encode = __webpack_require__(3);
var alphabet = __webpack_require__(0);

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1459707606518;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 6;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {

    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + encode(alphabet.lookup, version);
    str = str + encode(alphabet.lookup, clusterWorkerId);
    if (counter > 0) {
        str = str + encode(alphabet.lookup, counter);
    }
    str = str + encode(alphabet.lookup, seconds);

    return str;
}

module.exports = build;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(0);

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var characters = alphabet.characters();
    var len = id.length;
    for(var i = 0; i < len;i++) {
        if (characters.indexOf(id[i]) === -1) {
            return false;
        }
    }
    return true;
}

module.exports = isShortId;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 0;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * @author: Seok Kyun. Choi. 최석균 (Syaku)
                                                                                                                                                                                                                              * @site: http://syaku.tistory.com
                                                                                                                                                                                                                              * @since: 2017. 9. 8.
                                                                                                                                                                                                                              */

var propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  tagName: _propTypes2.default.string,
  errorClassName: _propTypes2.default.string,
  isValid: _propTypes2.default.bool
};

var defaultProps = {
  children: null,
  className: 'form-group',
  tagName: 'div',
  errorClassName: 'has-error',
  isValid: false
};

var Validation = function Validation(props) {
  var children = props.children,
      className = props.className,
      tagName = props.tagName,
      errorClassName = props.errorClassName,
      isValid = props.isValid,
      attr = _objectWithoutProperties(props, ['children', 'className', 'tagName', 'errorClassName', 'isValid']);

  return _react2.default.createElement(props.tagName, _extends({}, attr, {
    className: className + ' ' + (isValid ? errorClassName : '')
  }), children);
};

Validation.propTypes = propTypes;
Validation.defaultProps = defaultProps;

exports.default = Validation;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author: Seok Kyun. Choi. 최석균 (Syaku)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @site: http://syaku.tistory.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @since: 2017. 9. 8.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Assert = __webpack_require__(20);

var _Assert2 = _interopRequireDefault(_Assert);

var _MessageSource = __webpack_require__(24);

var _MessageSource2 = _interopRequireDefault(_MessageSource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
  function Validator(rules, assert, message) {
    _classCallCheck(this, Validator);

    this.error = false;
    this.rules = rules;
    this.state = null;

    this.assertTest = assert || _Assert2.default;
    this.assertMessage = message || _MessageSource2.default;
  }

  _createClass(Validator, [{
    key: 'prepare',
    value: function prepare(state) {
      this.state = state;
      this.error = false;
      return this.collect(this.rules, state);
    }
  }, {
    key: 'submit',
    value: function submit(state) {
      this.state = state;
      this.error = false;
      return this.collect(this.rules, state, true);
    }
  }, {
    key: 'getError',
    value: function getError() {
      return this.error;
    }
  }, {
    key: 'collect',
    value: function collect(rules, state) {
      var _this = this;

      var checking = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      // target : state 데이터 명과 매칭한다.
      return Object.keys(rules).reduce(function (prevResult, target) {
        if (!Object.prototype.hasOwnProperty.call(rules, target)) {
          return prevResult;
        }

        var _rules$target = rules[target],
            _manyType = _rules$target._manyType,
            rule = _objectWithoutProperties(_rules$target, ['_manyType']);

        var data = state && Object.prototype.hasOwnProperty.call(state, target) ? state[target] : null;

        var result = _manyType ? _this.collectMany(target, rule, data, checking) : _this.collectRule(target, rule, data, checking);

        return _extends({}, prevResult, result);
      }, {});
    }
  }, {
    key: 'collectMany',
    value: function collectMany(target, rule, data, checking) {
      var _this2 = this;

      if (!data) {
        return _defineProperty({}, target, []);
      }
      return _defineProperty({}, target, data.map(function (value) {
        return _this2.collect(rule, value, checking);
      }));
    }

    /**
     * 세부적인 규칙을 정리한다.
     * @author Seok Kyun. Choi. 최석균 (Syaku)
     * @param {any} target 대상
     * @param {any} { name, ...rule } name 대상 명
     * @param {any} value 유효성 검사 대상이 되는 데이터
     * @returns
     * @memberof Validator
     */

  }, {
    key: 'collectRule',
    value: function collectRule(target, _ref3, value, checking) {
      var _name = _ref3._name,
          rule = _objectWithoutProperties(_ref3, ['_name']);

      var _this3 = this;

      // 대상에 하나의 오류라도 발생한 경우
      var errorRule = false;

      var result = Object.keys(rule).reduce(function (prevResult, assert) {
        if (!Object.prototype.hasOwnProperty.call(rule, assert)) return prevResult;

        var _rule$assert = rule[assert],
            message = _rule$assert.message,
            properties = _objectWithoutProperties(_rule$assert, ['message']);

        var error = checking ? !_this3.assertTest(assert, value, properties, _this3.state) : false;
        if (error) {
          errorRule = true;
          _this3.error = true;
        }

        return _extends({}, prevResult, _defineProperty({}, assert, {
          error: error,
          message: message || _this3.assertMessage(assert, _name, properties)
        }));
      }, {});

      return _defineProperty({}, target, _extends({
        error: errorRule
      }, result));
    }
  }]);

  return Validator;
}();

exports.default = Validator;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMakeFunc = exports.isTrue = exports.isMaxLength = exports.isMinLength = exports.isLength = exports.isRangeInt = exports.isInt = exports.isArrayMaxLength = exports.isArrayMinLength = exports.isArrayLength = exports.isEquals = exports.isNotEmpty = exports.isBeforeDate = exports.isAfterDate = exports.isDate = exports.isAlphanumeric = exports.isAlpha = exports.isIP = exports.isEmail = exports.isURL = exports.isJSON = undefined;

var _validator = __webpack_require__(21);

var _validator2 = _interopRequireDefault(_validator);

var _validate = __webpack_require__(22);

var _validate2 = _interopRequireDefault(_validate);

var _moment = __webpack_require__(23);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parameter 설명
 * value : 입력된 값
 * options : Validator Rule Option
 * ----------------------------------------------
 * value : 비교 대상 값
 * length : 수만큼 배열이 존재해야 한다. value 가 array 인 경우에 사용 된다.
 * min : 최소
 * max : 최대
 * func : 직접 함수를 만든다.
 * date: 날짜 (string : 20101010, 2010-10-10)
 * 그외 옵션은 https://github.com/chriso/validator.js 참고한다.
 */

var isJSON = exports.isJSON = function isJSON(value) {
  return _validator2.default.isJSON(value);
}; /**
    * @author: Seok Kyun. Choi. 최석균 (Syaku)
    * @site: http://syaku.tistory.com
    * @since: 2017. 9. 8.
    */

var isURL = exports.isURL = function isURL(value, options) {
  return _validator2.default.isURL(value, options);
};
var isEmail = exports.isEmail = function isEmail(value, options) {
  return _validator2.default.isEmail(value, options);
};
var isIP = exports.isIP = function isIP(value, _ref) {
  var varsion = _ref.varsion;
  return _validator2.default.isIP(value, varsion);
};
var isAlpha = exports.isAlpha = function isAlpha(value, _ref2) {
  var locale = _ref2.locale;
  return _validator2.default.isAlpha(value, locale);
};
var isAlphanumeric = exports.isAlphanumeric = function isAlphanumeric(value, _ref3) {
  var locale = _ref3.locale;
  return _validator2.default.isAlphanumeric(value, locale);
};
var isDate = exports.isDate = function isDate(value) {
  return (0, _moment2.default)(value).isValid();
};
var isAfterDate = exports.isAfterDate = function isAfterDate(value, _ref4) {
  var date = _ref4.date;

  var invalid = (0, _moment2.default)(value);
  if (!invalid.isValid()) return false;
  return invalid.isAfter(date);
};
var isBeforeDate = exports.isBeforeDate = function isBeforeDate(value, _ref5) {
  var date = _ref5.date;

  var invalid = (0, _moment2.default)(value);
  if (!invalid.isValid()) return false;
  return invalid.isBefore(date);
};

var isNotEmpty = exports.isNotEmpty = function isNotEmpty(value, _ref6) {
  var not = _ref6.not;
  return !_validate2.default.isEmpty(value) === !not;
};
var isEquals = exports.isEquals = function isEquals(value, _ref7) {
  var value2 = _ref7.value,
      not = _ref7.not;
  return value === value2 === !not;
};
var isArrayLength = exports.isArrayLength = function isArrayLength(value, _ref8) {
  var length = _ref8.length,
      min = _ref8.min,
      max = _ref8.max;

  if (!Array.isArray(value)) return false;
  if (length > 0) {
    return value.length === length;
  }
  return value.length >= min && value.length <= max;
};
var isArrayMinLength = exports.isArrayMinLength = function isArrayMinLength(value, _ref9) {
  var min = _ref9.min;

  if (!Array.isArray(value)) return false;
  return value.length >= min;
};
var isArrayMaxLength = exports.isArrayMaxLength = function isArrayMaxLength(value, _ref10) {
  var max = _ref10.max;

  if (!Array.isArray(value)) return false;
  return value.length <= max;
};
var isInt = exports.isInt = function isInt(value) {
  if (typeof value === 'string') return _validator2.default.isNumeric(value);
  return _validate2.default.isNumber(value);
};
var isRangeInt = exports.isRangeInt = function isRangeInt(value, _ref11) {
  var min = _ref11.min,
      max = _ref11.max,
      allow_leading_zeroes = _ref11.allow_leading_zeroes;
  return _validator2.default.isInt(String(value), { min: min, max: max, allow_leading_zeroes: allow_leading_zeroes });
};
var isLength = exports.isLength = function isLength(value, _ref12) {
  var min = _ref12.min,
      max = _ref12.max;
  return _validator2.default.isLength(value, { min: min, max: max });
};
var isMinLength = exports.isMinLength = function isMinLength(value, _ref13) {
  var min = _ref13.min;
  return _validator2.default.isLength(value, { min: min, max: undefined });
};
var isMaxLength = exports.isMaxLength = function isMaxLength(value, _ref14) {
  var max = _ref14.max;
  return _validator2.default.isLength(value, { min: undefined, max: max });
};
var isTrue = exports.isTrue = function isTrue(value, _ref15) {
  var not = _ref15.not;
  return value === !not;
};
var isMakeFunc = exports.isMakeFunc = function isMakeFunc(value, _ref16, state) {
  var func = _ref16.func;

  if (!_validate2.default.isFunction(func)) return false;
  return func(value, state);
};

// const defaultProps = {
//   not: false,
//   max: undefined,
//   min: undefined,
//   lenght: undefined,
// };

// valid = true
var Assert = function Assert(assert, value, properties, state) {
  switch (assert) {
    case '_json':
      return isJSON(value, properties);
    case '_url':
      return isURL(value, properties);
    case '_email':
      return isEmail(value, properties);
    case '_ip':
      return isIP(value, properties);
    case '_alpha':
      return isAlpha(value, properties);
    case '_alphaNumber':
      return isAlphanumeric(value, properties);
    case '_afterDate':
      return isAfterDate(value, properties);
    case '_date':
      return isDate(value, properties);
    case '_beforeDate':
      return isBeforeDate(value, properties);
    case '_hasText':
      return isNotEmpty(value, properties);
    case '_equals':
      return isEquals(value, properties);
    case '_check':
      return isArrayLength(value, properties);
    case '_rangeCheck':
      return isArrayLength(value, properties);
    case '_maxCheck':
      return isArrayMinLength(value, properties);
    case '_minCheck':
      return isArrayMaxLength(value, properties);
    case '_int':
      return isInt(value, properties);
    case '_rangeInt':
      return isRangeInt(value, properties);
    case '_length':
      return isLength(value, properties);
    case '_minLength':
      return isMinLength(value, properties);
    case '_maxLength':
      return isMaxLength(value, properties);
    case '_checked':
      return isTrue(value, properties);
    case '_selected':
      return isNotEmpty(value, properties);
    case '_makeFunc':
      return isMakeFunc(value, properties, state);
    default:
      return false;
  }
};

exports.default = Assert;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_21__;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_22__;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_23__;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 9. 8.
 */

var MessageSource = function MessageSource(assert, name, properties) {
  var nameText = name ? name + '\uC744(\uB97C) ' : '';
  switch (assert) {
    case '_json':
      return nameText + 'JSON \uD0C0\uC785\uC73C\uB85C \uC785\uB825\uD558\uC138\uC694.';
    case '_url':
      return nameText + 'URL \uC8FC\uC18C\uB85C \uC785\uB825\uD558\uC138\uC694.';
    case '_email':
      return nameText + '\uC774\uBA54\uC77C \uC8FC\uC18C\uB85C \uC785\uB825\uD558\uC138\uC694.';
    case '_ip':
      return nameText + '\uC544\uC774\uD53C \uC8FC\uC18C\uB85C \uC785\uB825\uD558\uC138\uC694.';
    case '_alpha':
      return nameText + '\uC54C\uD30C\uBCB3\uC73C\uB85C \uC785\uB825\uD558\uC138\uC694.';
    case '_alphaNumber':
      return nameText + '\uC54C\uD30C\uBCB3\uACFC \uC22B\uC790\uB85C \uC785\uB825\uD558\uC138\uC694.';
    case '_date':
      return nameText + '\uB0A0\uC9DC \uD0C0\uC785\uC73C\uB85C \uC785\uB825\uD558\uC138\uC694.';
    case '_afterDate':
      return nameText + '\uC774\uD6C4 \uB0A0\uC9DC\uB85C \uC785\uB825\uD558\uC138\uC694.';
    case '_beforeDate':
      return nameText + '\uC774\uC804 \uB0A0\uC9DC\uB85C \uC785\uB825\uD558\uC138\uC694.';
    case '_hasText':
      return nameText + '\uC785\uB825\uD558\uC138\uC694.';
    case '_equals':
      return nameText + ' ' + properties.value + '\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.';
    case '_check':
      return '' + nameText + properties.length + '\uAC1C \uC120\uD0DD\uD558\uC138\uC694.';
    case '_rangeCheck':
      return '' + nameText + properties.min + '\uAC1C\uC5D0\uC11C ' + properties.max + '\uAC1C\uB85C \uC120\uD0DD\uD558\uC138\uC694.';
    case '_minCheck':
      return '' + nameText + properties.min + '\uAC1C \uC774\uD558\uB85C \uC120\uD0DD\uD558\uC138\uC694.';
    case '_maxCheck':
      return '' + nameText + properties.max + '\uAC1C \uC774\uC0C1\uC73C\uB85C \uC120\uD0DD\uD558\uC138\uC694.';
    case '_int':
      return nameText + '\uC22B\uC790\uB85C \uC785\uB825\uD558\uC138\uC694.';
    case '_rangeInt':
      return nameText + ' ' + properties.min + ' \uC5D0\uC11C ' + properties.max + ' \uC22B\uC790 \uC0AC\uC774\uB85C \uC785\uB825\uD558\uC138\uC694.';
    case '_length':
      return '' + nameText + properties.min + ' \uC790 \uC774\uC0C1 ' + properties.max + ' \uC790 \uC774\uD558\uB85C \uC785\uB825\uD558\uC138\uC694.';
    case '_minLength':
      return '' + nameText + properties.min + ' \uC790\uC774\uC0C1\uC73C\uB85C \uC785\uB825\uD558\uC138\uC694.';
    case '_maxLength':
      return '' + nameText + properties.max + ' \uC790\uC774\uD558\uB85C \uC785\uB825\uD558\uC138\uC694.';
    case '_checked':
      return nameText + '\uC120\uD0DD\uD558\uC138\uC694.';
    case '_selected':
      return nameText + '\uC120\uD0DD\uD558\uC138\uC694.';
    default:
      return nameText + '\uC785\uB825\uD55C \uAC12\uC740 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.';
  }
};

exports.default = MessageSource;

/***/ })
/******/ ]);
});