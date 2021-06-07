(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.echarts = {})));
}(this, (function (exports) { 'use strict';

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

// (1) The code `if (__DEV__) ...` can be removed by build tool.
// (2) If intend to use `__DEV__`, this module should be imported. Use a global
// variable `__DEV__` may cause that miss the declaration (see #6535), or the
// declaration is behind of the using position (for example in `Model.extent`,
// And tools like rollup can not analysis the dependency if not import).

var dev;

// In browser
if (typeof window !== 'undefined') {
    dev = window.__DEV__;
}
// In node
else if (typeof global !== 'undefined') {
    dev = global.__DEV__;
}

if (typeof dev === 'undefined') {
    dev = true;
}

var __DEV__ = dev;

/**
 * zrender: 生成唯一id
 *
 * @author errorrik (errorrik@gmail.com)
 */

var idStart = 0x0907;

var guid = function () {
    return idStart++;
};

/**
 * echarts设备环境识别
 *
 * @desc echarts基于Canvas，纯Javascript图表库，提供直观，生动，可交互，可个性化定制的数据统计图表。
 * @author firede[firede@firede.us]
 * @desc thanks zepto.
 */

/* global wx */

var env = {};

if (typeof wx === 'object' && typeof wx.getSystemInfoSync === 'function') {
    // In Weixin Application
    env = {
        browser: {},
        os: {},
        node: false,
        wxa: true, // Weixin Application
        canvasSupported: true,
        svgSupported: false,
        touchEventsSupported: true,
        domSupported: false
    };
}
else if (typeof document === 'undefined' && typeof self !== 'undefined') {
    // In worker
    env = {
        browser: {},
        os: {},
        node: false,
        worker: true,
        canvasSupported: true,
        domSupported: false
    };
}
else if (typeof navigator === 'undefined') {
    // In node
    env = {
        browser: {},
        os: {},
        node: true,
        worker: false,
        // Assume canvas is supported
        canvasSupported: true,
        svgSupported: true,
        domSupported: false
    };
}
else {
    env = detect(navigator.userAgent);
}

var env$1 = env;

// Zepto.js
// (c) 2010-2013 Thomas Fuchs
// Zepto.js may be freely distributed under the MIT license.

function detect(ua) {
    var os = {};
    var browser = {};
    // var webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/);
    // var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    // var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    // var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    // var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    // var webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/);
    // var touchpad = webos && ua.match(/TouchPad/);
    // var kindle = ua.match(/Kindle\/([\d.]+)/);
    // var silk = ua.match(/Silk\/([\d._]+)/);
    // var blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/);
    // var bb10 = ua.match(/(BB10).*Version\/([\d.]+)/);
    // var rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/);
    // var playbook = ua.match(/PlayBook/);
    // var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
    var firefox = ua.match(/Firefox\/([\d.]+)/);
    // var safari = webkit && ua.match(/Mobile\//) && !chrome;
    // var webview = ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !chrome;
    var ie = ua.match(/MSIE\s([\d.]+)/)
        // IE 11 Trident/7.0; rv:11.0
        || ua.match(/Trident\/.+?rv:(([\d.]+))/);
    var edge = ua.match(/Edge\/([\d.]+)/); // IE 12 and 12+

    var weChat = (/micromessenger/i).test(ua);

    // Todo: clean this up with a better OS/browser seperation:
    // - discern (more) between multiple browsers on android
    // - decide if kindle fire in silk mode is android or not
    // - Firefox on Android doesn't specify the Android version
    // - possibly devide in os, device and browser hashes

    // if (browser.webkit = !!webkit) browser.version = webkit[1];

    // if (android) os.android = true, os.version = android[2];
    // if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.');
    // if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.');
    // if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    // if (webos) os.webos = true, os.version = webos[2];
    // if (touchpad) os.touchpad = true;
    // if (blackberry) os.blackberry = true, os.version = blackberry[2];
    // if (bb10) os.bb10 = true, os.version = bb10[2];
    // if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2];
    // if (playbook) browser.playbook = true;
    // if (kindle) os.kindle = true, os.version = kindle[1];
    // if (silk) browser.silk = true, browser.version = silk[1];
    // if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
    // if (chrome) browser.chrome = true, browser.version = chrome[1];
    if (firefox) {
        browser.firefox = true;
        browser.version = firefox[1];
    }
    // if (safari && (ua.match(/Safari/) || !!os.ios)) browser.safari = true;
    // if (webview) browser.webview = true;

    if (ie) {
        browser.ie = true;
        browser.version = ie[1];
    }

    if (edge) {
        browser.edge = true;
        browser.version = edge[1];
    }

    // It is difficult to detect WeChat in Win Phone precisely, because ua can
    // not be set on win phone. So we do not consider Win Phone.
    if (weChat) {
        browser.weChat = true;
    }

    // os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
    //     (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)));
    // os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos ||
    //     (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
    //     (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))));

    return {
        browser: browser,
        os: os,
        node: false,
        // 原生canvas支持，改极端点了
        // canvasSupported : !(browser.ie && parseFloat(browser.version) < 9)
        canvasSupported: !!document.createElement('canvas').getContext,
        svgSupported: typeof SVGRect !== 'undefined',
        // works on most browsers
        // IE10/11 does not support touch event, and MS Edge supports them but not by
        // default, so we dont check navigator.maxTouchPoints for them here.
        touchEventsSupported: 'ontouchstart' in window && !browser.ie && !browser.edge,
        // <http://caniuse.com/#search=pointer%20event>.
        pointerEventsSupported:
            // (1) Firefox supports pointer but not by default, only MS browsers are reliable on pointer
            // events currently. So we dont use that on other browsers unless tested sufficiently.
            // For example, in iOS 13 Mobile Chromium 78, if the touching behavior starts page
            // scroll, the `pointermove` event can not be fired any more. That will break some
            // features like "pan horizontally to move something and pan vertically to page scroll".
            // The horizontal pan probably be interrupted by the casually triggered page scroll.
            // (2) Although IE 10 supports pointer event, it use old style and is different from the
            // standard. So we exclude that. (IE 10 is hardly used on touch device)
            'onpointerdown' in window
                && (browser.edge || (browser.ie && browser.version >= 11)),
        // passiveSupported: detectPassiveSupport()
        domSupported: typeof document !== 'undefined'
    };
}

// See https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
// function detectPassiveSupport() {
//     // Test via a getter in the options object to see if the passive property is accessed
//     var supportsPassive = false;
//     try {
//         var opts = Object.defineProperty({}, 'passive', {
//             get: function() {
//                 supportsPassive = true;
//             }
//         });
//         window.addEventListener('testPassive', function() {}, opts);
//     } catch (e) {
//     }
//     return supportsPassive;
// }

/**
 * @module zrender/core/util
 */

// 用于处理merge时无法遍历Date等对象的问题
var BUILTIN_OBJECT = {
    '[object Function]': 1,
    '[object RegExp]': 1,
    '[object Date]': 1,
    '[object Error]': 1,
    '[object CanvasGradient]': 1,
    '[object CanvasPattern]': 1,
    // For node-canvas
    '[object Image]': 1,
    '[object Canvas]': 1
};

var TYPED_ARRAY = {
    '[object Int8Array]': 1,
    '[object Uint8Array]': 1,
    '[object Uint8ClampedArray]': 1,
    '[object Int16Array]': 1,
    '[object Uint16Array]': 1,
    '[object Int32Array]': 1,
    '[object Uint32Array]': 1,
    '[object Float32Array]': 1,
    '[object Float64Array]': 1
};

var objToString = Object.prototype.toString;

var arrayProto = Array.prototype;
var nativeForEach = arrayProto.forEach;
var nativeFilter = arrayProto.filter;
var nativeSlice = arrayProto.slice;
var nativeMap = arrayProto.map;
var nativeReduce = arrayProto.reduce;

// Avoid assign to an exported variable, for transforming to cjs.
var methods = {};

function $override(name, fn) {
    // Clear ctx instance for different environment
    if (name === 'createCanvas') {
        _ctx = null;
    }

    methods[name] = fn;
}

/**
 * Those data types can be cloned:
 *     Plain object, Array, TypedArray, number, string, null, undefined.
 * Those data types will be assgined using the orginal data:
 *     BUILTIN_OBJECT
 * Instance of user defined class will be cloned to a plain object, without
 * properties in prototype.
 * Other data types is not supported (not sure what will happen).
 *
 * Caution: do not support clone Date, for performance consideration.
 * (There might be a large number of date in `series.data`).
 * So date should not be modified in and out of echarts.
 *
 * @param {*} source
 * @return {*} new
 */
function clone(source) {
    if (source == null || typeof source !== 'object') {
        return source;
    }

    var result = source;
    var typeStr = objToString.call(source);

    if (typeStr === '[object Array]') {
        if (!isPrimitive(source)) {
            result = [];
            for (var i = 0, len = source.length; i < len; i++) {
                result[i] = clone(source[i]);
            }
        }
    }
    else if (TYPED_ARRAY[typeStr]) {
        if (!isPrimitive(source)) {
            var Ctor = source.constructor;
            if (source.constructor.from) {
                result = Ctor.from(source);
            }
            else {
                result = new Ctor(source.length);
                for (var i = 0, len = source.length; i < len; i++) {
                    result[i] = clone(source[i]);
                }
            }
        }
    }
    else if (!BUILTIN_OBJECT[typeStr] && !isPrimitive(source) && !isDom(source)) {
        result = {};
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                result[key] = clone(source[key]);
            }
        }
    }

    return result;
}

/**
 * @memberOf module:zrender/core/util
 * @param {*} target
 * @param {*} source
 * @param {boolean} [overwrite=false]
 */
function merge(target, source, overwrite) {
    // We should escapse that source is string
    // and enter for ... in ...
    if (!isObject$1(source) || !isObject$1(target)) {
        return overwrite ? clone(source) : target;
    }

    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            var targetProp = target[key];
            var sourceProp = source[key];

            if (isObject$1(sourceProp)
                && isObject$1(targetProp)
                && !isArray(sourceProp)
                && !isArray(targetProp)
                && !isDom(sourceProp)
                && !isDom(targetProp)
                && !isBuiltInObject(sourceProp)
                && !isBuiltInObject(targetProp)
                && !isPrimitive(sourceProp)
                && !isPrimitive(targetProp)
            ) {
                // 如果需要递归覆盖，就递归调用merge
                merge(targetProp, sourceProp, overwrite);
            }
            else if (overwrite || !(key in target)) {
                // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
                // NOTE，在 target[key] 不存在的时候也是直接覆盖
                target[key] = clone(source[key], true);
            }
        }
    }

    return target;
}

/**
 * @param {Array} targetAndSources The first item is target, and the rests are source.
 * @param {boolean} [overwrite=false]
 * @return {*} target
 */
function mergeAll(targetAndSources, overwrite) {
    var result = targetAndSources[0];
    for (var i = 1, len = targetAndSources.length; i < len; i++) {
        result = merge(result, targetAndSources[i], overwrite);
    }
    return result;
}

/**
 * @param {*} target
 * @param {*} source
 * @memberOf module:zrender/core/util
 */
function extend(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}

/**
 * @param {*} target
 * @param {*} source
 * @param {boolean} [overlay=false]
 * @memberOf module:zrender/core/util
 */
function defaults(target, source, overlay) {
    for (var key in source) {
        if (source.hasOwnProperty(key)
            && (overlay ? source[key] != null : target[key] == null)
        ) {
            target[key] = source[key];
        }
    }
    return target;
}

var createCanvas = function () {
    return methods.createCanvas();
};

methods.createCanvas = function () {
    return document.createElement('canvas');
};

// FIXME
var _ctx;

function getContext() {
    if (!_ctx) {
        // Use util.createCanvas instead of createCanvas
        // because createCanvas may be overwritten in different environment
        _ctx = createCanvas().getContext('2d');
    }
    return _ctx;
}

/**
 * 查询数组中元素的index
 * @memberOf module:zrender/core/util
 */
function indexOf(array, value) {
    if (array) {
        if (array.indexOf) {
            return array.indexOf(value);
        }
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === value) {
                return i;
            }
        }
    }
    return -1;
}

/**
 * 构造类继承关系
 *
 * @memberOf module:zrender/core/util
 * @param {Function} clazz 源类
 * @param {Function} baseClazz 基类
 */
function inherits(clazz, baseClazz) {
    var clazzPrototype = clazz.prototype;
    function F() {}
    F.prototype = baseClazz.prototype;
    clazz.prototype = new F();

    for (var prop in clazzPrototype) {
        if (clazzPrototype.hasOwnProperty(prop)) {
            clazz.prototype[prop] = clazzPrototype[prop];
        }
    }
    clazz.prototype.constructor = clazz;
    clazz.superClass = baseClazz;
}

/**
 * @memberOf module:zrender/core/util
 * @param {Object|Function} target
 * @param {Object|Function} sorce
 * @param {boolean} overlay
 */
function mixin(target, source, overlay) {
    target = 'prototype' in target ? target.prototype : target;
    source = 'prototype' in source ? source.prototype : source;

    defaults(target, source, overlay);
}

/**
 * Consider typed array.
 * @param {Array|TypedArray} data
 */
function isArrayLike(data) {
    if (!data) {
        return;
    }
    if (typeof data === 'string') {
        return false;
    }
    return typeof data.length === 'number';
}

/**
 * 数组或对象遍历
 * @memberOf module:zrender/core/util
 * @param {Object|Array} obj
 * @param {Function} cb
 * @param {*} [context]
 */
function each$1(obj, cb, context) {
    if (!(obj && cb)) {
        return;
    }
    if (obj.forEach && obj.forEach === nativeForEach) {
        obj.forEach(cb, context);
    }
    else if (obj.length === +obj.length) {
        for (var i = 0, len = obj.length; i < len; i++) {
            cb.call(context, obj[i], i, obj);
        }
    }
    else {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                cb.call(context, obj[key], key, obj);
            }
        }
    }
}

/**
 * 数组映射
 * @memberOf module:zrender/core/util
 * @param {Array} obj
 * @param {Function} cb
 * @param {*} [context]
 * @return {Array}
 */
function map(obj, cb, context) {
    if (!(obj && cb)) {
        return;
    }
    if (obj.map && obj.map === nativeMap) {
        return obj.map(cb, context);
    }
    else {
        var result = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            result.push(cb.call(context, obj[i], i, obj));
        }
        return result;
    }
}

/**
 * @memberOf module:zrender/core/util
 * @param {Array} obj
 * @param {Function} cb
 * @param {Object} [memo]
 * @param {*} [context]
 * @return {Array}
 */
function reduce(obj, cb, memo, context) {
    if (!(obj && cb)) {
        return;
    }
    if (obj.reduce && obj.reduce === nativeReduce) {
        return obj.reduce(cb, memo, context);
    }
    else {
        for (var i = 0, len = obj.length; i < len; i++) {
            memo = cb.call(context, memo, obj[i], i, obj);
        }
        return memo;
    }
}

/**
 * 数组过滤
 * @memberOf module:zrender/core/util
 * @param {Array} obj
 * @param {Function} cb
 * @param {*} [context]
 * @return {Array}
 */
function filter(obj, cb, context) {
    if (!(obj && cb)) {
        return;
    }
    if (obj.filter && obj.filter === nativeFilter) {
        return obj.filter(cb, context);
    }
    else {
        var result = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            if (cb.call(context, obj[i], i, obj)) {
                result.push(obj[i]);
            }
        }
        return result;
    }
}

/**
 * 数组项查找
 * @memberOf module:zrender/core/util
 * @param {Array} obj
 * @param {Function} cb
 * @param {*} [context]
 * @return {*}
 */
function find(obj, cb, context) {
    if (!(obj && cb)) {
        return;
    }
    for (var i = 0, len = obj.length; i < len; i++) {
        if (cb.call(context, obj[i], i, obj)) {
            return obj[i];
        }
    }
}

/**
 * @memberOf module:zrender/core/util
 * @param {Function} func
 * @param {*} context
 * @return {Function}
 */
function bind(func, context) {
    var args = nativeSlice.call(arguments, 2);
    return function () {
        return func.apply(context, args.concat(nativeSlice.call(arguments)));
    };
}

/**
 * @memberOf module:zrender/core/util
 * @param {Function} func
 * @return {Function}
 */
function curry(func) {
    var args = nativeSlice.call(arguments, 1);
    return function () {
        return func.apply(this, args.concat(nativeSlice.call(arguments)));
    };
}

/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */
function isArray(value) {
    return objToString.call(value) === '[object Array]';
}

/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */
function isFunction$1(value) {
    return typeof value === 'function';
}

/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */
function isString(value) {
    return objToString.call(value) === '[object String]';
}

/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */
function isObject$1(value) {
    // Avoid a V8 JIT bug in Chrome 19-20.
    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
    var type = typeof value;
    return type === 'function' || (!!value && type === 'object');
}

/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */
function isBuiltInObject(value) {
    return !!BUILTIN_OBJECT[objToString.call(value)];
}

/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */
function isTypedArray(value) {
    return !!TYPED_ARRAY[objToString.call(value)];
}

/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */
function isDom(value) {
    return typeof value === 'object'
        && typeof value.nodeType === 'number'
        && typeof value.ownerDocument === 'object';
}

/**
 * Whether is exactly NaN. Notice isNaN('a') returns true.
 * @param {*} value
 * @return {boolean}
 */
function eqNaN(value) {
    /* eslint-disable-next-line no-self-compare */
    return value !== value;
}

/**
 * If value1 is not null, then return value1, otherwise judget rest of values.
 * Low performance.
 * @memberOf module:zrender/core/util
 * @return {*} Final value
 */
function retrieve(values) {
    for (var i = 0, len = arguments.length; i < len; i++) {
        if (arguments[i] != null) {
            return arguments[i];
        }
    }
}

function retrieve2(value0, value1) {
    return value0 != null
        ? value0
        : value1;
}

function retrieve3(value0, value1, value2) {
    return value0 != null
        ? value0
        : value1 != null
        ? value1
        : value2;
}

/**
 * @memberOf module:zrender/core/util
 * @param {Array} arr
 * @param {number} startIndex
 * @param {number} endIndex
 * @return {Array}
 */
function slice() {
    return Function.call.apply(nativeSlice, arguments);
}

/**
 * Normalize css liked array configuration
 * e.g.
 *  3 => [3, 3, 3, 3]
 *  [4, 2] => [4, 2, 4, 2]
 *  [4, 3, 2] => [4, 3, 2, 3]
 * @param {number|Array.<number>} val
 * @return {Array.<number>}
 */
