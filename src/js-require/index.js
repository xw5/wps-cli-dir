require.config({
    baseUrl:'js/',
    paths: {
        util: 'core/util',
        openAjax:'core/openAjax'
    }
});
require(['util','openAjax'],
    function(Util,openAjax) {
        console.log(Util,openAjax);
        var mySwiper = new Swiper('.swiper-container',{
            autoplay:3000,
            loop: true,
            pagination : '.pagination'
        });
    });