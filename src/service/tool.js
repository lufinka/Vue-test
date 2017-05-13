const iOS = function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
}
const isAndroid = function () {
    return navigator.userAgent.match(/Android/i) ? true : false;
}
const inWechat = function () {
    return /micromessenger/i.test(navigator.userAgent);
}
const setLocalStorage = function (key, value) {
    if (window.localStorage) {
        window.localStorage.setItem(key, value);
    }
}
const getLocalStorage = function (key) {
    if (window.localStorage) {
        return window.localStorage.getItem(key);
    }
}
/**
 * 获取url参数
 * 使用方式：getLocationParam.key 这里的key是你参数名
 * @returns {{}}
 */
const getLocationParam = function () {
    var url = window.location.search;
    var params = url.toString().slice(1).split("&");
    var returnObject = {};
    for (var i = 0; i != params.length; i++) {
        var index = params[i].indexOf("=");
        returnObject[params[i].slice(0, index)] = params[i].slice(index + 1);
    }
    return returnObject;
}
/**
 * 获取url地址#号后面的参数
 */
const getLocationState = function () {
    var url = window.location.hash;
    var arr = [];
    var returnObject = url.substring(1).split("=");
    arr[returnObject[0]] = returnObject[1];
    return arr;
}
/**
 * 格式化 参数
 * @param url
 * @returns {{}}
 */
const getParam = function (url) {
    url = decodeURIComponent(url);
    var params = url ? url.toString().split("&") : [];
    var returnObject = {};

    for (var i = 0; i != params.length; i++) {
        var canshu = params[i].split("=");
        returnObject[canshu[0]] = canshu[1];
    }
    return returnObject;
}
/**
 * 格式化 参数
 * @param url
 * @returns {{}}
 */
const getURIParams = function (url) {
    url = decodeURIComponent(url);
    var paramsBegin = url.indexOf("?");
    var params = url ? url.toString().substring(paramsBegin + 1, url.length).split("&") : [];
    var returnObject = {};

    for (var i = 0; i != params.length; i++) {
        var canshu = params[i].split("=");
        returnObject[canshu[0]] = canshu[1];
    }
    return returnObject;
}
const cookie = function (key, value, options) {
    var self = this;
    // Write
    if (value !== undefined && !$.isFunction(value)) {
        options = $.extend({}, self.config.defaults, options);
        if (typeof options.expires === 'number') {
            var days = options.expires,
                t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        return (document.cookie = [
                        self.encode(key), '=', self.stringifyCookieValue(value),
                        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                        options.path ? '; path=' + options.path : '',
                        options.domain ? '; domain=' + options.domain : '',
                        options.secure ? '; secure' : ''
                    ].join(''));
    }
    // Read
    var result = key ? undefined : {};
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    for (var i = 0, l = cookies.length; i < l; i++) {
        var parts = cookies[i].split('=');
        var name = self.decode(parts.shift());
        var cookie = parts.join('=');

        if (key && key === name) {
            result = self.read(cookie, value);
            break;
        }
        if (!key && (cookie = self.read(cookie)) !== undefined) {
            result[name] = cookie;
        }
    }
    return result;
}
const removeCookie = function (name) {
    var that = this;
    var exp = new Date();
    exp.setTime(exp.getTime() - 1000);
    var cval = that.cookie(name);
    if (cval != null) {
        document.cookie = name + "=; expire=" + exp.toGMTString() + "; path=/;domain=.111.com.cn";
        // document.cookie= name + "="+cval+";path='/'"+";domain='.111.com.cn'"+";expires="+exp.toGMTString();
    }
}
/**
 * 获取cookie
 * @param name
 * @returns {*}
 */
const getCookie = function (name) {
    var self = this;
    return self._cookie.cookie(name)
}
/**
 * 设置cookie
 * 格式 {key:'',value:''}
 * @param data
 */
const setCookie = function (data) {
    var self = this;
    self._cookie.cookie(data.key, data.value, {
        expires: 1, // 有效期为 30 天
        path: "/", // 整个站点有效
        domain: '', // 有效域名
        secure: false // 加密数据传输
    })
}
/**
 * 格式化手机号
 * @param phone
 * @returns {*|XML|void|string}
 */
const formatPhone = function (phone) {
    return phone && phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}
/**
 * 获取登陆token
 */
const getToken = function () {
    var self = this;
    if (self.getLocalStorage('token')) {
        self.publicData.token = self.getLocalStorage('token');
    }
}
/**
 * 请求回调
 * @param callback
 * @param response
 */
const doCallback = function (callback, response) {

    if (!callback) return;
    var callbackFunc = callback.func,
        callbackContext = callback.context;
    callbackFunc && typeof (callbackFunc) == 'function' && callbackFunc.call(callbackContext, response.data);
}
//函数节流
const throttle = function (method, context, time) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
        method.call(context);
    }, time || 500);
}
export {
    getCookie,
    setCookie,
    formatPhone,
    getToken,
    doCallback,
    throttle,
    iOS,
    isAndroid,
    inWechat,
    setLocalStorage,
    getLocalStorage,
    getLocationParam,
    getLocationState,
    getParam,
    getURIParams,
    cookie,
    removeCookie
}