function normalizeCssArray(val) {
    if (typeof (val) === 'number') {
        return [val, val, val, val];
    }
    var len = val.length;
    if (len === 2) {
        // vertical | horizontal
        return [val[0], val[1], val[0], val[1]];
    }
    else if (len === 3) {
        // top | horizontal | bottom
        return [val[0], val[1], val[2], val[1]];
    }
    return val;
}

/**
 * @memberOf module:zrender/core/util
 * @param {boolean} condition
 * @param {string} message
 */
function assert$1(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

/**
 * @memberOf module:zrender/core/util
 * @param {string} str string to be trimed
 * @return {string} trimed string
 */
function trim(str) {
    if (str == null) {
        return null;
    }
    else if (typeof str.trim === 'function') {
        return str.trim();
    }
    else {
        return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
}

var primitiveKey = '__ec_primitive__';
/**
 * Set an object as primitive to be ignored traversing children in clone or merge
 */
function setAsPrimitive(obj) {
    obj[primitiveKey] = true;
}

function isPrimitive(obj) {
    return obj[primitiveKey];
}

/**
 * @constructor
 * @param {Object} obj Only apply `ownProperty`.
 */
function HashMap(obj) {
    var isArr = isArray(obj);
    // Key should not be set on this, otherwise
    // methods get/set/... may be overrided.
    this.data = {};
    var thisMap = this;

    (obj instanceof HashMap)
        ? obj.each(visit)
        : (obj && each$1(obj, visit));

    function visit(value, key) {
        isArr ? thisMap.set(value, key) : thisMap.set(key, value);
    }
}

HashMap.prototype = {
    constructor: HashMap,
    // Do not provide `has` method to avoid defining what is `has`.
    // (We usually treat `null` and `undefined` as the same, different
    // from ES6 Map).
    get: function (key) {
        return this.data.hasOwnProperty(key) ? this.data[key] : null;
    },
    set: function (key, value) {
        // Comparing with invocation chaining, `return value` is more commonly
        // used in this case: `var someVal = map.set('a', genVal());`
        return (this.data[key] = value);
    },
    // Although util.each can be performed on this hashMap directly, user
    // should not use the exposed keys, who are prefixed.
    each: function (cb, context) {
        context !== void 0 && (cb = bind(cb, context));
        /* eslint-disable guard-for-in */
        for (var key in this.data) {
            this.data.hasOwnProperty(key) && cb(this.data[key], key);
        }
        /* eslint-enable guard-for-in */
    },
    // Do not use this method if performance sensitive.
    removeKey: function (key) {
        delete this.data[key];
    }
};

function createHashMap(obj) {
    return new HashMap(obj);
}

function concatArray(a, b) {
    var newArray = new a.constructor(a.length + b.length);
    for (var i = 0; i < a.length; i++) {
        newArray[i] = a[i];
    }
    var offset = a.length;
    for (i = 0; i < b.length; i++) {
        newArray[i + offset] = b[i];
    }
    return newArray;
}


function noop() {}


var zrUtil = (Object.freeze || Object)({
	$override: $override,
	clone: clone,
	merge: merge,
	mergeAll: mergeAll,
	extend: extend,
	defaults: defaults,
	createCanvas: createCanvas,
	getContext: getContext,
	indexOf: indexOf,
	inherits: inherits,
	mixin: mixin,
	isArrayLike: isArrayLike,
	each: each$1,
	map: map,
	reduce: reduce,
	filter: filter,
	find: find,
	bind: bind,
	curry: curry,
	isArray: isArray,
	isFunction: isFunction$1,
	isString: isString,
	isObject: isObject$1,
	isBuiltInObject: isBuiltInObject,
	isTypedArray: isTypedArray,
	isDom: isDom,
	eqNaN: eqNaN,
	retrieve: retrieve,
	retrieve2: retrieve2,
	retrieve3: retrieve3,
	slice: slice,
	normalizeCssArray: normalizeCssArray,
	assert: assert$1,
	trim: trim,
	setAsPrimitive: setAsPrimitive,
	isPrimitive: isPrimitive,
	createHashMap: createHashMap,
	concatArray: concatArray,
	noop: noop
});

/* global Float32Array */

var ArrayCtor = typeof Float32Array === 'undefined'
    ? Array
    : Float32Array;

/**
 * 创建一个向量
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @return {Vector2}
 */
function create(x, y) {
    var out = new ArrayCtor(2);
    if (x == null) {
        x = 0;
    }
    if (y == null) {
        y = 0;
    }
    out[0] = x;
    out[1] = y;
    return out;
}

/**
 * 复制向量数据
 * @param {Vector2} out
 * @param {Vector2} v
 * @return {Vector2}
 */
function copy(out, v) {
    out[0] = v[0];
    out[1] = v[1];
    return out;
}

/**
 * 克隆一个向量
 * @param {Vector2} v
 * @return {Vector2}
 */
function clone$1(v) {
    var out = new ArrayCtor(2);
    out[0] = v[0];
    out[1] = v[1];
    return out;
}

/**
 * 设置向量的两个项
 * @param {Vector2} out
 * @param {number} a
 * @param {number} b
 * @return {Vector2} 结果
 */
function set(out, a, b) {
    out[0] = a;
    out[1] = b;
    return out;
}

/**
 * 向量相加
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 */
function add(out, v1, v2) {
    out[0] = v1[0] + v2[0];
    out[1] = v1[1] + v2[1];
    return out;
}

/**
 * 向量缩放后相加
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @param {number} a
 */
function scaleAndAdd(out, v1, v2, a) {
    out[0] = v1[0] + v2[0] * a;
    out[1] = v1[1] + v2[1] * a;
    return out;
}

/**
 * 向量相减
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 */
function sub(out, v1, v2) {
    out[0] = v1[0] - v2[0];
    out[1] = v1[1] - v2[1];
    return out;
}

/**
 * 向量长度
 * @param {Vector2} v
 * @return {number}
 */
function len(v) {
    return Math.sqrt(lenSquare(v));
}
var length = len; // jshint ignore:line

/**
 * 向量长度平方
 * @param {Vector2} v
 * @return {number}
 */
function lenSquare(v) {
    return v[0] * v[0] + v[1] * v[1];
}
var lengthSquare = lenSquare;

/**
 * 向量乘法
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 */
function mul(out, v1, v2) {
    out[0] = v1[0] * v2[0];
    out[1] = v1[1] * v2[1];
    return out;
}

/**
 * 向量除法
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 */
function div(out, v1, v2) {
    out[0] = v1[0] / v2[0];
    out[1] = v1[1] / v2[1];
    return out;
}

/**
 * 向量点乘
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @return {number}
 */
function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1];
}

/**
 * 向量缩放
 * @param {Vector2} out
 * @param {Vector2} v
 * @param {number} s
 */
function scale(out, v, s) {
    out[0] = v[0] * s;
    out[1] = v[1] * s;
    return out;
}

/**
 * 向量归一化
 * @param {Vector2} out
 * @param {Vector2} v
 */
function normalize(out, v) {
    var d = len(v);
    if (d === 0) {
        out[0] = 0;
        out[1] = 0;
    }
    else {
        out[0] = v[0] / d;
        out[1] = v[1] / d;
    }
    return out;
}

/**
 * 计算向量间距离
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @return {number}
 */
function distance(v1, v2) {
    return Math.sqrt(
        (v1[0] - v2[0]) * (v1[0] - v2[0])
        + (v1[1] - v2[1]) * (v1[1] - v2[1])
    );
}
var dist = distance;

/**
 * 向量距离平方
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @return {number}
 */
function distanceSquare(v1, v2) {
    return (v1[0] - v2[0]) * (v1[0] - v2[0])
        + (v1[1] - v2[1]) * (v1[1] - v2[1]);
}
var distSquare = distanceSquare;

/**
 * 求负向量
 * @param {Vector2} out
 * @param {Vector2} v
 */
function negate(out, v) {
    out[0] = -v[0];
    out[1] = -v[1];
    return out;
}

/**
 * 插值两个点
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @param {number} t
 */
function lerp(out, v1, v2, t) {
    out[0] = v1[0] + t * (v2[0] - v1[0]);
    out[1] = v1[1] + t * (v2[1] - v1[1]);
    return out;
}

/**
 * 矩阵左乘向量
 * @param {Vector2} out
 * @param {Vector2} v
 * @param {Vector2} m
 */
function applyTransform(out, v, m) {
    var x = v[0];
    var y = v[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
}

/**
 * 求两个向量最小值
 * @param  {Vector2} out
 * @param  {Vector2} v1
 * @param  {Vector2} v2
 */
function min(out, v1, v2) {
    out[0] = Math.min(v1[0], v2[0]);
    out[1] = Math.min(v1[1], v2[1]);
    return out;
}

/**
 * 求两个向量最大值
 * @param  {Vector2} out
 * @param  {Vector2} v1
 * @param  {Vector2} v2
 */
function max(out, v1, v2) {
    out[0] = Math.max(v1[0], v2[0]);
    out[1] = Math.max(v1[1], v2[1]);
    return out;
}


var vector = (Object.freeze || Object)({
	create: create,
	copy: copy,
	clone: clone$1,
	set: set,
	add: add,
	scaleAndAdd: scaleAndAdd,
	sub: sub,
	len: len,
	length: length,
	lenSquare: lenSquare,
	lengthSquare: lengthSquare,
	mul: mul,
	div: div,
	dot: dot,
	scale: scale,
	normalize: normalize,
	distance: distance,
	dist: dist,
	distanceSquare: distanceSquare,
	distSquare: distSquare,
	negate: negate,
	lerp: lerp,
	applyTransform: applyTransform,
	min: min,
	max: max
});

// TODO Draggable for group
// FIXME Draggable on element which has parent rotation or scale
function Draggable() {

    this.on('mousedown', this._dragStart, this);
    this.on('mousemove', this._drag, this);
    this.on('mouseup', this._dragEnd, this);
    // `mosuemove` and `mouseup` can be continue to fire when dragging.
    // See [Drag outside] in `Handler.js`. So we do not need to trigger
    // `_dragEnd` when globalout. That would brings better user experience.
    // this.on('globalout', this._dragEnd, this);

    // this._dropTarget = null;
    // this._draggingTarget = null;

    // this._x = 0;
    // this._y = 0;
}

Draggable.prototype = {

    constructor: Draggable,

    _dragStart: function (e) {
        var draggingTarget = e.target;
        // Find if there is draggable in the ancestor
        while (draggingTarget && !draggingTarget.draggable) {
            draggingTarget = draggingTarget.parent;
        }
        if (draggingTarget) {
            this._draggingTarget = draggingTarget;
            draggingTarget.dragging = true;
            this._x = e.offsetX;
            this._y = e.offsetY;

            this.dispatchToElement(param(draggingTarget, e), 'dragstart', e.event);
        }
    },

    _drag: function (e) {
        var draggingTarget = this._draggingTarget;
        if (draggingTarget) {

            var x = e.offsetX;
            var y = e.offsetY;

            var dx = x - this._x;
            var dy = y - this._y;
            this._x = x;
            this._y = y;

            draggingTarget.drift(dx, dy, e);
            this.dispatchToElement(param(draggingTarget, e), 'drag', e.event);

            var dropTarget = this.findHover(x, y, draggingTarget).target;
            var lastDropTarget = this._dropTarget;
            this._dropTarget = dropTarget;

            if (draggingTarget !== dropTarget) {
                if (lastDropTarget && dropTarget !== lastDropTarget) {
                    this.dispatchToElement(param(lastDropTarget, e), 'dragleave', e.event);
                }
                if (dropTarget && dropTarget !== lastDropTarget) {
                    this.dispatchToElement(param(dropTarget, e), 'dragenter', e.event);
                }
            }
        }
    },

    _dragEnd: function (e) {
        var draggingTarget = this._draggingTarget;

        if (draggingTarget) {
            draggingTarget.dragging = false;
        }

        this.dispatchToElement(param(draggingTarget, e), 'dragend', e.event);

        if (this._dropTarget) {
            this.dispatchToElement(param(this._dropTarget, e), 'drop', e.event);
        }

        this._draggingTarget = null;
        this._dropTarget = null;
    }

};

function param(target, e) {
    return {target: target, topTarget: e && e.topTarget};
}

/**
 * Event Mixin
 * @module zrender/mixin/Eventful
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         pissang (https://www.github.com/pissang)
 */

var arrySlice = Array.prototype.slice;

/**
 * Event dispatcher.
 *
 * @alias module:zrender/mixin/Eventful
 * @constructor
 * @param {Object} [eventProcessor] The object eventProcessor is the scope when
 *        `eventProcessor.xxx` called.
 * @param {Function} [eventProcessor.normalizeQuery]
 *        param: {string|Object} Raw query.
 *        return: {string|Object} Normalized query.
 * @param {Function} [eventProcessor.filter] Event will be dispatched only
 *        if it returns `true`.
 *        param: {string} eventType
 *        param: {string|Object} query
 *        return: {boolean}
 * @param {Function} [eventProcessor.afterTrigger] Called after all handlers called.
 *        param: {string} eventType
 */
var Eventful = function (eventProcessor) {
    this._$handlers = {};
    this._$eventProcessor = eventProcessor;
};

Eventful.prototype = {

    constructor: Eventful,

    /**
     * The handler can only be triggered once, then removed.
     *
     * @param {string} event The event name.
     * @param {string|Object} [query] Condition used on event filter.
     * @param {Function} handler The event handler.
     * @param {Object} context
     */
    one: function (event, query, handler, context) {
        return on(this, event, query, handler, context, true);
    },

    /**
     * Bind a handler.
     *
     * @param {string} event The event name.
     * @param {string|Object} [query] Condition used on event filter.
     * @param {Function} handler The event handler.
     * @param {Object} [context]
     */
    on: function (event, query, handler, context) {
        return on(this, event, query, handler, context, false);
    },

    /**
     * Whether any handler has bound.
     *
     * @param  {string}  event
     * @return {boolean}
     */
    isSilent: function (event) {
        var _h = this._$handlers;
        return !_h[event] || !_h[event].length;
    },

    /**
     * Unbind a event.
     *
     * @param {string} [event] The event name.
     *        If no `event` input, "off" all listeners.
     * @param {Function} [handler] The event handler.
     *        If no `handler` input, "off" all listeners of the `event`.
     */
    off: function (event, handler) {
        var _h = this._$handlers;

        if (!event) {
            this._$handlers = {};
            return this;
        }

        if (handler) {
            if (_h[event]) {
                var newList = [];
                for (var i = 0, l = _h[event].length; i < l; i++) {
                    if (_h[event][i].h !== handler) {
                        newList.push(_h[event][i]);
                    }
                }
                _h[event] = newList;
            }

            if (_h[event] && _h[event].length === 0) {
                delete _h[event];
            }
        }
        else {
            delete _h[event];
        }

        return this;
    },

    /**
     * Dispatch a event.
     *
     * @param {string} type The event name.
     */
    trigger: function (type) {
        var _h = this._$handlers[type];
        var eventProcessor = this._$eventProcessor;

        if (_h) {
            var args = arguments;
            var argLen = args.length;

            if (argLen > 3) {
                args = arrySlice.call(args, 1);
            }

            var len = _h.length;
            for (var i = 0; i < len;) {
                var hItem = _h[i];
                if (eventProcessor
                    && eventProcessor.filter
                    && hItem.query != null
                    && !eventProcessor.filter(type, hItem.query)
                ) {
                    i++;
                    continue;
                }

                // Optimize advise from backbone
                switch (argLen) {
                    case 1:
                        hItem.h.call(hItem.ctx);
                        break;
                    case 2:
                        hItem.h.call(hItem.ctx, args[1]);
                        break;
                    case 3:
                        hItem.h.call(hItem.ctx, args[1], args[2]);
                        break;
                    default:
                        // have more than 2 given arguments
                        hItem.h.apply(hItem.ctx, args);
                        break;
                }

                if (hItem.one) {
                    _h.splice(i, 1);
                    len--;
                }
                else {
                    i++;
                }
            }
        }

        eventProcessor && eventProcessor.afterTrigger
            && eventProcessor.afterTrigger(type);

        return this;
    },

    /**
     * Dispatch a event with context, which is specified at the last parameter.
     *
     * @param {string} type The event name.
     */
    triggerWithContext: function (type) {
        var _h = this._$handlers[type];
        var eventProcessor = this._$eventProcessor;

        if (_h) {
            var args = arguments;
            var argLen = args.length;

            if (argLen > 4) {
                args = arrySlice.call(args, 1, args.length - 1);
            }
            var ctx = args[args.length - 1];

            var len = _h.length;
            for (var i = 0; i < len;) {
                var hItem = _h[i];
                if (eventProcessor
                    && eventProcessor.filter
                    && hItem.query != null
                    && !eventProcessor.filter(type, hItem.query)
                ) {
                    i++;
                    continue;
                }

                // Optimize advise from backbone
                switch (argLen) {
                    case 1:
                        hItem.h.call(ctx);
                        break;
                    case 2:
                        hItem.h.call(ctx, args[1]);
                        break;
                    case 3:
                        hItem.h.call(ctx, args[1], args[2]);
                        break;
                    default:
                        // have more than 2 given arguments
                        hItem.h.apply(ctx, args);
                        break;
                }

                if (hItem.one) {
                    _h.splice(i, 1);
                    len--;
                }
                else {
                    i++;
                }
            }
        }

        eventProcessor && eventProcessor.afterTrigger
            && eventProcessor.afterTrigger(type);

        return this;
    }
};


function normalizeQuery(host, query) {
    var eventProcessor = host._$eventProcessor;
    if (query != null && eventProcessor && eventProcessor.normalizeQuery) {
        query = eventProcessor.normalizeQuery(query);
    }
    return query;
}

function on(eventful, event, query, handler, context, isOnce) {
    var _h = eventful._$handlers;

    if (typeof query === 'function') {
        context = handler;
        handler = query;
        query = null;
    }

    if (!handler || !event) {
        return eventful;
    }

    query = normalizeQuery(eventful, query);

    if (!_h[event]) {
        _h[event] = [];
    }

    for (var i = 0; i < _h[event].length; i++) {
        if (_h[event][i].h === handler) {
            return eventful;
        }
    }

    var wrap = {
        h: handler,
        one: isOnce,
        query: query,
        ctx: context || eventful,
        // FIXME
        // Do not publish this feature util it is proved that it makes sense.
        callAtLast: handler.zrEventfulCallAtLast
    };

    var lastIndex = _h[event].length - 1;
    var lastWrap = _h[event][lastIndex];
    (lastWrap && lastWrap.callAtLast)
        ? _h[event].splice(lastIndex, 0, wrap)
        : _h[event].push(wrap);

    return eventful;
}

/**
 * The algoritm is learnt from
 * https://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
 * And we made some optimization for matrix inversion.
 * Other similar approaches:
 * "cv::getPerspectiveTransform", "Direct Linear Transformation".
 */

var LN2 = Math.log(2);

function determinant(rows, rank, rowStart, rowMask, colMask, detCache) {
    var cacheKey = rowMask + '-' + colMask;
    var fullRank = rows.length;

    if (detCache.hasOwnProperty(cacheKey)) {
        return detCache[cacheKey];
    }

    if (rank === 1) {
        // In this case the colMask must be like: `11101111`. We can find the place of `0`.
        var colStart = Math.round(Math.log(((1 << fullRank) - 1) & ~colMask) / LN2);
        return rows[rowStart][colStart];
    }

    var subRowMask = rowMask | (1 << rowStart);
    var subRowStart = rowStart + 1;
    while (rowMask & (1 << subRowStart)) {
        subRowStart++;
    }

    var sum = 0;
    for (var j = 0, colLocalIdx = 0; j < fullRank; j++) {
        var colTag = 1 << j;
        if (!(colTag & colMask)) {
            sum += (colLocalIdx % 2 ? -1 : 1) * rows[rowStart][j]
                // det(subMatrix(0, j))
                * determinant(rows, rank - 1, subRowStart, subRowMask, colMask | colTag, detCache);
            colLocalIdx++;
        }
    }

    detCache[cacheKey] = sum;

    return sum;
}

/**
 * Usage:
 * ```js
 * var transformer = buildTransformer(
 *     [10, 44, 100, 44, 100, 300, 10, 300],
 *     [50, 54, 130, 14, 140, 330, 14, 220]
 * );
 * var out = [];
 * transformer && transformer([11, 33], out);
 * ```
 *
 * Notice: `buildTransformer` may take more than 10ms in some Android device.
 *
 * @param {Array.<number>} src source four points, [x0, y0, x1, y1, x2, y2, x3, y3]
 * @param {Array.<number>} dest destination four points, [x0, y0, x1, y1, x2, y2, x3, y3]
 * @return {Function} transformer If fail, return null/undefined.
 */
function buildTransformer(src, dest) {
    var mA = [
        [src[0], src[1], 1, 0, 0, 0, -dest[0] * src[0], -dest[0] * src[1]],
        [0, 0, 0, src[0], src[1], 1, -dest[1] * src[0], -dest[1] * src[1]],
        [src[2], src[3], 1, 0, 0, 0, -dest[2] * src[2], -dest[2] * src[3]],
        [0, 0, 0, src[2], src[3], 1, -dest[3] * src[2], -dest[3] * src[3]],
        [src[4], src[5], 1, 0, 0, 0, -dest[4] * src[4], -dest[4] * src[5]],
        [0, 0, 0, src[4], src[5], 1, -dest[5] * src[4], -dest[5] * src[5]],
        [src[6], src[7], 1, 0, 0, 0, -dest[6] * src[6], -dest[6] * src[7]],
        [0, 0, 0, src[6], src[7], 1, -dest[7] * src[6], -dest[7] * src[7]]
    ];

    var detCache = {};
    var det = determinant(mA, 8, 0, 0, 0, detCache);
    if (det === 0) {
        // can not make transformer when and only when
        // any three of the markers are collinear.
        return;
    }

    // `invert(mA) * dest`, that is, `adj(mA) / det * dest`.
    var vh = [];
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            vh[j] == null && (vh[j] = 0);
            vh[j] += ((i + j) % 2 ? -1 : 1)
                // det(subMatrix(i, j))
                * determinant(mA, 7, i === 0 ? 1 : 0, 1 << i, 1 << j, detCache)
                / det * dest[i];
        }
    }

    return function (out, srcPointX, srcPointY) {
        var pk = srcPointX * vh[6] + srcPointY * vh[7] + 1;
        out[0] = (srcPointX * vh[0] + srcPointY * vh[1] + vh[2]) / pk;
        out[1] = (srcPointX * vh[3] + srcPointY * vh[4] + vh[5]) / pk;
    };
}

