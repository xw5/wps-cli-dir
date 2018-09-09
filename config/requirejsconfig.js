'use strict';
require.config({
    baseUrrl:'js/',
    paths: {
        util: 'core/util',
        openAjax:'core/openAjax'
    }
});

if(typeof module === "object" && typeof module.exports === 'object'){
    module.exports = require;
}