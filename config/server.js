//主要解决前端跨域请求问题
var proxyMiddleware = require("http-proxy-middleware");
module.exports={
    middleware :[
        proxyMiddleware(['/docer_exchange'], {target: 'http://zt.wps.cn/partner', changeOrigin: true})
    ]
}