var EVENT_SAVED_PROP = '___zrEVENTSAVED';
var _calcOut$1 = [];

/**
 * Transform "local coord" from `elFrom` to `elTarget`.
 * "local coord": the coord based on the input `el`. The origin point is at
 *     the position of "left: 0; top: 0;" in the `el`.
 *
 * Support when CSS transform is used.
 *
 * Having the `out` (that is, `[outX, outY]`), we can create an DOM element
 * and set the CSS style as "left: outX; top: outY;" and append it to `elTarge`
 * to locate the element.
 *
 * For example, this code below positions a child of `document.body` on the event
 * point, no matter whether `body` has `margin`/`paddin`/`transfrom`/... :
 * ```js
 * transformLocalCoord(out, container, document.body, event.offsetX, event.offsetY);
 * if (!eqNaN(out[0])) {
 *     // Then locate the tip element on the event point.
 *     var tipEl = document.createElement('div');
 *     tipEl.style.cssText = 'position: absolute; left:' + out[0] + ';top:' + out[1] + ';';
 *     document.body.appendChild(tipEl);
 * }
 * ```
 *
 * Notice: In some env this method is not supported. If called, `out` will be `[NaN, NaN]`.
 *
 * @param {Array.<number>} out [inX: number, inY: number] The output..
 *        If can not transform, `out` will not be modified but return `false`.
 * @param {HTMLElement} elFrom The `[inX, inY]` is based on elFrom.
 * @param {HTMLElement} elTarget The `out` is based on elTarget.
 * @param {number} inX
 * @param {number} inY
 * @return {boolean} Whether transform successfully.
 */
function transformLocalCoord(out, elFrom, elTarget, inX, inY) {
    return transformCoordWithViewport(_calcOut$1, elFrom, inX, inY, true)
        && transformCoordWithViewport(out, elTarget, _calcOut$1[0], _calcOut$1[1]);
}

/**
 * Transform between a "viewport coord" and a "local coord".
 * "viewport coord": the coord based on the left-top corner of the viewport
 *     of the browser.
 * "local coord": the coord based on the input `el`. The origin point is at
 *     the position of "left: 0; top: 0;" in the `el`.
 *
 * Support the case when CSS transform is used on el.
 *
 * @param {Array.<number>} out [inX: number, inY: number] The output. If `inverse: false`,
 *        it represents "local coord", otherwise "vireport coord".
 *        If can not transform, `out` will not be modified but return `false`.
 * @param {HTMLElement} el The "local coord" is based on the `el`, see comment above.
 * @param {number} inX If `inverse: false`,
 *        it represents "vireport coord", otherwise "local coord".
 * @param {number} inY If `inverse: false`,
 *        it represents "vireport coord", otherwise "local coord".
 * @param {boolean} [inverse=false]
 *        `true`: from "viewport coord" to "local coord".
 *        `false`: from "local coord" to "viewport coord".
 * @return {boolean} Whether transform successfully.
 */
function transformCoordWithViewport(out, el, inX, inY, inverse) {
    if (el.getBoundingClientRect && env$1.domSupported && !isCanvasEl(el)) {
        var saved = el[EVENT_SAVED_PROP] || (el[EVENT_SAVED_PROP] = {});
        var markers = prepareCoordMarkers(el, saved);
        var transformer = preparePointerTransformer(markers, saved, inverse);
        if (transformer) {
            transformer(out, inX, inY);
            return true;
        }
    }
    return false;
}

function prepareCoordMarkers(el, saved) {
    var markers = saved.markers;
    if (markers) {
        return markers;
    }

    markers = saved.markers = [];
    var propLR = ['left', 'right'];
    var propTB = ['top', 'bottom'];

    for (var i = 0; i < 4; i++) {
        var marker = document.createElement('div');
        var stl = marker.style;
        var idxLR = i % 2;
        var idxTB = (i >> 1) % 2;
        stl.cssText = [
            'position: absolute',
            'visibility: hidden',
            'padding: 0',
            'margin: 0',
            'border-width: 0',
            'user-select: none',
            'width:0',
            'height:0',
            // 'width: 5px',
            // 'height: 5px',
            propLR[idxLR] + ':0',
            propTB[idxTB] + ':0',
            propLR[1 - idxLR] + ':auto',
            propTB[1 - idxTB] + ':auto',
            ''
        ].join('!important;');
        el.appendChild(marker);
        markers.push(marker);
    }

    return markers;
}

function preparePointerTransformer(markers, saved, inverse) {
    var transformerName = inverse ? 'invTrans' : 'trans';
    var transformer = saved[transformerName];
    var oldSrcCoords = saved.srcCoords;
    var oldCoordTheSame = true;
    var srcCoords = [];
    var destCoords = [];

    for (var i = 0; i < 4; i++) {
        var rect = markers[i].getBoundingClientRect();
        var ii = 2 * i;
        var x = rect.left;
        var y = rect.top;
        srcCoords.push(x, y);
        oldCoordTheSame = oldCoordTheSame && oldSrcCoords && x === oldSrcCoords[ii] && y === oldSrcCoords[ii + 1];
        destCoords.push(markers[i].offsetLeft, markers[i].offsetTop);
    }
    // Cache to avoid time consuming of `buildTransformer`.
    return (oldCoordTheSame && transformer)
        ? transformer
        : (
            saved.srcCoords = srcCoords,
            saved[transformerName] = inverse
                ? buildTransformer(destCoords, srcCoords)
                : buildTransformer(srcCoords, destCoords)
        );
}

function isCanvasEl(el) {
    return el.nodeName.toUpperCase() === 'CANVAS';
}

/**
 * Utilities for mouse or touch events.
 */

var isDomLevel2 = (typeof window !== 'undefined') && !!window.addEventListener;

var MOUSE_EVENT_REG = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;
var _calcOut = [];

/**
 * Get the `zrX` and `zrY`, which are relative to the top-left of
 * the input `el`.
 * CSS transform (2D & 3D) is supported.
 *
 * The strategy to fetch the coords:
 * + If `calculate` is not set as `true`, users of this method should
 * ensure that `el` is the same or the same size & location as `e.target`.
 * Otherwise the result coords are probably not expected. Because we
 * firstly try to get coords from e.offsetX/e.offsetY.
 * + If `calculate` is set as `true`, the input `el` can be any element
 * and we force to calculate the coords based on `el`.
 * + The input `el` should be positionable (not position:static).
 *
 * The force `calculate` can be used in case like:
 * When mousemove event triggered on ec tooltip, `e.target` is not `el`(zr painter.dom).
 *
 * @param {HTMLElement} el DOM element.
 * @param {Event} e Mouse event or touch event.
 * @param {Object} out Get `out.zrX` and `out.zrY` as the result.
 * @param {boolean} [calculate=false] Whether to force calculate
 *        the coordinates but not use ones provided by browser.
 */
function clientToLocal(el, e, out, calculate) {
    out = out || {};

    // According to the W3C Working Draft, offsetX and offsetY should be relative
    // to the padding edge of the target element. The only browser using this convention
    // is IE. Webkit uses the border edge, Opera uses the content edge, and FireFox does
    // not support the properties.
    // (see http://www.jacklmoore.com/notes/mouse-position/)
    // In zr painter.dom, padding edge equals to border edge.

    if (calculate || !env$1.canvasSupported) {
        calculateZrXY(el, e, out);
    }
    // Caution: In FireFox, layerX/layerY Mouse position relative to the closest positioned
    // ancestor element, so we should make sure el is positioned (e.g., not position:static).
    // BTW1, Webkit don't return the same results as FF in non-simple cases (like add
    // zoom-factor, overflow / opacity layers, transforms ...)
    // BTW2, (ev.offsetY || ev.pageY - $(ev.target).offset().top) is not correct in preserve-3d.
    // <https://bugs.jquery.com/ticket/8523#comment:14>
    // BTW3, In ff, offsetX/offsetY is always 0.
    else if (env$1.browser.firefox && e.layerX != null && e.layerX !== e.offsetX) {
        out.zrX = e.layerX;
        out.zrY = e.layerY;
    }
    // For IE6+, chrome, safari, opera. (When will ff support offsetX?)
    else if (e.offsetX != null) {
        out.zrX = e.offsetX;
        out.zrY = e.offsetY;
    }
    // For some other device, e.g., IOS safari.
    else {
        calculateZrXY(el, e, out);
    }

    return out;
}

function calculateZrXY(el, e, out) {
    // BlackBerry 5, iOS 3 (original iPhone) don't have getBoundingRect.
    if (env$1.domSupported && el.getBoundingClientRect) {
        var ex = e.clientX;
        var ey = e.clientY;

        if (isCanvasEl(el)) {
            // Original approach, which do not support CSS transform.
            // marker can not be locationed in a canvas container
            // (getBoundingClientRect is always 0). We do not support
            // that input a pre-created canvas to zr while using css
            // transform in iOS.
            var box = el.getBoundingClientRect();
            out.zrX = ex - box.left;
            out.zrY = ey - box.top;
            return;
        }
        else {
            if (transformCoordWithViewport(_calcOut, el, ex, ey)) {
                out.zrX = _calcOut[0];
                out.zrY = _calcOut[1];
                return;
            }
        }
    }
    out.zrX = out.zrY = 0;
}

/**
 * Find native event compat for legency IE.
 * Should be called at the begining of a native event listener.
 *
 * @param {Event} [e] Mouse event or touch event or pointer event.
 *        For lagency IE, we use `window.event` is used.
 * @return {Event} The native event.
 */
function getNativeEvent(e) {
    return e || window.event;
}

/**
 * Normalize the coordinates of the input event.
 *
 * Get the `e.zrX` and `e.zrY`, which are relative to the top-left of
 * the input `el`.
 * Get `e.zrDelta` if using mouse wheel.
 * Get `e.which`, see the comment inside this function.
 *
 * Do not calculate repeatly if `zrX` and `zrY` already exist.
 *
 * Notice: see comments in `clientToLocal`. check the relationship
 * between the result coords and the parameters `el` and `calculate`.
 *
 * @param {HTMLElement} el DOM element.
 * @param {Event} [e] See `getNativeEvent`.
 * @param {boolean} [calculate=false] Whether to force calculate
 *        the coordinates but not use ones provided by browser.
 * @return {UIEvent} The normalized native UIEvent.
 */
function normalizeEvent(el, e, calculate) {

    e = getNativeEvent(e);

    if (e.zrX != null) {
        return e;
    }

    var eventType = e.type;
    var isTouch = eventType && eventType.indexOf('touch') >= 0;

    if (!isTouch) {
        clientToLocal(el, e, e, calculate);
        e.zrDelta = (e.wheelDelta) ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
    }
    else {
        var touch = eventType !== 'touchend'
            ? e.targetTouches[0]
            : e.changedTouches[0];
        touch && clientToLocal(el, touch, e, calculate);
    }

    // Add which for click: 1 === left; 2 === middle; 3 === right; otherwise: 0;
    // See jQuery: https://github.com/jquery/jquery/blob/master/src/event.js
    // If e.which has been defined, it may be readonly,
    // see: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/which
    var button = e.button;
    if (e.which == null && button !== undefined && MOUSE_EVENT_REG.test(e.type)) {
        e.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
    }
    // [Caution]: `e.which` from browser is not always reliable. For example,
    // when press left button and `mousemove (pointermove)` in Edge, the `e.which`
    // is 65536 and the `e.button` is -1. But the `mouseup (pointerup)` and
    // `mousedown (pointerdown)` is the same as Chrome does.

    return e;
}

/**
 * @param {HTMLElement} el
 * @param {string} name
 * @param {Function} handler
 * @param {Object|boolean} opt If boolean, means `opt.capture`
 * @param {boolean} [opt.capture=false]
 * @param {boolean} [opt.passive=false]
 */
function addEventListener(el, name, handler, opt) {
    if (isDomLevel2) {
        // Reproduct the console warning:
        // [Violation] Added non-passive event listener to a scroll-blocking <some> event.
        // Consider marking event handler as 'passive' to make the page more responsive.
        // Just set console log level: verbose in chrome dev tool.
        // then the warning log will be printed when addEventListener called.
        // See https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
        // We have not yet found a neat way to using passive. Because in zrender the dom event
        // listener delegate all of the upper events of element. Some of those events need
        // to prevent default. For example, the feature `preventDefaultMouseMove` of echarts.
        // Before passive can be adopted, these issues should be considered:
        // (1) Whether and how a zrender user specifies an event listener passive. And by default,
        // passive or not.
        // (2) How to tread that some zrender event listener is passive, and some is not. If
        // we use other way but not preventDefault of mousewheel and touchmove, browser
        // compatibility should be handled.

        // var opts = (env.passiveSupported && name === 'mousewheel')
        //     ? {passive: true}
        //     // By default, the third param of el.addEventListener is `capture: false`.
        //     : void 0;
        // el.addEventListener(name, handler /* , opts */);
        el.addEventListener(name, handler, opt);
    }
    else {
        // For simplicity, do not implement `setCapture` for IE9-.
        el.attachEvent('on' + name, handler);
    }
}

/**
 * Parameter are the same as `addEventListener`.
 *
 * Notice that if a listener is registered twice, one with capture and one without,
 * remove each one separately. Removal of a capturing listener does not affect a
 * non-capturing version of the same listener, and vice versa.
 */
function removeEventListener(el, name, handler, opt) {
    if (isDomLevel2) {
        el.removeEventListener(name, handler, opt);
    }
    else {
        el.detachEvent('on' + name, handler);
    }
}

/**
 * preventDefault and stopPropagation.
 * Notice: do not use this method in zrender. It can only be
 * used by upper applications if necessary.
 *
 * @param {Event} e A mouse or touch event.
 */
var stop = isDomLevel2
    ? function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
    }
    : function (e) {
        e.returnValue = false;
        e.cancelBubble = true;
    };

/**
 * This method only works for mouseup and mousedown. The functionality is restricted
 * for fault tolerance, See the `e.which` compatibility above.
 *
 * @param {MouseEvent} e
 * @return {boolean}
 */
function isMiddleOrRightButtonOnMouseUpDown(e) {
    return e.which === 2 || e.which === 3;
}

/**
 * To be removed.
 * @deprecated
 */

