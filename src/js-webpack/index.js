var util = require('./core/util');
var openAjax = require('./core/openAjax');

console.log(util,openAjax);
var mySwiper = new Swiper('.swiper-container',{
    autoplay:3000,
    loop: true,
    pagination : '.pagination'
});