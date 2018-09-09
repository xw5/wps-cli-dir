/*
* 获取URL的参数
* */
function getQueryStringRegExp(name) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&^#]*)(\\s|&|$|#)", "i");
    if (reg.test(location.href)) {
        return unescape(RegExp.$2.replace(/\+/g, " "));
    }
    return "";
}
//当前是否在PC
function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
//是否在IOS上
function isIOS() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["iPhone","iPad", "iPod"];
    var flag = false;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    return flag;
}
//当前是否在微信下
function isWechar() {
    if (/MicroMessenger/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}

export {
    getQueryStringRegExp,
    isPC,
    isWechar,
    isIOS
};