/**
 * Only implements needed gestures for mobile.
 */

var GestureMgr = function () {

    /**
     * @private
     * @type {Array.<Object>}
     */
    this._track = [];
};

GestureMgr.prototype = {

    constructor: GestureMgr,

    recognize: function (event, target, root) {
        this._doTrack(event, target, root);
        return this._recognize(event);
    },

    clear: function () {
        this._track.length = 0;
        return this;
    },

    _doTrack: function (event, target, root) {
        var touches = event.touches;

        if (!touches) {
            return;
        }

        var trackItem = {
            points: [],
            touches: [],
            target: target,
            event: event
        };

        for (var i = 0, len = touches.length; i < len; i++) {
            var touch = touches[i];
            var pos = clientToLocal(root, touch, {});
            trackItem.points.push([pos.zrX, pos.zrY]);
            trackItem.touches.push(touch);
        }

        this._track.push(trackItem);
    },

    _recognize: function (event) {
        for (var eventName in recognizers) {
            if (recognizers.hasOwnProperty(eventName)) {
                var gestureInfo = recognizers[eventName](this._track, event);
                if (gestureInfo) {
                    return gestureInfo;
                }
            }
        }
    }
};

function dist$1(pointPair) {
    var dx = pointPair[1][0] - pointPair[0][0];
    var dy = pointPair[1][1] - pointPair[0][1];

    return Math.sqrt(dx * dx + dy * dy);
}

function center(pointPair) {
    return [
        (pointPair[0][0] + pointPair[1][0]) / 2,
        (pointPair[0][1] + pointPair[1][1]) / 2
    ];
}

var recognizers = {

    pinch: function (track, event) {
        var trackLen = track.length;

        if (!trackLen) {
            return;
        }

        var pinchEnd = (track[trackLen - 1] || {}).points;
        var pinchPre = (track[trackLen - 2] || {}).points || pinchEnd;

        if (pinchPre
            && pinchPre.length > 1
            && pinchEnd
            && pinchEnd.length > 1
        ) {
            var pinchScale = dist$1(pinchEnd) / dist$1(pinchPre);
            !isFinite(pinchScale) && (pinchScale = 1);

            event.pinchScale = pinchScale;

            var pinchCenter = center(pinchEnd);
            event.pinchX = pinchCenter[0];
            event.pinchY = pinchCenter[1];

            return {
                type: 'pinch',
                target: track[0].target,
                event: event
            };
        }
    }

    // Only pinch currently.
};

/**
 * [The interface between `Handler` and `HandlerProxy`]:
 *
 * The default `HandlerProxy` only support the common standard web environment
 * (e.g., standalone browser, headless browser, embed browser in mobild APP, ...).
 * But `HandlerProxy` can be replaced to support more non-standard environment
 * (e.g., mini app), or to support more feature that the default `HandlerProxy`
 * not provided (like echarts-gl did).
 * So the interface between `Handler` and `HandlerProxy` should be stable. Do not
 * make break changes util inevitable. The interface include the public methods
 * of `Handler` and the events listed in `handlerNames` below, by which `HandlerProxy`
 * drives `Handler`.
 */

/**
 * [Drag outside]:
 *
 * That is, triggering `mousemove` and `mouseup` event when the pointer is out of the
 * zrender area when dragging. That is important for the improvement of the user experience
 * when dragging something near the boundary without being terminated unexpectedly.
 *
 * We originally consider to introduce new events like `pagemovemove` and `pagemouseup`
 * to resolve this issue. But some drawbacks of it is described in
 * https://github.com/ecomfe/zrender/pull/536#issuecomment-560286899
 *
 * Instead, we referenced the specifications:
 * https://www.w3.org/TR/touch-events/#the-touchmove-event
 * https://www.w3.org/TR/2014/WD-DOM-Level-3-Events-20140925/#event-type-mousemove
 * where the the mousemove/touchmove can be continue to fire if the user began a drag
 * operation and the pointer has left the boundary. (for the mouse event, browsers
 * only do it on `document` and when the pointer has left the boundary of the browser.)
 *
 * So the default `HandlerProxy` supports this feature similarly: if it is in the dragging
 * state (see `pointerCapture` in `HandlerProxy`), the `mousemove` and `mouseup` continue
 * to fire until release the pointer. That is implemented by listen to those event on
 * `document`.
 * If we implement some other `HandlerProxy` only for touch device, that would be easier.
 * The touch event support this feature by default.
 *
 * Note:
 * There might be some cases that the mouse event can not be
 * received on `document`. For example,
 * (A) `useCapture` is not supported and some user defined event listeners on the ancestor
 * of zr dom throw Error .
 * (B) `useCapture` is not supported Some user defined event listeners on the ancestor of
 * zr dom call `stopPropagation`.
 * In these cases, the `mousemove` event might be keep triggered event
 * if the mouse is released. We try to reduce the side-effect in those cases.
 * That is, do nothing (especially, `findHover`) in those cases. See `isOutsideBoundary`.
 *
 * Note:
 * If `HandlerProxy` listens to `document` with `useCapture`, `HandlerProxy` needs to
 * make sure `stopPropagation` and `preventDefault` doing nothing if and only if the event
 * target is not zrender dom. Becuase it is dangerous to enable users to call them in
 * `document` capture phase to prevent the propagation to any listener of the webpage.
 * But they are needed to work when the pointer inside the zrender dom.
 */


var SILENT = 'silent';

function makeEventPacket(eveType, targetInfo, event) {
    return {
        type: eveType,
        event: event,
        // target can only be an element that is not silent.
        target: targetInfo.target,
        // topTarget can be a silent element.
        topTarget: targetInfo.topTarget,
        cancelBubble: false,
        offsetX: event.zrX,
        offsetY: event.zrY,
        gestureEvent: event.gestureEvent,
        pinchX: event.pinchX,
        pinchY: event.pinchY,
        pinchScale: event.pinchScale,
        wheelDelta: event.zrDelta,
        zrByTouch: event.zrByTouch,
        which: event.which,
        stop: stopEvent
    };
}

function stopEvent() {
    stop(this.event);
}

function EmptyProxy() {}
EmptyProxy.prototype.dispose = function () {};


var handlerNames = [
    'click', 'dblclick', 'mousewheel', 'mouseout',
    'mouseup', 'mousedown', 'mousemove', 'contextmenu'
];

/**
 * @alias module:zrender/Handler
 * @constructor
 * @extends module:zrender/mixin/Eventful
 * @param {module:zrender/Storage} storage Storage instance.
 * @param {module:zrender/Painter} painter Painter instance.
 * @param {module:zrender/dom/HandlerProxy} proxy HandlerProxy instance.
 * @param {HTMLElement} painterRoot painter.root (not painter.getViewportRoot()).
 */
var Handler = function (storage, painter, proxy, painterRoot) {
    Eventful.call(this);

    this.storage = storage;

    this.painter = painter;

    this.painterRoot = painterRoot;

    proxy = proxy || new EmptyProxy();

    /**
     * Proxy of event. can be Dom, WebGLSurface, etc.
     */
    this.proxy = null;

    /**
     * {target, topTarget, x, y}
     * @private
     * @type {Object}
     */
    this._hovered = {};

    /**
     * @private
     * @type {Date}
     */
    this._lastTouchMoment;

    /**
     * @private
     * @type {number}
     */
    this._lastX;

    /**
     * @private
     * @type {number}
     */
    this._lastY;

    /**
     * @private
     * @type {module:zrender/core/GestureMgr}
     */
    this._gestureMgr;

    Draggable.call(this);

    this.setHandlerProxy(proxy);
};

Handler.prototype = {

    constructor: Handler,

    setHandlerProxy: function (proxy) {
        if (this.proxy) {
            this.proxy.dispose();
        }

        if (proxy) {
            each$1(handlerNames, function (name) {
                proxy.on && proxy.on(name, this[name], this);
            }, this);
            // Attach handler
            proxy.handler = this;
        }
        this.proxy = proxy;
    },

    mousemove: function (event) {
        var x = event.zrX;
        var y = event.zrY;

        var isOutside = isOutsideBoundary(this, x, y);

        var lastHovered = this._hovered;
        var lastHoveredTarget = lastHovered.target;

        // If lastHoveredTarget is removed from zr (detected by '__zr') by some API call
        // (like 'setOption' or 'dispatchAction') in event handlers, we should find
        // lastHovered again here. Otherwise 'mouseout' can not be triggered normally.
        // See #6198.
        if (lastHoveredTarget && !lastHoveredTarget.__zr) {
            lastHovered = this.findHover(lastHovered.x, lastHovered.y);
            lastHoveredTarget = lastHovered.target;
        }

        var hovered = this._hovered = isOutside ? {x: x, y: y} : this.findHover(x, y);
        var hoveredTarget = hovered.target;

        var proxy = this.proxy;
        proxy.setCursor && proxy.setCursor(hoveredTarget ? hoveredTarget.cursor : 'default');

        // Mouse out on previous hovered element
        if (lastHoveredTarget && hoveredTarget !== lastHoveredTarget) {
            this.dispatchToElement(lastHovered, 'mouseout', event);
        }

        // Mouse moving on one element
        this.dispatchToElement(hovered, 'mousemove', event);

        // Mouse over on a new element
        if (hoveredTarget && hoveredTarget !== lastHoveredTarget) {
            this.dispatchToElement(hovered, 'mouseover', event);
        }
    },

    mouseout: function (event) {
        var eventControl = event.zrEventControl;
        var zrIsToLocalDOM = event.zrIsToLocalDOM;

        if (eventControl !== 'only_globalout') {
            this.dispatchToElement(this._hovered, 'mouseout', event);
        }

        if (eventControl !== 'no_globalout') {
            // FIXME: if the pointer moving from the extra doms to realy "outside",
            // the `globalout` should have been triggered. But currently not.
            !zrIsToLocalDOM && this.trigger('globalout', {type: 'globalout', event: event});
        }
    },

    /**
     * Resize
     */
    resize: function (event) {
        this._hovered = {};
    },

    /**
     * Dispatch event
     * @param {string} eventName
     * @param {event=} eventArgs
     */
    dispatch: function (eventName, eventArgs) {
        var handler = this[eventName];
        handler && handler.call(this, eventArgs);
    },

    /**
     * Dispose
     */
    dispose: function () {

        this.proxy.dispose();

        this.storage =
        this.proxy =
        this.painter = null;
    },

    /**
     * 设置默认的cursor style
     * @param {string} [cursorStyle='default'] 例如 crosshair
     */
    setCursorStyle: function (cursorStyle) {
        var proxy = this.proxy;
        proxy.setCursor && proxy.setCursor(cursorStyle);
    },

    /**
     * 事件分发代理
     *
     * @private
     * @param {Object} targetInfo {target, topTarget} 目标图形元素
     * @param {string} eventName 事件名称
     * @param {Object} event 事件对象
     */
    dispatchToElement: function (targetInfo, eventName, event) {
        targetInfo = targetInfo || {};
        var el = targetInfo.target;
        if (el && el.silent) {
            return;
        }
        var eventHandler = 'on' + eventName;
        var eventPacket = makeEventPacket(eventName, targetInfo, event);

        while (el) {
            el[eventHandler]
                && (eventPacket.cancelBubble = el[eventHandler].call(el, eventPacket));

            el.trigger(eventName, eventPacket);

            el = el.parent;

            if (eventPacket.cancelBubble) {
                break;
            }
        }

        if (!eventPacket.cancelBubble) {
            // 冒泡到顶级 zrender 对象
            this.trigger(eventName, eventPacket);
            // 分发事件到用户自定义层
            // 用户有可能在全局 click 事件中 dispose，所以需要判断下 painter 是否存在
            this.painter && this.painter.eachOtherLayer(function (layer) {
                if (typeof (layer[eventHandler]) === 'function') {
                    layer[eventHandler].call(layer, eventPacket);
                }
                if (layer.trigger) {
                    layer.trigger(eventName, eventPacket);
                }
            });
        }
    },

    /**
     * @private
     * @param {number} x
     * @param {number} y
     * @param {module:zrender/graphic/Displayable} exclude
     * @return {model:zrender/Element}
     * @method
     */
    findHover: function (x, y, exclude) {
        var list = this.storage.getDisplayList();
        var out = {x: x, y: y};

        for (var i = list.length - 1; i >= 0; i--) {
            var hoverCheckResult;
            if (list[i] !== exclude
                // getDisplayList may include ignored item in VML mode
                && !list[i].ignore
                && (hoverCheckResult = isHover(list[i], x, y))
            ) {
                !out.topTarget && (out.topTarget = list[i]);
                if (hoverCheckResult !== SILENT) {
                    out.target = list[i];
                    break;
                }
            }
        }

        return out;
    },

    processGesture: function (event, stage) {
        if (!this._gestureMgr) {
            this._gestureMgr = new GestureMgr();
        }
        var gestureMgr = this._gestureMgr;

        stage === 'start' && gestureMgr.clear();

        var gestureInfo = gestureMgr.recognize(
            event,
            this.findHover(event.zrX, event.zrY, null).target,
            this.proxy.dom
        );

        stage === 'end' && gestureMgr.clear();

        // Do not do any preventDefault here. Upper application do that if necessary.
        if (gestureInfo) {
            var type = gestureInfo.type;
            event.gestureEvent = type;

            this.dispatchToElement({target: gestureInfo.target}, type, gestureInfo.event);
        }
    }
};

// Common handlers
each$1(['click', 'mousedown', 'mouseup', 'mousewheel', 'dblclick', 'contextmenu'], function (name) {
    Handler.prototype[name] = function (event) {
        var x = event.zrX;
        var y = event.zrY;
        var isOutside = isOutsideBoundary(this, x, y);

        var hovered;
        var hoveredTarget;

        if (name !== 'mouseup' || !isOutside) {
            // Find hover again to avoid click event is dispatched manually. Or click is triggered without mouseover
            hovered = this.findHover(x, y);
            hoveredTarget = hovered.target;
        }

        if (name === 'mousedown') {
            this._downEl = hoveredTarget;
            this._downPoint = [event.zrX, event.zrY];
            // In case click triggered before mouseup
            this._upEl = hoveredTarget;
        }
        else if (name === 'mouseup') {
            this._upEl = hoveredTarget;
        }
        else if (name === 'click') {
            if (this._downEl !== this._upEl
                // Original click event is triggered on the whole canvas element,
                // including the case that `mousedown` - `mousemove` - `mouseup`,
                // which should be filtered, otherwise it will bring trouble to
                // pan and zoom.
                || !this._downPoint
                // Arbitrary value
                || dist(this._downPoint, [event.zrX, event.zrY]) > 4
            ) {
                return;
            }
            this._downPoint = null;
        }

        this.dispatchToElement(hovered, name, event);
    };
});

function isHover(displayable, x, y) {
    if (displayable[displayable.rectHover ? 'rectContain' : 'contain'](x, y)) {
        var el = displayable;
        var isSilent;
        while (el) {
            // If clipped by ancestor.
            // FIXME: If clipPath has neither stroke nor fill,
            // el.clipPath.contain(x, y) will always return false.
            if (el.clipPath && !el.clipPath.contain(x, y)) {
                return false;
            }
            if (el.silent) {
                isSilent = true;
            }
            el = el.parent;
        }
        return isSilent ? SILENT : true;
    }

    return false;
}

/**
 * See [Drag outside].
 */
function isOutsideBoundary(handlerInstance, x, y) {
    var painter = handlerInstance.painter;
    return x < 0 || x > painter.getWidth() || y < 0 || y > painter.getHeight();
}

mixin(Handler, Eventful);
mixin(Handler, Draggable);

/**
 * 3x2矩阵操作类
 * @exports zrender/tool/matrix
 */

/* global Float32Array */

var ArrayCtor$1 = typeof Float32Array === 'undefined'
    ? Array
    : Float32Array;

/**
 * Create a identity matrix.
 * @return {Float32Array|Array.<number>}
 */
function create$1() {
    var out = new ArrayCtor$1(6);
    identity(out);

    return out;
}

/**
 * 设置矩阵为单位矩阵
 * @param {Float32Array|Array.<number>} out
 */
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
}

/**
 * 复制矩阵
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} m
 */
function copy$1(out, m) {
    out[0] = m[0];
    out[1] = m[1];
    out[2] = m[2];
    out[3] = m[3];
    out[4] = m[4];
    out[5] = m[5];
    return out;
}

/**
 * 矩阵相乘
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} m1
 * @param {Float32Array|Array.<number>} m2
 */
function mul$1(out, m1, m2) {
    // Consider matrix.mul(m, m2, m);
    // where out is the same as m2.
    // So use temp variable to escape error.
    var out0 = m1[0] * m2[0] + m1[2] * m2[1];
    var out1 = m1[1] * m2[0] + m1[3] * m2[1];
    var out2 = m1[0] * m2[2] + m1[2] * m2[3];
    var out3 = m1[1] * m2[2] + m1[3] * m2[3];
    var out4 = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
    var out5 = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
    out[0] = out0;
    out[1] = out1;
    out[2] = out2;
    out[3] = out3;
    out[4] = out4;
    out[5] = out5;
    return out;
}

/**
 * 平移变换
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} a
 * @param {Float32Array|Array.<number>} v
 */
function translate(out, a, v) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4] + v[0];
    out[5] = a[5] + v[1];
    return out;
}

/**
 * 旋转变换
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} a
 * @param {number} rad
 */
function rotate(out, a, rad) {
    var aa = a[0];
    var ac = a[2];
    var atx = a[4];
    var ab = a[1];
    var ad = a[3];
    var aty = a[5];
    var st = Math.sin(rad);
    var ct = Math.cos(rad);

    out[0] = aa * ct + ab * st;
    out[1] = -aa * st + ab * ct;
    out[2] = ac * ct + ad * st;
    out[3] = -ac * st + ct * ad;
    out[4] = ct * atx + st * aty;
    out[5] = ct * aty - st * atx;
    return out;
}

/**
 * 缩放变换
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} a
 * @param {Float32Array|Array.<number>} v
 */
function scale$1(out, a, v) {
    var vx = v[0];
    var vy = v[1];
    out[0] = a[0] * vx;
    out[1] = a[1] * vy;
    out[2] = a[2] * vx;
    out[3] = a[3] * vy;
    out[4] = a[4] * vx;
    out[5] = a[5] * vy;
    return out;
}

/**
 * 求逆矩阵
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} a
 */
