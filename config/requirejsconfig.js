'use strict';
require.config({
    paths: {
        util: './core/util',
        openAjax:'./core/openAjax',
        text:'./core/text',
        jquery: '//s1.vas.wpscdn.cn/web-libs/js/jquery/1.11.3/jquery',
        avalon: '//s1.vas.wpscdn.cn/web-libs/js/avalon/2.2.4/avalon'
    }
});

if(typeof module === "object" && typeof module.exports === 'object'){
    module.exports = require;
}