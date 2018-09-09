import myAjax from './core/openAjax.js';
import {getQueryStringRegExp,isPC,isWechar,isIOS} from './core/util.js';

console.log(getQueryStringRegExp,isPC,isWechar,isIOS,myAjax);

const mySwiper = new Swiper('.swiper-container',{
    autoplay:3000,
    loop: true,
    pagination : '.pagination'
});