function invert(out, a) {

    var aa = a[0];
    var ac = a[2];
    var atx = a[4];
    var ab = a[1];
    var ad = a[3];
    var aty = a[5];

    var det = aa * ad - ab * ac;
    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
}

/**
 * Clone a new matrix.
 * @param {Float32Array|Array.<number>} a
 */
function clone$2(a) {
    var b = create$1();
    copy$1(b, a);
    return b;
}

var matrix = (Object.freeze || Object)({
	create: create$1,
	identity: identity,
	copy: copy$1,
	mul: mul$1,
	translate: translate,
	rotate: rotate,
	scale: scale$1,
	invert: invert,
	clone: clone$2
});

/**
 * 提供变换扩展
 * @module zrender/mixin/Transformable
 * @author pissang (https://www.github.com/pissang)
 */

var mIdentity = identity;

var EPSILON = 5e-5;

function isNotAroundZero(val) {
    return val > EPSILON || val < -EPSILON;
}

/**
 * @alias module:zrender/mixin/Transformable
 * @constructor
 */
var Transformable = function (opts) {
    opts = opts || {};
    // If there are no given position, rotation, scale
    if (!opts.position) {
        /**
         * 平移
         * @type {Array.<number>}
         * @default [0, 0]
         */
        this.position = [0, 0];
    }
    if (opts.rotation == null) {
        /**
         * 旋转
         * @type {Array.<number>}
         * @default 0
         */
        this.rotation = 0;
    }
    if (!opts.scale) {
        /**
         * 缩放
         * @type {Array.<number>}
         * @default [1, 1]
         */
        this.scale = [1, 1];
    }
    /**
     * 旋转和缩放的原点
     * @type {Array.<number>}
     * @default null
     */
    this.origin = this.origin || null;
};

var transformableProto = Transformable.prototype;
transformableProto.transform = null;

/**
 * 判断是否需要有坐标变换
 * 如果有坐标变换, 则从position, rotation, scale以及父节点的transform计算出自身的transform矩阵
 */
transformableProto.needLocalTransform = function () {
    return isNotAroundZero(this.rotation)
        || isNotAroundZero(this.position[0])
        || isNotAroundZero(this.position[1])
        || isNotAroundZero(this.scale[0] - 1)
        || isNotAroundZero(this.scale[1] - 1);
};

var scaleTmp = [];
transformableProto.updateTransform = function () {
    var parent = this.parent;
    var parentHasTransform = parent && parent.transform;
    var needLocalTransform = this.needLocalTransform();

    var m = this.transform;
    if (!(needLocalTransform || parentHasTransform)) {
        m && mIdentity(m);
        return;
    }

    m = m || create$1();

    if (needLocalTransform) {
        this.getLocalTransform(m);
    }
    else {
        mIdentity(m);
    }

    // 应用父节点变换
    if (parentHasTransform) {
        if (needLocalTransform) {
            mul$1(m, parent.transform, m);
        }
        else {
            copy$1(m, parent.transform);
        }
    }
    // 保存这个变换矩阵
    this.transform = m;

    var globalScaleRatio = this.globalScaleRatio;
    if (globalScaleRatio != null && globalScaleRatio !== 1) {
        this.getGlobalScale(scaleTmp);
        var relX = scaleTmp[0] < 0 ? -1 : 1;
        var relY = scaleTmp[1] < 0 ? -1 : 1;
        var sx = ((scaleTmp[0] - relX) * globalScaleRatio + relX) / scaleTmp[0] || 0;
        var sy = ((scaleTmp[1] - relY) * globalScaleRatio + relY) / scaleTmp[1] || 0;

        m[0] *= sx;
        m[1] *= sx;
        m[2] *= sy;
        m[3] *= sy;
    }

    this.invTransform = this.invTransform || create$1();
    invert(this.invTransform, m);
};

transformableProto.getLocalTransform = function (m) {
    return Transformable.getLocalTransform(this, m);
};

/**
 * 将自己的transform应用到context上
 * @param {CanvasRenderingContext2D} ctx
 */
