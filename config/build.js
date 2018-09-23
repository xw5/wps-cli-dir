'use strict';
require.config({
    paths: {
        util: './core/util',
        openAjax:'./core/openAjax'
    }
});

if(typeof module === "object" && typeof module.exports === 'object'){
    module.exports = require;
}