transformableProto.setTransform = function (ctx) {
    var m = this.transform;
    var dpr = ctx.dpr || 1;
    if (m) {
        ctx.setTransform(dpr * m[0], dpr * m[1], dpr * m[2], dpr * m[3], dpr * m[4], dpr * m[5]);
    }
    else {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
};

transformableProto.restoreTransform = function (ctx) {
    var dpr = ctx.dpr || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};

var tmpTransform = [];
var originTransform = create$1();

transformableProto.setLocalTransform = function (m) {
    if (!m) {
        // TODO return or set identity?
        return;
    }
    var sx = m[0] * m[0] + m[1] * m[1];
    var sy = m[2] * m[2] + m[3] * m[3];
    var position = this.position;
    var scale$$1 = this.scale;
    if (isNotAroundZero(sx - 1)) {
        sx = Math.sqrt(sx);
    }
    if (isNotAroundZero(sy - 1)) {
        sy = Math.sqrt(sy);
    }
    if (m[0] < 0) {
        sx = -sx;
    }
    if (m[3] < 0) {
        sy = -sy;
    }

    position[0] = m[4];
    position[1] = m[5];
    scale$$1[0] = sx;
    scale$$1[1] = sy;
    this.rotation = Math.atan2(-m[1] / sy, m[0] / sx);
};
/**
 * 分解`transform`矩阵到`position`, `rotation`, `scale`
 */
transformableProto.decomposeTransform = function () {
    if (!this.transform) {
        return;
    }
    var parent = this.parent;
    var m = this.transform;
    if (parent && parent.transform) {
        // Get local transform and decompose them to position, scale, rotation
        mul$1(tmpTransform, parent.invTransform, m);
        m = tmpTransform;
    }
    var origin = this.origin;
    if (origin && (origin[0] || origin[1])) {
        originTransform[4] = origin[0];
        originTransform[5] = origin[1];
        mul$1(tmpTransform, m, originTransform);
        tmpTransform[4] -= origin[0];
        tmpTransform[5] -= origin[1];
        m = tmpTransform;
    }

    this.setLocalTransform(m);
};

/**
 * Get global scale
 * @return {Array.<number>}
 */
transformableProto.getGlobalScale = function (out) {
    var m = this.transform;
    out = out || [];
    if (!m) {
        out[0] = 1;
        out[1] = 1;
        return out;
    }
    out[0] = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
    out[1] = Math.sqrt(m[2] * m[2] + m[3] * m[3]);
    if (m[0] < 0) {
        out[0] = -out[0];
    }
    if (m[3] < 0) {
        out[1] = -out[1];
    }
    return out;
};
/**
 * 变换坐标位置到 shape 的局部坐标空间
 * @method
 * @param {number} x
 * @param {number} y
 * @return {Array.<number>}
 */
transformableProto.transformCoordToLocal = function (x, y) {
    var v2 = [x, y];
    var invTransform = this.invTransform;
    if (invTransform) {
        applyTransform(v2, v2, invTransform);
    }
    return v2;
};

/**
 * 变换局部坐标位置到全局坐标空间
 * @method
 * @param {number} x
 * @param {number} y
 * @return {Array.<number>}
 */
transformableProto.transformCoordToGlobal = function (x, y) {
    var v2 = [x, y];
    var transform = this.transform;
    if (transform) {
        applyTransform(v2, v2, transform);
    }
    return v2;
};

/**
 * @static
 * @param {Object} target
 * @param {Array.<number>} target.origin
 * @param {number} target.rotation
 * @param {Array.<number>} target.position
 * @param {Array.<number>} [m]
 */
Transformable.getLocalTransform = function (target, m) {
    m = m || [];
    mIdentity(m);

    var origin = target.origin;
    var scale$$1 = target.scale || [1, 1];
    var rotation = target.rotation || 0;
    var position = target.position || [0, 0];

    if (origin) {
        // Translate to origin
        m[4] -= origin[0];
        m[5] -= origin[1];
    }
    scale$1(m, m, scale$$1);
    if (rotation) {
        rotate(m, m, rotation);
    }
    if (origin) {
        // Translate back from origin
        m[4] += origin[0];
        m[5] += origin[1];
    }

    m[4] += position[0];
    m[5] += position[1];

    return m;
};

/**
 * 缓动代码来自 https://github.com/sole/tween.js/blob/master/src/Tween.js
 * @see http://sole.github.io/tween.js/examples/03_graphs.html
 * @exports zrender/animation/easing
 */
var easing = {
    /**
    * @param {number} k
    * @return {number}
    */
    linear: function (k) {
        return k;
    },

    /**
    * @param {number} k
    * @return {number}
    */
    quadraticIn: function (k) {
        return k * k;
    },
    /**
    * @param {number} k
    * @return {number}
    */
    quadraticOut: function (k) {
        return k * (2 - k);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    quadraticInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k;
        }
        return -0.5 * (--k * (k - 2) - 1);
    },

    // 三次方的缓动（t^3）
    /**
    * @param {number} k
    * @return {number}
    */
    cubicIn: function (k) {
        return k * k * k;
    },
    /**
    * @param {number} k
    * @return {number}
    */
    cubicOut: function (k) {
        return --k * k * k + 1;
    },
    /**
    * @param {number} k
    * @return {number}
    */
    cubicInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k + 2);
    },

    // 四次方的缓动（t^4）
    /**
    * @param {number} k
    * @return {number}
    */
    quarticIn: function (k) {
        return k * k * k * k;
    },
    /**
    * @param {number} k
    * @return {number}
    */
    quarticOut: function (k) {
        return 1 - (--k * k * k * k);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    quarticInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k;
        }
        return -0.5 * ((k -= 2) * k * k * k - 2);
    },

    // 五次方的缓动（t^5）
    /**
    * @param {number} k
    * @return {number}
    */
    quinticIn: function (k) {
        return k * k * k * k * k;
    },
    /**
    * @param {number} k
    * @return {number}
    */
    quinticOut: function (k) {
        return --k * k * k * k * k + 1;
    },
    /**
    * @param {number} k
    * @return {number}
    */
    quinticInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k * k * k + 2);
    },

    // 正弦曲线的缓动（sin(t)）
    /**
    * @param {number} k
    * @return {number}
    */
    sinusoidalIn: function (k) {
        return 1 - Math.cos(k * Math.PI / 2);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    sinusoidalOut: function (k) {
        return Math.sin(k * Math.PI / 2);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    sinusoidalInOut: function (k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
    },

    // 指数曲线的缓动（2^t）
    /**
    * @param {number} k
    * @return {number}
    */
    exponentialIn: function (k) {
        return k === 0 ? 0 : Math.pow(1024, k - 1);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    exponentialOut: function (k) {
        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    exponentialInOut: function (k) {
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if ((k *= 2) < 1) {
            return 0.5 * Math.pow(1024, k - 1);
        }
        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    },

    // 圆形曲线的缓动（sqrt(1-t^2)）
    /**
    * @param {number} k
    * @return {number}
    */
    circularIn: function (k) {
        return 1 - Math.sqrt(1 - k * k);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    circularOut: function (k) {
        return Math.sqrt(1 - (--k * k));
    },
    /**
    * @param {number} k
    * @return {number}
    */
    circularInOut: function (k) {
        if ((k *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - k * k) - 1);
        }
        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    },

    // 创建类似于弹簧在停止前来回振荡的动画
    /**
    * @param {number} k
    * @return {number}
    */
    elasticIn: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return -(a * Math.pow(2, 10 * (k -= 1))
                    * Math.sin((k - s) * (2 * Math.PI) / p));
    },
    /**
    * @param {number} k
    * @return {number}
    */
    elasticOut: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return (a * Math.pow(2, -10 * k)
                    * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    elasticInOut: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        if ((k *= 2) < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (k -= 1))
                * Math.sin((k - s) * (2 * Math.PI) / p));
        }
        return a * Math.pow(2, -10 * (k -= 1))
                * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

    },

    // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
    /**
    * @param {number} k
    * @return {number}
    */
    backIn: function (k) {
        var s = 1.70158;
        return k * k * ((s + 1) * k - s);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    backOut: function (k) {
        var s = 1.70158;
        return --k * k * ((s + 1) * k + s) + 1;
    },
    /**
    * @param {number} k
    * @return {number}
    */
    backInOut: function (k) {
        var s = 1.70158 * 1.525;
        if ((k *= 2) < 1) {
            return 0.5 * (k * k * ((s + 1) * k - s));
        }
        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    },

    // 创建弹跳效果
    /**
    * @param {number} k
    * @return {number}
    */
    bounceIn: function (k) {
        return 1 - easing.bounceOut(1 - k);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    bounceOut: function (k) {
        if (k < (1 / 2.75)) {
            return 7.5625 * k * k;
        }
        else if (k < (2 / 2.75)) {
            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
        }
        else if (k < (2.5 / 2.75)) {
            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
        }
        else {
            return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
        }
    },
    /**
    * @param {number} k
    * @return {number}
    */
    bounceInOut: function (k) {
        if (k < 0.5) {
            return easing.bounceIn(k * 2) * 0.5;
        }
        return easing.bounceOut(k * 2 - 1) * 0.5 + 0.5;
    }
};

/**
 * 动画主控制器
 * @config target 动画对象，可以是数组，如果是数组的话会批量分发onframe等事件
 * @config life(1000) 动画时长
 * @config delay(0) 动画延迟时间
 * @config loop(true)
 * @config gap(0) 循环的间隔时间
 * @config onframe
 * @config easing(optional)
 * @config ondestroy(optional)
 * @config onrestart(optional)
 *
 * TODO pause
 */

function Clip(options) {

    this._target = options.target;

    // 生命周期
    this._life = options.life || 1000;
    // 延时
    this._delay = options.delay || 0;
    // 开始时间
    // this._startTime = new Date().getTime() + this._delay;// 单位毫秒
    this._initialized = false;

    // 是否循环
    this.loop = options.loop == null ? false : options.loop;

    this.gap = options.gap || 0;

    this.easing = options.easing || 'Linear';

    this.onframe = options.onframe;
    this.ondestroy = options.ondestroy;
    this.onrestart = options.onrestart;

    this._pausedTime = 0;
    this._paused = false;
}

Clip.prototype = {

    constructor: Clip,

    step: function (globalTime, deltaTime) {
        // Set startTime on first step, or _startTime may has milleseconds different between clips
        // PENDING
        if (!this._initialized) {
            this._startTime = globalTime + this._delay;
            this._initialized = true;
        }

        if (this._paused) {
            this._pausedTime += deltaTime;
            return;
        }

        var percent = (globalTime - this._startTime - this._pausedTime) / this._life;

        // 还没开始
        if (percent < 0) {
            return;
        }

        percent = Math.min(percent, 1);

        var easing$$1 = this.easing;
        var easingFunc = typeof easing$$1 === 'string' ? easing[easing$$1] : easing$$1;
        var schedule = typeof easingFunc === 'function'
            ? easingFunc(percent)
            : percent;

        this.fire('frame', schedule);

        // 结束
        if (percent === 1) {
            if (this.loop) {
                this.restart(globalTime);
                // 重新开始周期
                // 抛出而不是直接调用事件直到 stage.update 后再统一调用这些事件
                return 'restart';
            }

            // 动画完成将这个控制器标识为待删除
            // 在Animation.update中进行批量删除
            this._needsRemove = true;
            return 'destroy';
        }

        return null;
    },

    restart: function (globalTime) {
        var remainder = (globalTime - this._startTime - this._pausedTime) % this._life;
        this._startTime = globalTime - remainder + this.gap;
        this._pausedTime = 0;

        this._needsRemove = false;
    },

    fire: function (eventType, arg) {
        eventType = 'on' + eventType;
        if (this[eventType]) {
            this[eventType](this._target, arg);
        }
    },

    pause: function () {
        this._paused = true;
    },

    resume: function () {
        this._paused = false;
    }
};

// Simple LRU cache use doubly linked list
// @module zrender/core/LRU

/**
 * Simple double linked list. Compared with array, it has O(1) remove operation.
 * @constructor
 */
var LinkedList = function () {

    /**
     * @type {module:zrender/core/LRU~Entry}
     */
    this.head = null;

    /**
     * @type {module:zrender/core/LRU~Entry}
     */
    this.tail = null;

    this._len = 0;
};

var linkedListProto = LinkedList.prototype;
/**
 * Insert a new value at the tail
 * @param  {} val
 * @return {module:zrender/core/LRU~Entry}
 */
linkedListProto.insert = function (val) {
    var entry = new Entry(val);
    this.insertEntry(entry);
    return entry;
};

/**
 * Insert an entry at the tail
 * @param  {module:zrender/core/LRU~Entry} entry
 */
linkedListProto.insertEntry = function (entry) {
    if (!this.head) {
        this.head = this.tail = entry;
    }
    else {
        this.tail.next = entry;
        entry.prev = this.tail;
        entry.next = null;
        this.tail = entry;
    }
    this._len++;
};

/**
 * Remove entry.
 * @param  {module:zrender/core/LRU~Entry} entry
 */
linkedListProto.remove = function (entry) {
    var prev = entry.prev;
    var next = entry.next;
    if (prev) {
        prev.next = next;
    }
    else {
        // Is head
        this.head = next;
    }
    if (next) {
        next.prev = prev;
    }
    else {
        // Is tail
        this.tail = prev;
    }
    entry.next = entry.prev = null;
    this._len--;
};

/**
 * @return {number}
 */
linkedListProto.len = function () {
    return this._len;
};

/**
 * Clear list
 */
linkedListProto.clear = function () {
    this.head = this.tail = null;
    this._len = 0;
};

/**
 * @constructor
 * @param {} val
 */
var Entry = function (val) {
    /**
     * @type {}
     */
    this.value = val;

    /**
     * @type {module:zrender/core/LRU~Entry}
     */
    this.next;

    /**
     * @type {module:zrender/core/LRU~Entry}
     */
    this.prev;
};

/**
 * LRU Cache
 * @constructor
 * @alias module:zrender/core/LRU
 */
var LRU = function (maxSize) {

    this._list = new LinkedList();

    this._map = {};

    this._maxSize = maxSize || 10;

    this._lastRemovedEntry = null;
};

var LRUProto = LRU.prototype;

/**
 * @param  {string} key
 * @param  {} value
 * @return {} Removed value
 */
LRUProto.put = function (key, value) {
    var list = this._list;
    var map = this._map;
    var removed = null;
    if (map[key] == null) {
        var len = list.len();
        // Reuse last removed entry
        var entry = this._lastRemovedEntry;

        if (len >= this._maxSize && len > 0) {
            // Remove the least recently used
            var leastUsedEntry = list.head;
            list.remove(leastUsedEntry);
            delete map[leastUsedEntry.key];

            removed = leastUsedEntry.value;
            this._lastRemovedEntry = leastUsedEntry;
        }

        if (entry) {
            entry.value = value;
        }
        else {
            entry = new Entry(value);
        }
        entry.key = key;
        list.insertEntry(entry);
        map[key] = entry;
    }

    return removed;
};

/**
 * @param  {string} key
 * @return {}
 */
LRUProto.get = function (key) {
    var entry = this._map[key];
    var list = this._list;
    if (entry != null) {
        // Put the latest used entry in the tail
        if (entry !== list.tail) {
            list.remove(entry);
            list.insertEntry(entry);
        }

        return entry.value;
    }
};

/**
 * Clear the cache
 */
LRUProto.clear = function () {
    this._list.clear();
    this._map = {};
};

var kCSSColorTable = {
    'transparent': [0, 0, 0, 0], 'aliceblue': [240, 248, 255, 1],
    'antiquewhite': [250, 235, 215, 1], 'aqua': [0, 255, 255, 1],
    'aquamarine': [127, 255, 212, 1], 'azure': [240, 255, 255, 1],
    'beige': [245, 245, 220, 1], 'bisque': [255, 228, 196, 1],
    'black': [0, 0, 0, 1], 'blanchedalmond': [255, 235, 205, 1],
    'blue': [0, 0, 255, 1], 'blueviolet': [138, 43, 226, 1],
    'brown': [165, 42, 42, 1], 'burlywood': [222, 184, 135, 1],
    'cadetblue': [95, 158, 160, 1], 'chartreuse': [127, 255, 0, 1],
    'chocolate': [210, 105, 30, 1], 'coral': [255, 127, 80, 1],
    'cornflowerblue': [100, 149, 237, 1], 'cornsilk': [255, 248, 220, 1],
    'crimson': [220, 20, 60, 1], 'cyan': [0, 255, 255, 1],
    'darkblue': [0, 0, 139, 1], 'darkcyan': [0, 139, 139, 1],
    'darkgoldenrod': [184, 134, 11, 1], 'darkgray': [169, 169, 169, 1],
    'darkgreen': [0, 100, 0, 1], 'darkgrey': [169, 169, 169, 1],
    'darkkhaki': [189, 183, 107, 1], 'darkmagenta': [139, 0, 139, 1],
    'darkolivegreen': [85, 107, 47, 1], 'darkorange': [255, 140, 0, 1],
    'darkorchid': [153, 50, 204, 1], 'darkred': [139, 0, 0, 1],
    'darksalmon': [233, 150, 122, 1], 'darkseagreen': [143, 188, 143, 1],
    'darkslateblue': [72, 61, 139, 1], 'darkslategray': [47, 79, 79, 1],
    'darkslategrey': [47, 79, 79, 1], 'darkturquoise': [0, 206, 209, 1],
    'darkviolet': [148, 0, 211, 1], 'deeppink': [255, 20, 147, 1],
    'deepskyblue': [0, 191, 255, 1], 'dimgray': [105, 105, 105, 1],
    'dimgrey': [105, 105, 105, 1], 'dodgerblue': [30, 144, 255, 1],
    'firebrick': [178, 34, 34, 1], 'floralwhite': [255, 250, 240, 1],
    'forestgreen': [34, 139, 34, 1], 'fuchsia': [255, 0, 255, 1],
    'gainsboro': [220, 220, 220, 1], 'ghostwhite': [248, 248, 255, 1],
    'gold': [255, 215, 0, 1], 'goldenrod': [218, 165, 32, 1],
    'gray': [128, 128, 128, 1], 'green': [0, 128, 0, 1],
    'greenyellow': [173, 255, 47, 1], 'grey': [128, 128, 128, 1],
    'honeydew': [240, 255, 240, 1], 'hotpink': [255, 105, 180, 1],
    'indianred': [205, 92, 92, 1], 'indigo': [75, 0, 130, 1],
    'ivory': [255, 255, 240, 1], 'khaki': [240, 230, 140, 1],
    'lavender': [230, 230, 250, 1], 'lavenderblush': [255, 240, 245, 1],
    'lawngreen': [124, 252, 0, 1], 'lemonchiffon': [255, 250, 205, 1],
    'lightblue': [173, 216, 230, 1], 'lightcoral': [240, 128, 128, 1],
    'lightcyan': [224, 255, 255, 1], 'lightgoldenrodyellow': [250, 250, 210, 1],
    'lightgray': [211, 211, 211, 1], 'lightgreen': [144, 238, 144, 1],
    'lightgrey': [211, 211, 211, 1], 'lightpink': [255, 182, 193, 1],
    'lightsalmon': [255, 160, 122, 1], 'lightseagreen': [32, 178, 170, 1],
    'lightskyblue': [135, 206, 250, 1], 'lightslategray': [119, 136, 153, 1],
    'lightslategrey': [119, 136, 153, 1], 'lightsteelblue': [176, 196, 222, 1],
    'lightyellow': [255, 255, 224, 1], 'lime': [0, 255, 0, 1],
    'limegreen': [50, 205, 50, 1], 'linen': [250, 240, 230, 1],
    'magenta': [255, 0, 255, 1], 'maroon': [128, 0, 0, 1],
    'mediumaquamarine': [102, 205, 170, 1], 'mediumblue': [0, 0, 205, 1],
    'mediumorchid': [186, 85, 211, 1], 'mediumpurple': [147, 112, 219, 1],
    'mediumseagreen': [60, 179, 113, 1], 'mediumslateblue': [123, 104, 238, 1],
    'mediumspringgreen': [0, 250, 154, 1], 'mediumturquoise': [72, 209, 204, 1],
    'mediumvioletred': [199, 21, 133, 1], 'midnightblue': [25, 25, 112, 1],
    'mintcream': [245, 255, 250, 1], 'mistyrose': [255, 228, 225, 1],
    'moccasin': [255, 228, 181, 1], 'navajowhite': [255, 222, 173, 1],
    'navy': [0, 0, 128, 1], 'oldlace': [253, 245, 230, 1],
    'olive': [128, 128, 0, 1], 'olivedrab': [107, 142, 35, 1],
    'orange': [255, 165, 0, 1], 'orangered': [255, 69, 0, 1],
    'orchid': [218, 112, 214, 1], 'palegoldenrod': [238, 232, 170, 1],
    'palegreen': [152, 251, 152, 1], 'paleturquoise': [175, 238, 238, 1],
    'palevioletred': [219, 112, 147, 1], 'papayawhip': [255, 239, 213, 1],
    'peachpuff': [255, 218, 185, 1], 'peru': [205, 133, 63, 1],
    'pink': [255, 192, 203, 1], 'plum': [221, 160, 221, 1],
    'powderblue': [176, 224, 230, 1], 'purple': [128, 0, 128, 1],
    'red': [255, 0, 0, 1], 'rosybrown': [188, 143, 143, 1],
    'royalblue': [65, 105, 225, 1], 'saddlebrown': [139, 69, 19, 1],
    'salmon': [250, 128, 114, 1], 'sandybrown': [244, 164, 96, 1],
    'seagreen': [46, 139, 87, 1], 'seashell': [255, 245, 238, 1],
    'sienna': [160, 82, 45, 1], 'silver': [192, 192, 192, 1],
    'skyblue': [135, 206, 235, 1], 'slateblue': [106, 90, 205, 1],
    'slategray': [112, 128, 144, 1], 'slategrey': [112, 128, 144, 1],
    'snow': [255, 250, 250, 1], 'springgreen': [0, 255, 127, 1],
    'steelblue': [70, 130, 180, 1], 'tan': [210, 180, 140, 1],
    'teal': [0, 128, 128, 1], 'thistle': [216, 191, 216, 1],
    'tomato': [255, 99, 71, 1], 'turquoise': [64, 224, 208, 1],
    'violet': [238, 130, 238, 1], 'wheat': [245, 222, 179, 1],
    'white': [255, 255, 255, 1], 'whitesmoke': [245, 245, 245, 1],
    'yellow': [255, 255, 0, 1], 'yellowgreen': [154, 205, 50, 1]
};

function clampCssByte(i) {  // Clamp to integer 0 .. 255.
    i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
    return i < 0 ? 0 : i > 255 ? 255 : i;
}

function clampCssAngle(i) {  // Clamp to integer 0 .. 360.
    i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
    return i < 0 ? 0 : i > 360 ? 360 : i;
}

function clampCssFloat(f) {  // Clamp to float 0.0 .. 1.0.
    return f < 0 ? 0 : f > 1 ? 1 : f;
}

function parseCssInt(str) {  // int or percentage.
    if (str.length && str.charAt(str.length - 1) === '%') {
        return clampCssByte(parseFloat(str) / 100 * 255);
    }
    return clampCssByte(parseInt(str, 10));
}

function parseCssFloat(str) {  // float or percentage.
    if (str.length && str.charAt(str.length - 1) === '%') {
        return clampCssFloat(parseFloat(str) / 100);
    }
    return clampCssFloat(parseFloat(str));
}

function cssHueToRgb(m1, m2, h) {
    if (h < 0) {
        h += 1;
    }
    else if (h > 1) {
        h -= 1;
    }

    if (h * 6 < 1) {
        return m1 + (m2 - m1) * h * 6;
    }
    if (h * 2 < 1) {
        return m2;
    }
    if (h * 3 < 2) {
        return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    }
    return m1;
}

function lerpNumber(a, b, p) {
    return a + (b - a) * p;
}

function setRgba(out, r, g, b, a) {
    out[0] = r;
    out[1] = g;
    out[2] = b;
    out[3] = a;
    return out;
}
function copyRgba(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
}

var colorCache = new LRU(20);
var lastRemovedArr = null;

function putToCache(colorStr, rgbaArr) {
    // Reuse removed array
    if (lastRemovedArr) {
        copyRgba(lastRemovedArr, rgbaArr);
    }
    lastRemovedArr = colorCache.put(colorStr, lastRemovedArr || (rgbaArr.slice()));
}

/**
 * @param {string} colorStr
 * @param {Array.<number>} out
 * @return {Array.<number>}
 * @memberOf module:zrender/util/color
 */
function parse(colorStr, rgbaArr) {
    if (!colorStr) {
        return;
    }
    rgbaArr = rgbaArr || [];

    var cached = colorCache.get(colorStr);
    if (cached) {
        return copyRgba(rgbaArr, cached);
    }

    // colorStr may be not string
    colorStr = colorStr + '';
    // Remove all whitespace, not compliant, but should just be more accepting.
    var str = colorStr.replace(/ /g, '').toLowerCase();

    // Color keywords (and transparent) lookup.
    if (str in kCSSColorTable) {
        copyRgba(rgbaArr, kCSSColorTable[str]);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;
    }

    // #abc and #abc123 syntax.
    if (str.charAt(0) === '#') {
        if (str.length === 4) {
            var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
            if (!(iv >= 0 && iv <= 0xfff)) {
                setRgba(rgbaArr, 0, 0, 0, 1);
                return;  // Covers NaN.
            }
            setRgba(rgbaArr,
                ((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8),
                (iv & 0xf0) | ((iv & 0xf0) >> 4),
                (iv & 0xf) | ((iv & 0xf) << 4),
                1
            );
            putToCache(colorStr, rgbaArr);
            return rgbaArr;
        }
        else if (str.length === 7) {
            var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
            if (!(iv >= 0 && iv <= 0xffffff)) {
                setRgba(rgbaArr, 0, 0, 0, 1);
                return;  // Covers NaN.
            }
            setRgba(rgbaArr,
                (iv & 0xff0000) >> 16,
                (iv & 0xff00) >> 8,
                iv & 0xff,
                1
            );
            putToCache(colorStr, rgbaArr);
            return rgbaArr;
        }

        return;
    }
    var op = str.indexOf('(');
    var ep = str.indexOf(')');
    if (op !== -1 && ep + 1 === str.length) {
        var fname = str.substr(0, op);
        var params = str.substr(op + 1, ep - (op + 1)).split(',');
        var alpha = 1;  // To allow case fallthrough.
        switch (fname) {
            case 'rgba':
                if (params.length !== 4) {
                    setRgba(rgbaArr, 0, 0, 0, 1);
                    return;
                }
                alpha = parseCssFloat(params.pop()); // jshint ignore:line
            // Fall through.
            case 'rgb':
                if (params.length !== 3) {
                    setRgba(rgbaArr, 0, 0, 0, 1);
                    return;
                }
                setRgba(rgbaArr,
                    parseCssInt(params[0]),
                    parseCssInt(params[1]),
                    parseCssInt(params[2]),
                    alpha
                );
                putToCache(colorStr, rgbaArr);
                return rgbaArr;
            case 'hsla':
                if (params.length !== 4) {
                    setRgba(rgbaArr, 0, 0, 0, 1);
                    return;
                }
                params[3] = parseCssFloat(params[3]);
                hsla2rgba(params, rgbaArr);
                putToCache(colorStr, rgbaArr);
                return rgbaArr;
            case 'hsl':
                if (params.length !== 3) {
                    setRgba(rgbaArr, 0, 0, 0, 1);
                    return;
                }
                hsla2rgba(params, rgbaArr);
                putToCache(colorStr, rgbaArr);
                return rgbaArr;
            default:
                return;
        }
    }

    setRgba(rgbaArr, 0, 0, 0, 1);
    return;
}

/**
 * @param {Array.<number>} hsla
 * @param {Array.<number>} rgba
 * @return {Array.<number>} rgba
 */
function hsla2rgba(hsla, rgba) {
    var h = (((parseFloat(hsla[0]) % 360) + 360) % 360) / 360;  // 0 .. 1
    // NOTE(deanm): According to the CSS spec s/l should only be
    // percentages, but we don't bother and let float or percentage.
    var s = parseCssFloat(hsla[1]);
    var l = parseCssFloat(hsla[2]);
    var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
    var m1 = l * 2 - m2;

    rgba = rgba || [];
    setRgba(rgba,
        clampCssByte(cssHueToRgb(m1, m2, h + 1 / 3) * 255),
        clampCssByte(cssHueToRgb(m1, m2, h) * 255),
        clampCssByte(cssHueToRgb(m1, m2, h - 1 / 3) * 255),
        1
    );

    if (hsla.length === 4) {
        rgba[3] = hsla[3];
    }

    return rgba;
}

/**
 * @param {Array.<number>} rgba
 * @return {Array.<number>} hsla
 */
function rgba2hsla(rgba) {
    if (!rgba) {
        return;
    }

    // RGB from 0 to 255
    var R = rgba[0] / 255;
    var G = rgba[1] / 255;
    var B = rgba[2] / 255;

    var vMin = Math.min(R, G, B); // Min. value of RGB
    var vMax = Math.max(R, G, B); // Max. value of RGB
    var delta = vMax - vMin; // Delta RGB value

    var L = (vMax + vMin) / 2;
    var H;
    var S;
    // HSL results from 0 to 1
    if (delta === 0) {
        H = 0;
        S = 0;
    }
    else {
        if (L < 0.5) {
            S = delta / (vMax + vMin);
        }
        else {
            S = delta / (2 - vMax - vMin);
        }

        var deltaR = (((vMax - R) / 6) + (delta / 2)) / delta;
        var deltaG = (((vMax - G) / 6) + (delta / 2)) / delta;
        var deltaB = (((vMax - B) / 6) + (delta / 2)) / delta;

        if (R === vMax) {
            H = deltaB - deltaG;
        }
        else if (G === vMax) {
            H = (1 / 3) + deltaR - deltaB;
        }
        else if (B === vMax) {
            H = (2 / 3) + deltaG - deltaR;
        }

        if (H < 0) {
            H += 1;
        }

        if (H > 1) {
            H -= 1;
        }
    }

    var hsla = [H * 360, S, L];

    if (rgba[3] != null) {
        hsla.push(rgba[3]);
    }

    return hsla;
}

/**
 * @param {string} color
 * @param {number} level
 * @return {string}
 * @memberOf module:zrender/util/color
 */
function lift(color, level) {
    var colorArr = parse(color);
    if (colorArr) {
        for (var i = 0; i < 3; i++) {
            if (level < 0) {
                colorArr[i] = colorArr[i] * (1 - level) | 0;
            }
            else {
                colorArr[i] = ((255 - colorArr[i]) * level + colorArr[i]) | 0;
            }
            if (colorArr[i] > 255) {
                colorArr[i] = 255;
            }
            else if (color[i] < 0) {
                colorArr[i] = 0;
            }
        }
        return stringify(colorArr, colorArr.length === 4 ? 'rgba' : 'rgb');
    }
}

/**
 * @param {string} color
 * @return {string}
 * @memberOf module:zrender/util/color
 */
function toHex(color) {
    var colorArr = parse(color);
    if (colorArr) {
        return ((1 << 24) + (colorArr[0] << 16) + (colorArr[1] << 8) + (+colorArr[2])).toString(16).slice(1);
    }
}

/**
 * Map value to color. Faster than lerp methods because color is represented by rgba array.
 * @param {number} normalizedValue A float between 0 and 1.
 * @param {Array.<Array.<number>>} colors List of rgba color array
 * @param {Array.<number>} [out] Mapped gba color array
 * @return {Array.<number>} will be null/undefined if input illegal.
 */
function fastLerp(normalizedValue, colors, out) {
    if (!(colors && colors.length)
        || !(normalizedValue >= 0 && normalizedValue <= 1)
    ) {
        return;
    }

    out = out || [];

    var value = normalizedValue * (colors.length - 1);
    var leftIndex = Math.floor(value);
    var rightIndex = Math.ceil(value);
    var leftColor = colors[leftIndex];
    var rightColor = colors[rightIndex];
    var dv = value - leftIndex;
    out[0] = clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv));
    out[1] = clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv));
    out[2] = clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv));
    out[3] = clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv));

    return out;
}

/**
 * @deprecated
 */
var fastMapToColor = fastLerp;

/**
 * @param {number} normalizedValue A float between 0 and 1.
 * @param {Array.<string>} colors Color list.
 * @param {boolean=} fullOutput Default false.
 * @return {(string|Object)} Result color. If fullOutput,
 *                           return {color: ..., leftIndex: ..., rightIndex: ..., value: ...},
 * @memberOf module:zrender/util/color
 */
function lerp$1(normalizedValue, colors, fullOutput) {
    if (!(colors && colors.length)
        || !(normalizedValue >= 0 && normalizedValue <= 1)
    ) {
        return;
    }

    var value = normalizedValue * (colors.length - 1);
    var leftIndex = Math.floor(value);
    var rightIndex = Math.ceil(value);
    var leftColor = parse(colors[leftIndex]);
    var rightColor = parse(colors[rightIndex]);
    var dv = value - leftIndex;

    var color = stringify(
        [
            clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv)),
            clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv)),
            clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv)),
            clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv))
        ],
        'rgba'
    );

    return fullOutput
        ? {
            color: color,
            leftIndex: leftIndex,
            rightIndex: rightIndex,
            value: value
        }
        : color;
}

/**
 * @deprecated
 */
var mapToColor = lerp$1;

/**
 * @param {string} color
 * @param {number=} h 0 ~ 360, ignore when null.
 * @param {number=} s 0 ~ 1, ignore when null.
 * @param {number=} l 0 ~ 1, ignore when null.
 * @return {string} Color string in rgba format.
 * @memberOf module:zrender/util/color
 */
function modifyHSL(color, h, s, l) {
    color = parse(color);

    if (color) {
        color = rgba2hsla(color);
        h != null && (color[0] = clampCssAngle(h));
        s != null && (color[1] = parseCssFloat(s));
        l != null && (color[2] = parseCssFloat(l));

        return stringify(hsla2rgba(color), 'rgba');
    }
}

/**
 * @param {string} color
 * @param {number=} alpha 0 ~ 1
 * @return {string} Color string in rgba format.
 * @memberOf module:zrender/util/color
 */
function modifyAlpha(color, alpha) {
    color = parse(color);

    if (color && alpha != null) {
        color[3] = clampCssFloat(alpha);
        return stringify(color, 'rgba');
    }
}

/**
 * @param {Array.<number>} arrColor like [12,33,44,0.4]
 * @param {string} type 'rgba', 'hsva', ...
 * @return {string} Result color. (If input illegal, return undefined).
 */
function stringify(arrColor, type) {
    if (!arrColor || !arrColor.length) {
        return;
    }
    var colorStr = arrColor[0] + ',' + arrColor[1] + ',' + arrColor[2];
    if (type === 'rgba' || type === 'hsva' || type === 'hsla') {
        colorStr += ',' + arrColor[3];
    }
    return type + '(' + colorStr + ')';
}


var color = (Object.freeze || Object)({
	parse: parse,
	lift: lift,
	toHex: toHex,
	fastLerp: fastLerp,
	fastMapToColor: fastMapToColor,
	lerp: lerp$1,
	mapToColor: mapToColor,
	modifyHSL: modifyHSL,
	modifyAlpha: modifyAlpha,
	stringify: stringify
});

/**
 * @module echarts/animation/Animator
 */

var arraySlice = Array.prototype.slice;

function defaultGetter(target, key) {
    return target[key];
}

function defaultSetter(target, key, value) {
    target[key] = value;
}

/**
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} percent
 * @return {number}
 */
function interpolateNumber(p0, p1, percent) {
    return (p1 - p0) * percent + p0;
}

/**
 * @param  {string} p0
 * @param  {string} p1
 * @param  {number} percent
 * @return {string}
 */
function interpolateString(p0, p1, percent) {
    return percent > 0.5 ? p1 : p0;
}

/**
 * @param  {Array} p0
 * @param  {Array} p1
 * @param  {number} percent
 * @param  {Array} out
 * @param  {number} arrDim
 */
function interpolateArray(p0, p1, percent, out, arrDim) {
    var len = p0.length;
    if (arrDim === 1) {
        for (var i = 0; i < len; i++) {
            out[i] = interpolateNumber(p0[i], p1[i], percent);
        }
    }
    else {
        var len2 = len && p0[0].length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len2; j++) {
                out[i][j] = interpolateNumber(
                    p0[i][j], p1[i][j], percent
                );
            }
        }
    }
}

// arr0 is source array, arr1 is target array.
// Do some preprocess to avoid error happened when interpolating from arr0 to arr1
function fillArr(arr0, arr1, arrDim) {
    var arr0Len = arr0.length;
    var arr1Len = arr1.length;
    if (arr0Len !== arr1Len) {
        // FIXME Not work for TypedArray
        var isPreviousLarger = arr0Len > arr1Len;
        if (isPreviousLarger) {
            // Cut the previous
            arr0.length = arr1Len;
        }
        else {
            // Fill the previous
            for (var i = arr0Len; i < arr1Len; i++) {
                arr0.push(
                    arrDim === 1 ? arr1[i] : arraySlice.call(arr1[i])
                );
            }
        }
    }
    // Handling NaN value
    var len2 = arr0[0] && arr0[0].length;
    for (var i = 0; i < arr0.length; i++) {
        if (arrDim === 1) {
            if (isNaN(arr0[i])) {
                arr0[i] = arr1[i];
            }
        }
        else {
            for (var j = 0; j < len2; j++) {
                if (isNaN(arr0[i][j])) {
                    arr0[i][j] = arr1[i][j];
                }
            }
        }
    }
}

/**
 * @param  {Array} arr0
 * @param  {Array} arr1
 * @param  {number} arrDim
 * @return {boolean}
 */
function isArraySame(arr0, arr1, arrDim) {
    if (arr0 === arr1) {
        return true;
    }
    var len = arr0.length;
    if (len !== arr1.length) {
        return false;
    }
    if (arrDim === 1) {
        for (var i = 0; i < len; i++) {
            if (arr0[i] !== arr1[i]) {
                return false;
            }
        }
    }
    else {
        var len2 = arr0[0].length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len2; j++) {
                if (arr0[i][j] !== arr1[i][j]) {
                    return false;
                }
            }
        }
    }
    return true;
}

/**
 * Catmull Rom interpolate array
 * @param  {Array} p0
 * @param  {Array} p1
 * @param  {Array} p2
 * @param  {Array} p3
 * @param  {number} t
 * @param  {number} t2
 * @param  {number} t3
 * @param  {Array} out
 * @param  {number} arrDim
 */
function catmullRomInterpolateArray(
    p0, p1, p2, p3, t, t2, t3, out, arrDim
) {
    var len = p0.length;
    if (arrDim === 1) {
        for (var i = 0; i < len; i++) {
            out[i] = catmullRomInterpolate(
                p0[i], p1[i], p2[i], p3[i], t, t2, t3
            );
        }
    }
    else {
        var len2 = p0[0].length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len2; j++) {
                out[i][j] = catmullRomInterpolate(
                    p0[i][j], p1[i][j], p2[i][j], p3[i][j],
                    t, t2, t3
                );
            }
        }
    }
}

/**
 * Catmull Rom interpolate number
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {number} t
 * @param  {number} t2
 * @param  {number} t3
 * @return {number}
 */
function catmullRomInterpolate(p0, p1, p2, p3, t, t2, t3) {
    var v0 = (p2 - p0) * 0.5;
    var v1 = (p3 - p1) * 0.5;
    return (2 * (p1 - p2) + v0 + v1) * t3
            + (-3 * (p1 - p2) - 2 * v0 - v1) * t2
            + v0 * t + p1;
}

function cloneValue(value) {
    if (isArrayLike(value)) {
        var len = value.length;
        if (isArrayLike(value[0])) {
            var ret = [];
            for (var i = 0; i < len; i++) {
                ret.push(arraySlice.call(value[i]));
            }
            return ret;
        }

        return arraySlice.call(value);
    }

    return value;
}

function rgba2String(rgba) {
    rgba[0] = Math.floor(rgba[0]);
    rgba[1] = Math.floor(rgba[1]);
    rgba[2] = Math.floor(rgba[2]);

    return 'rgba(' + rgba.join(',') + ')';
}

function getArrayDim(keyframes) {
    var lastValue = keyframes[keyframes.length - 1].value;
    return isArrayLike(lastValue && lastValue[0]) ? 2 : 1;
}

function createTrackClip(animator, easing, oneTrackDone, keyframes, propName, forceAnimate) {
    var getter = animator._getter;
    var setter = animator._setter;
    var useSpline = easing === 'spline';

    var trackLen = keyframes.length;
    if (!trackLen) {
        return;
    }
    // Guess data type
    var firstVal = keyframes[0].value;
    var isValueArray = isArrayLike(firstVal);
    var isValueColor = false;
    var isValueString = false;

    // For vertices morphing
    var arrDim = isValueArray ? getArrayDim(keyframes) : 0;

    var trackMaxTime;
    // Sort keyframe as ascending
    keyframes.sort(function (a, b) {
        return a.time - b.time;
    });

    trackMaxTime = keyframes[trackLen - 1].time;
    // Percents of each keyframe
    var kfPercents = [];
    // Value of each keyframe
    var kfValues = [];
    var prevValue = keyframes[0].value;
    var isAllValueEqual = true;
    for (var i = 0; i < trackLen; i++) {
        kfPercents.push(keyframes[i].time / trackMaxTime);
        // Assume value is a color when it is a string
        var value = keyframes[i].value;

        // Check if value is equal, deep check if value is array
        if (!((isValueArray && isArraySame(value, prevValue, arrDim))
            || (!isValueArray && value === prevValue))) {
            isAllValueEqual = false;
        }
        prevValue = value;

        // Try converting a string to a color array
        if (typeof value === 'string') {
            var colorArray = parse(value);
            if (colorArray) {
                value = colorArray;
                isValueColor = true;
            }
            else {
                isValueString = true;
            }
        }
        kfValues.push(value);
    }
    if (!forceAnimate && isAllValueEqual) {
        return;
    }

    var lastValue = kfValues[trackLen - 1];
    // Polyfill array and NaN value
    for (var i = 0; i < trackLen - 1; i++) {
        if (isValueArray) {
            fillArr(kfValues[i], lastValue, arrDim);
        }
        else {
            if (isNaN(kfValues[i]) && !isNaN(lastValue) && !isValueString && !isValueColor) {
                kfValues[i] = lastValue;
            }
        }
    }
    isValueArray && fillArr(getter(animator._target, propName), lastValue, arrDim);

    // Cache the key of last frame to speed up when
    // animation playback is sequency
    var lastFrame = 0;
    var lastFramePercent = 0;
    var start;
    var w;
    var p0;
    var p1;
    var p2;
    var p3;

    if (isValueColor) {
        var rgba = [0, 0, 0, 0];
    }

    var onframe = function (target, percent) {
        // Find the range keyframes
        // kf1-----kf2---------current--------kf3
        // find kf2 and kf3 and do interpolation
        var frame;
        // In the easing function like elasticOut, percent may less than 0
        if (percent < 0) {
            frame = 0;
        }
        else if (percent < lastFramePercent) {
            // Start from next key
            // PENDING start from lastFrame ?
            start = Math.min(lastFrame + 1, trackLen - 1);
            for (frame = start; frame >= 0; frame--) {
                if (kfPercents[frame] <= percent) {
                    break;
                }
            }
            // PENDING really need to do this ?
            frame = Math.min(frame, trackLen - 2);
        }
        else {
            for (frame = lastFrame; frame < trackLen; frame++) {
                if (kfPercents[frame] > percent) {
                    break;
                }
            }
            frame = Math.min(frame - 1, trackLen - 2);
        }
        lastFrame = frame;
        lastFramePercent = percent;

        var range = (kfPercents[frame + 1] - kfPercents[frame]);
        if (range === 0) {
            return;
        }
        else {
            w = (percent - kfPercents[frame]) / range;
        }
        if (useSpline) {
            p1 = kfValues[frame];
            p0 = kfValues[frame === 0 ? frame : frame - 1];
            p2 = kfValues[frame > trackLen - 2 ? trackLen - 1 : frame + 1];
            p3 = kfValues[frame > trackLen - 3 ? trackLen - 1 : frame + 2];
            if (isValueArray) {
                catmullRomInterpolateArray(
                    p0, p1, p2, p3, w, w * w, w * w * w,
                    getter(target, propName),
                    arrDim
                );
            }
            else {
                var value;
                if (isValueColor) {
                    value = catmullRomInterpolateArray(
                        p0, p1, p2, p3, w, w * w, w * w * w,
                        rgba, 1
                    );
                    value = rgba2String(rgba);
                }
                else if (isValueString) {
                    // String is step(0.5)
                    return interpolateString(p1, p2, w);
                }
                else {
                    value = catmullRomInterpolate(
                        p0, p1, p2, p3, w, w * w, w * w * w
                    );
                }
                setter(
                    target,
                    propName,
                    value
                );
            }
        }
        else {
            if (isValueArray) {
                interpolateArray(
                    kfValues[frame], kfValues[frame + 1], w,
                    getter(target, propName),
                    arrDim
                );
            }
            else {
                var value;
                if (isValueColor) {
                    interpolateArray(
                        kfValues[frame], kfValues[frame + 1], w,
                        rgba, 1
                    );
                    value = rgba2String(rgba);
                }
                else if (isValueString) {
                    // String is step(0.5)
                    return interpolateString(kfValues[frame], kfValues[frame + 1], w);
                }
                else {
                    value = interpolateNumber(kfValues[frame], kfValues[frame + 1], w);
                }
                setter(
                    target,
                    propName,
                    value
                );
            }
        }
    };

    var clip = new Clip({
        target: animator._target,
        life: trackMaxTime,
        loop: animator._loop,
        delay: animator._delay,
        onframe: onframe,
        ondestroy: oneTrackDone
    });

    if (easing && easing !== 'spline') {
        clip.easing = easing;
    }

    return clip;
}

/**
 * @alias module:zrender/animation/Animator
 * @constructor
 * @param {Object} target
 * @param {boolean} loop
 * @param {Function} getter
 * @param {Function} setter
 */
var Animator = function (target, loop, getter, setter) {
    this._tracks = {};
    this._target = target;

    this._loop = loop || false;

    this._getter = getter || defaultGetter;
    this._setter = setter || defaultSetter;

    this._clipCount = 0;

    this._delay = 0;

    this._doneList = [];

    this._onframeList = [];

    this._clipList = [];
};

Animator.prototype = {
    /**
     * Set Animation keyframe
     * @param  {number} time 关键帧时间，单位是ms
     * @param  {Object} props 关键帧的属性值，key-value表示
     * @return {module:zrender/animation/Animator}
     */
    when: function (time /* ms */, props) {
        var tracks = this._tracks;
        for (var propName in props) {
            if (!props.hasOwnProperty(propName)) {
                continue;
            }

            if (!tracks[propName]) {
                tracks[propName] = [];
                // Invalid value
                var value = this._getter(this._target, propName);
                if (value == null) {
                    // zrLog('Invalid property ' + propName);
                    continue;
                }
                // If time is 0
                //  Then props is given initialize value
                // Else
                //  Initialize value from current prop value
                if (time !== 0) {
                    tracks[propName].push({
                        time: 0,
                        value: cloneValue(value)
                    });
                }
            }
            tracks[propName].push({
                time: time,
                value: props[propName]
            });
        }
        return this;
    },
    /**
     * 添加动画每一帧的回调函数
     * @param  {Function} callback
     * @return {module:zrender/animation/Animator}
     */
    during: function (callback) {
        this._onframeList.push(callback);
        return this;
    },

    pause: function () {
        for (var i = 0; i < this._clipList.length; i++) {
            this._clipList[i].pause();
        }
        this._paused = true;
    },

    resume: function () {
        for (var i = 0; i < this._clipList.length; i++) {
            this._clipList[i].resume();
        }
        this._paused = false;
    },

    isPaused: function () {
        return !!this._paused;
    },

    _doneCallback: function () {
        // Clear all tracks
        this._tracks = {};
        // Clear all clips
        this._clipList.length = 0;

        var doneList = this._doneList;
        var len = doneList.length;
        for (var i = 0; i < len; i++) {
            doneList[i].call(this);
        }
    },
    /**
     * Start the animation
     * @param  {string|Function} [easing]
     *         动画缓动函数，详见{@link module:zrender/animation/easing}
     * @param  {boolean} forceAnimate
     * @return {module:zrender/animation/Animator}
     */
    start: function (easing, forceAnimate) {

        var self = this;
        var clipCount = 0;

        var oneTrackDone = function () {
            clipCount--;
            if (!clipCount) {
                self._doneCallback();
            }
        };

        var lastClip;
        for (var propName in this._tracks) {
            if (!this._tracks.hasOwnProperty(propName)) {
                continue;
            }
            var clip = createTrackClip(
                this, easing, oneTrackDone,
                this._tracks[propName], propName, forceAnimate
            );
            if (clip) {
                this._clipList.push(clip);
                clipCount++;

                // If start after added to animation
                if (this.animation) {
                    this.animation.addClip(clip);
                }

                lastClip = clip;
            }
        }

        // Add during callback on the last clip
        if (lastClip) {
            var oldOnFrame = lastClip.onframe;
            lastClip.onframe = function (target, percent) {
                oldOnFrame(target, percent);

                for (var i = 0; i < self._onframeList.length; i++) {
                    self._onframeList[i](target, percent);
                }
            };
        }

        // This optimization will help the case that in the upper application
        // the view may be refreshed frequently, where animation will be
        // called repeatly but nothing changed.
        if (!clipCount) {
            this._doneCallback();
        }
        return this;
    },
    /**
     * Stop animation
     * @param {boolean} forwardToLast If move to last frame before stop
     */
    stop: function (forwardToLast) {
        var clipList = this._clipList;
        var animation = this.animation;
        for (var i = 0; i < clipList.length; i++) {
            var clip = clipList[i];
            if (forwardToLast) {
                // Move to last frame before stop
                clip.onframe(this._target, 1);
            }
            animation && animation.removeClip(clip);
        }
        clipList.length = 0;
    },
    /**
     * Set when animation delay starts
     * @param  {number} time 单位ms
     * @return {module:zrender/animation/Animator}
     */
    delay: function (time) {
        this._delay = time;
        return this;
    },
    /**
     * Add callback for animation end
     * @param  {Function} cb
     * @return {module:zrender/animation/Animator}
     */
    done: function (cb) {
        if (cb) {
            this._doneList.push(cb);
        }
        return this;
    },

    /**
     * @return {Array.<module:zrender/animation/Clip>}
     */
    getClips: function () {
        return this._clipList;
    }
};

var dpr = 1;

// If in browser environment
if (typeof window !== 'undefined') {
    dpr = Math.max(window.devicePixelRatio || 1, 1);
}

/**
 * config默认配置项
 * @exports zrender/config
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 */

/**
 * Debug log mode:
 * 0: Do nothing, for release.
 * 1: console.error, for debug.
 */
var debugMode = 0;

// retina 屏幕优化
var devicePixelRatio = dpr;

var logError = function () {
};

if (debugMode === 1) {
    logError = console.error;
}

var logError$1 = logError;

/**
 * @alias module:zrender/mixin/Animatable
 * @constructor
 */
var Animatable = function () {

    /**
     * @type {Array.<module:zrender/animation/Animator>}
     * @readOnly
     */
    this.animators = [];
};

Animatable.prototype = {

    constructor: Animatable,

    /**
     * 动画
     *
     * @param {string} path The path to fetch value from object, like 'a.b.c'.
     * @param {boolean} [loop] Whether to loop animation.
     * @return {module:zrender/animation/Animator}
     * @example:
     *     el.animate('style', false)
     *         .when(1000, {x: 10} )
     *         .done(function(){ // Animation done })
     *         .start()
     */
    animate: function (path, loop) {
        var target;
        var animatingShape = false;
        var el = this;
        var zr = this.__zr;
        if (path) {
            var pathSplitted = path.split('.');
            var prop = el;
            // If animating shape
            animatingShape = pathSplitted[0] === 'shape';
            for (var i = 0, l = pathSplitted.length; i < l; i++) {
                if (!prop) {
                    continue;
                }
                prop = prop[pathSplitted[i]];
            }
            if (prop) {
                target = prop;
            }
        }
        else {
            target = el;
        }

        if (!target) {
            logError$1(
                'Property "'
                + path
                + '" is not existed in element '
                + el.id
            );
            return;
        }

        var animators = el.animators;

        var animator = new Animator(target, loop);

        animator.during(function (target) {
            el.dirty(animatingShape);
        })
        .done(function () {
            // FIXME Animator will not be removed if use `Animator#stop` to stop animation
            animators.splice(indexOf(animators, animator), 1);
        });

        animators.push(animator);

        // If animate after added to the zrender
        if (zr) {
            zr.animation.addAnimator(animator);
        }

        return animator;
    },

    /**
     * 停止动画
     * @param {boolean} forwardToLast If move to last frame before stop
     */
    stopAnimation: function (forwardToLast) {
        var animators = this.animators;
        var len = animators.length;
        for (var i = 0; i < len; i++) {
            animators[i].stop(forwardToLast);
        }
        animators.length = 0;

        return this;
    },

    /**
     * Caution: this method will stop previous animation.
     * So do not use this method to one element twice before
     * animation starts, unless you know what you are doing.
     * @param {Object} target
     * @param {number} [time=500] Time in ms
     * @param {string} [easing='linear']
     * @param {number} [delay=0]
     * @param {Function} [callback]
     * @param {Function} [forceAnimate] Prevent stop animation and callback
     *        immediently when target values are the same as current values.
     *
     * @example
     *  // Animate position
     *  el.animateTo({
     *      position: [10, 10]
     *  }, function () { // done })
     *
     *  // Animate shape, style and position in 100ms, delayed 100ms, with cubicOut easing
     *  el.animateTo({
     *      shape: {
     *          width: 500
     *      },
     *      style: {
     *          fill: 'red'
     *      }
     *      position: [10, 10]
     *  }, 100, 100, 'cubicOut', function () { // done })
     */
    // TODO Return animation key
    animateTo: function (target, time, delay, easing, callback, forceAnimate) {
        animateTo(this, target, time, delay, easing, callback, forceAnimate);
    },

    /**
     * Animate from the target state to current state.
     * The params and the return value are the same as `this.animateTo`.
     */
    animateFrom: function (target, time, delay, easing, callback, forceAnimate) {
        animateTo(this, target, time, delay, easing, callback, forceAnimate, true);
    }
};

function animateTo(animatable, target, time, delay, easing, callback, forceAnimate, reverse) {
    // animateTo(target, time, easing, callback);
    if (isString(delay)) {
        callback = easing;
        easing = delay;
        delay = 0;
    }
    // animateTo(target, time, delay, callback);
    else if (isFunction$1(easing)) {
        callback = easing;
        easing = 'linear';
        delay = 0;
    }
    // animateTo(target, time, callback);
    else if (isFunction$1(delay)) {
        callback = delay;
        delay = 0;
    }
    // animateTo(target, callback)
    else if (isFunction$1(time)) {
        callback = time;
        time = 500;
    }
    // animateTo(target)
    else if (!time) {
        time = 500;
    }
    // Stop all previous animations
    animatable.stopAnimation();
    animateToShallow(animatable, '', animatable, target, time, delay, reverse);

    // Animators may be removed immediately after start
    // if there is nothing to animate
    var animators = animatable.animators.slice();
    var count = animators.length;
    function done() {
        count--;
        if (!count) {
            callback && callback();
        }
    }

    // No animators. This should be checked before animators[i].start(),
    // because 'done' may be executed immediately if no need to animate.
    if (!count) {
        callback && callback();
    }
    // Start after all animators created
    // Incase any animator is done immediately when all animation properties are not changed
    for (var i = 0; i < animators.length; i++) {
        animators[i]
            .done(done)
            .start(easing, forceAnimate);
    }
}

/**
 * @param {string} path=''
 * @param {Object} source=animatable
 * @param {Object} target
 * @param {number} [time=500]
 * @param {number} [delay=0]
 * @param {boolean} [reverse] If `true`, animate
 *        from the `target` to current state.
 *
 * @example
 *  // Animate position
 *  el._animateToShallow({
 *      position: [10, 10]
 *  })
 *
 *  // Animate shape, style and position in 100ms, delayed 100ms
 *  el._animateToShallow({
 *      shape: {
 *          width: 500
 *      },
 *      style: {
 *          fill: 'red'
 *      }
 *      position: [10, 10]
 *  }, 100, 100)
 */
function animateToShallow(animatable, path, source, target, time, delay, reverse) {
    var objShallow = {};
    var propertyCount = 0;
    for (var name in target) {
        if (!target.hasOwnProperty(name)) {
            continue;
        }

        if (source[name] != null) {
            if (isObject$1(target[name]) && !isArrayLike(target[name])) {
                animateToShallow(
                    animatable,
                    path ? path + '.' + name : name,
                    source[name],
                    target[name],
                    time,
                    delay,
                    reverse
                );
            }
            else {
                if (reverse) {
                    objShallow[name] = source[name];
                    setAttrByPath(animatable, path, name, target[name]);
                }
                else {
                    objShallow[name] = target[name];
                }
                propertyCount++;
            }
        }
        else if (target[name] != null && !reverse) {
            setAttrByPath(animatable, path, name, target[name]);
        }
    }

    if (propertyCount > 0) {
        animatable.animate(path, false)
            .when(time == null ? 500 : time, objShallow)
            .delay(delay || 0);
    }
}

function setAttrByPath(el, path, name, value) {
    // Attr directly if not has property
    // FIXME, if some property not needed for element ?
    if (!path) {
        el.attr(name, value);
    }
    else {
        // Only support set shape or style
        var props = {};
        props[path] = {};
        props[path][name] = value;
        el.attr(props);
    }
}

/**
 * @alias module:zrender/Element
 * @constructor
 * @extends {module:zrender/mixin/Animatable}
 * @extends {module:zrender/mixin/Transformable}
 * @extends {module:zrender/mixin/Eventful}
 */
var Element = function (opts) { // jshint ignore:line

    Transformable.call(this, opts);
    Eventful.call(this, opts);
    Animatable.call(this, opts);

    /**
     * 画布元素ID
     * @type {string}
     */
    this.id = opts.id || guid();
};

Element.prototype = {

    /**
     * 元素类型
     * Element type
     * @type {string}
     */
    type: 'element',

    /**
     * 元素名字
     * Element name
     * @type {string}
     */
    name: '',

    /**
     * ZRender 实例对象，会在 element 添加到 zrender 实例中后自动赋值
     * ZRender instance will be assigned when element is associated with zrender
     * @name module:/zrender/Element#__zr
     * @type {module:zrender/ZRender}
     */
    __zr: null,

    /**
     * 图形是否忽略，为true时忽略图形的绘制以及事件触发
     * If ignore drawing and events of the element object
     * @name module:/zrender/Element#ignore
     * @type {boolean}
     * @default false
     */
    ignore: false,

    /**
     * 用于裁剪的路径(shape)，所有 Group 内的路径在绘制时都会被这个路径裁剪
     * 该路径会继承被裁减对象的变换
     * @type {module:zrender/graphic/Path}
     * @see http://www.w3.org/TR/2dcontext/#clipping-region
     * @readOnly
     */
    clipPath: null,

    /**
     * 是否是 Group
     * @type {boolean}
     */
    isGroup: false,

    /**
     * Drift element
     * @param  {number} dx dx on the global space
     * @param  {number} dy dy on the global space
     */
    drift: function (dx, dy) {
        switch (this.draggable) {
            case 'horizontal':
                dy = 0;
                break;
            case 'vertical':
                dx = 0;
                break;
        }

        var m = this.transform;
        if (!m) {
            m = this.transform = [1, 0, 0, 1, 0, 0];
        }
        m[4] += dx;
        m[5] += dy;

        this.decomposeTransform();
        this.dirty(false);
    },

    /**
     * Hook before update
     */
    beforeUpdate: function () {},
    /**
     * Hook after update
     */
    afterUpdate: function () {},
    /**
     * Update each frame
     */
    update: function () {
        this.updateTransform();
    },

    /**
     * @param  {Function} cb
     * @param  {}   context
     */
    traverse: function (cb, context) {},

    /**
     * @protected
     */
    attrKV: function (key, value) {
        if (key === 'position' || key === 'scale' || key === 'origin') {
            // Copy the array
            if (value) {
                var target = this[key];
                if (!target) {
                    target = this[key] = [];
                }
                target[0] = value[0];
                target[1] = value[1];
            }
        }
        else {
            this[key] = value;
        }
    },

    /**
     * Hide the element
     */
    hide: function () {
        this.ignore = true;
        this.__zr && this.__zr.refresh();
    },

    /**
     * Show the element
     */
    show: function () {
        this.ignore = false;
        this.__zr && this.__zr.refresh();
    },

    /**
     * @param {string|Object} key
     * @param {*} value
     */
    attr: function (key, value) {
        if (typeof key === 'string') {
            this.attrKV(key, value);
        }
        else if (isObject$1(key)) {
            for (var name in key) {
                if (key.hasOwnProperty(name)) {
                    this.attrKV(name, key[name]);
                }
            }
        }

        this.dirty(false);

        return this;
    },

    /**
     * @param {module:zrender/graphic/Path} clipPath
     */
    setClipPath: function (clipPath) {
        var zr = this.__zr;
        if (zr) {
            clipPath.addSelfToZr(zr);
        }

        // Remove previous clip path
        if (this.clipPath && this.clipPath !== clipPath) {
            this.removeClipPath();
        }

        this.clipPath = clipPath;
        clipPath.__zr = zr;
        clipPath.__clipTarget = this;

        this.dirty(false);
    },

    /**
     */
    removeClipPath: function () {
        var clipPath = this.clipPath;
        if (clipPath) {
            if (clipPath.__zr) {
                clipPath.removeSelfFromZr(clipPath.__zr);
            }

            clipPath.__zr = null;
            clipPath.__clipTarget = null;
            this.clipPath = null;

            this.dirty(false);
        }
    },

    /**
     * Add self from zrender instance.
     * Not recursively because it will be invoked when element added to storage.
     * @param {module:zrender/ZRender} zr
     */
    addSelfToZr: function (zr) {
        this.__zr = zr;
        // 添加动画
        var animators = this.animators;
        if (animators) {
            for (var i = 0; i < animators.length; i++) {
                zr.animation.addAnimator(animators[i]);
            }
        }

        if (this.clipPath) {
            this.clipPath.addSelfToZr(zr);
        }
    },

    /**
     * Remove self from zrender instance.
     * Not recursively because it will be invoked when element added to storage.
     * @param {module:zrender/ZRender} zr
     */
    removeSelfFromZr: function (zr) {
        this.__zr = null;
        // 移除动画
        var animators = this.animators;
        if (animators) {
            for (var i = 0; i < animators.length; i++) {
                zr.animation.removeAnimator(animators[i]);
            }
        }

        if (this.clipPath) {
            this.clipPath.removeSelfFromZr(zr);
        }
    }
};

mixin(Element, Animatable);
mixin(Element, Transformable);
mixin(Element, Eventful);

/**
 * @module echarts/core/BoundingRect
 */

var v2ApplyTransform = applyTransform;
var mathMin = Math.min;
var mathMax = Math.max;

/**
 * @alias module:echarts/core/BoundingRect
 */
function BoundingRect(x, y, width, height) {

    if (width < 0) {
        x = x + width;
        width = -width;
    }
    if (height < 0) {
        y = y + height;
        height = -height;
    }

    /**
     * @type {number}
     */
    this.x = x;
    /**
     * @type {number}
     */
    this.y = y;
    /**
     * @type {number}
     */
    this.width = width;
    /**
     * @type {number}
     */
    this.height = height;
}

BoundingRect.prototype = {

    constructor: BoundingRect,

    /**
     * @param {module:echarts/core/BoundingRect} other
     */
    union: function (other) {
        var x = mathMin(other.x, this.x);
        var y = mathMin(other.y, this.y);

        this.width = mathMax(
                other.x + other.width,
                this.x + this.width
            ) - x;
        this.height = mathMax(
                other.y + other.height,
                this.y + this.height
            ) - y;
        this.x = x;
        this.y = y;
    },

    /**
     * @param {Array.<number>} m
     * @methods
     */
    applyTransform: (function () {
        var lt = [];
        var rb = [];
        var lb = [];
        var rt = [];
        return function (m) {
            // In case usage like this
            // el.getBoundingRect().applyTransform(el.transform)
            // And element has no transform
            if (!m) {
                return;
            }
            lt[0] = lb[0] = this.x;
            lt[1] = rt[1] = this.y;
            rb[0] = rt[0] = this.x + this.width;
            rb[1] = lb[1] = this.y + this.height;

            v2ApplyTransform(lt, lt, m);
            v2ApplyTransform(rb, rb, m);
            v2ApplyTransform(lb, lb, m);
            v2ApplyTransform(rt, rt, m);

            this.x = mathMin(lt[0], rb[0], lb[0], rt[0]);
            this.y = mathMin(lt[1], rb[1], lb[1], rt[1]);
            var maxX = mathMax(lt[0], rb[0], lb[0], rt[0]);
            var maxY = mathMax(lt[1], rb[1], lb[1], rt[1]);
            this.width = maxX - this.x;
            this.height = maxY - this.y;
        };
    })(),

    /**
     * Calculate matrix of transforming from self to target rect
     * @param  {module:zrender/core/BoundingRect} b
     * @return {Array.<number>}
     */
    calculateTransform: function (b) {
        var a = this;
        var sx = b.width / a.width;
        var sy = b.height / a.height;

        var m = create$1();

        // 矩阵右乘
        translate(m, m, [-a.x, -a.y]);
        scale$1(m, m, [sx, sy]);
        translate(m, m, [b.x, b.y]);

        return m;
    },

    /**
     * @param {(module:echarts/core/BoundingRect|Object)} b
     * @return {boolean}
     */
    intersect: function (b) {
        if (!b) {
            return false;
        }

        if (!(b instanceof BoundingRect)) {
            // Normalize negative width/height.
            b = BoundingRect.create(b);
        }

        var a = this;
        var ax0 = a.x;
        var ax1 = a.x + a.width;
        var ay0 = a.y;
        var ay1 = a.y + a.height;

        var bx0 = b.x;
        var bx1 = b.x + b.width;
        var by0 = b.y;
        var by1 = b.y + b.height;

        return !(ax1 < bx0 || bx1 < ax0 || ay1 < by0 || by1 < ay0);
    },

    contain: function (x, y) {
        var rect = this;
        return x >= rect.x
            && x <= (rect.x + rect.width)
            && y >= rect.y
            && y <= (rect.y + rect.height);
    },

    /**
     * @return {module:echarts/core/BoundingRect}
     */
    clone: function () {
        return new BoundingRect(this.x, this.y, this.width, this.height);
    },

    /**
     * Copy from another rect
     */
    copy: function (other) {
        this.x = other.x;
        this.y = other.y;
        this.width = other.width;
        this.height = other.height;
    },

    plain: function () {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
};

/**
 * @param {Object|module:zrender/core/BoundingRect} rect
 * @param {number} rect.x
 * @param {number} rect.y
 * @param {number} rect.width
 * @param {number} rect.height
 * @return {module:zrender/core/BoundingRect}
 */
BoundingRect.create = function (rect) {
    return new BoundingRect(rect.x, rect.y, rect.width, rect.height);
};

/**
 * Group是一个容器，可以插入子节点，Group的变换也会被应用到子节点上
 * @module zrender/graphic/Group
 * @example
 *     var Group = require('zrender/container/Group');
 *     var Circle = require('zrender/graphic/shape/Circle');
 *     var g = new Group();
 *     g.position[0] = 100;
 *     g.position[1] = 100;
 *     g.add(new Circle({
 *         style: {
 *             x: 100,
 *             y: 100,
 *             r: 20,
 *         }
 *     }));
 *     zr.add(g);
 */

/**
 * @alias module:zrender/graphic/Group
 * @constructor
 * @extends module:zrender/mixin/Transformable
 * @extends module:zrender/mixin/Eventful
 */
var Group = function (opts) {

    opts = opts || {};

    Element.call(this, opts);

    for (var key in opts) {
        if (opts.hasOwnProperty(key)) {
            this[key] = opts[key];
        }
    }

    this._children = [];

    this.__storage = null;

    this.__dirty = true;
};

Group.prototype = {

    constructor: Group,

    isGroup: true,

    /**
     * @type {string}
     */
    type: 'group',

    /**
     * 所有子孙元素是否响应鼠标事件
     * @name module:/zrender/container/Group#silent
     * @type {boolean}
     * @default false
     */
    silent: false,

    /**
     * @return {Array.<module:zrender/Element>}
     */
    children: function () {
        return this._children.slice();
    },

    /**
     * 获取指定 index 的儿子节点
     * @param  {number} idx
     * @return {module:zrender/Element}
     */
    childAt: function (idx) {
        return this._children[idx];
    },

    /**
     * 获取指定名字的儿子节点
     * @param  {string} name
     * @return {module:zrender/Element}
     */
    childOfName: function (name) {
        var children = this._children;
        for (var i = 0; i < children.length; i++) {
            if (children[i].name === 