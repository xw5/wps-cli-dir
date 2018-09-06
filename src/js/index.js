var getCodeError = {
    'apiRateLimitExceede':'系统崩溃，请稍后尝试',
    'highrisk mobile':'帐号风险系数较高，请更换手机重试',
    'received':'已领取，请前往WPS-个人中心查看'
};
var getPrizeError = {
    'invalid channel': 	'系统崩溃，请稍后尝试',
    'received':'已领取，请前往WPS-个人中心查看',
    'act end':'活动已结束',
    'highrisk mobile':'系统崩溃，请稍后尝试',
    'need sms verify':'需要获取手机验证码',
    'InvalidSMSCode InvalidSMSCode':'错误的验证码',
    'failed':'领取失败，请联系客服',
    'apiRateLimitExceede apiRateLimitExceede':'系统崩溃，请稍后尝试',
    'new user limit':'新用户不能参与',
    'user_type_not_match':'系统崩溃，请稍后尝试'
};
require.config({
    paths: {
        util: './common/util',
        openAjax:'./common/openAjax',
        text:'./common/text',
        jquery: '//s1.vas.wpscdn.cn/web-libs/js/jquery/1.11.3/jquery',
        avalon: '//s1.vas.wpscdn.cn/web-libs/js/avalon/2.2.4/avalon'
    }
});
require(['jquery','util','openAjax','avalon','text!./core/privilegedetailbox.html'],
    function($, Util,openAjax,avalon,PrivilegeDetailHtml) {
        //页面数据模型
        var exchangeConfig = datamodel.config;
        var model = avalon.define({
            $id:"dockerExchange",
            status:exchangeConfig.state,//活动结束标记，1开0关
            channel:datamodel.channel,//活动渠道
            headerBanner:exchangeConfig.banner.img_url,//首屏banner
            pageTitle:exchangeConfig.title,//首屏标题
            headerBannerColor:exchangeConfig.banner_color,//背景平铺颜色
            vipImg:exchangeConfig.extend_params,//特权banner
            ruleList:exchangeConfig.rule_list,//活动规则
            tipsStr:'',//提示弹窗内容
            isShowTipsBtn:false,//是否显示提示弹窗的去使用按钮
            tel:'',//表单电话号码
            telCode:'',//验证码
            codeTips:'发送验证码',
            codeTime:59,
            isSendIng:false,//验证码是否在一个发送流程中
            prizeUrl:[],//所得奖品图片地址
            isGetIng:false,//是否正在获取奖品
            isShowPrize:false,//是否显示领取弹窗
            isShowAllPrivilege:Util.isPC(),//是否显示查看全部特权按钮
            privilegeDetailHtml:PrivilegeDetailHtml,//特权弹窗html
            privilegeDetailFlag:false,//是否显示特权弹窗
            backPrize:function(){//是否是登录跳转回来领取奖品
                var backprize = datamodel.auto_receive;
                var backprizedata = null;
                if(!backprize.result){
                    return;
                }
                backprizedata = backprize.data;
                if(backprize.result === 'ok'){
                    this.showPrize(backprizedata);
                }else{
                    this.getPrizeErrTips(backprize);
                }
            },
            isGoCount:function(){//验证码可重发倒计时
                var that =this;
                this.codeTips = this.codeTime+'s可重发';
                var timer = setInterval(function(){
                    that.codeTime--;
                    that.codeTips = that.codeTime+'s可重发';
                    if(that.codeTime === 0){
                        that.codeTips = '发送验证码';
                        that.codeTime = 59;
                        that.isSendIng = false;//发送过程已结束
                        clearInterval(timer);
                    }
                },1000);
            },
            testAction:function(){//检测活动是否结束
                if(Number(this.status) === 0){
                    this.showTips('本次活动已结束~下次再来吧！')
                    return false;
                }else{
                    return true;
                }
            },
            showTips:function(str,time){//显示提示弹窗方法
                var that = this;
                this.tipsStr = str;
                if(time){
                    setTimeout(function(){
                        that.tipsStr = '';
                    },time*1000);
                }
            },
            testTel:function(){//验证手机号是否符合规则
                return /^1[3,4,5,7,8]\d{9}$/.test(this.tel)
            },
            testTelCode:function(){//验证验证码是否符合规则
                return /^\d{6}$/.test(this.telCode)
            },
            getTelCode:function(){//获取验证码
                var that = this;
                model.sendCollect('点击', '获取验证码点击量');
                //活动结束直接提示活动结束
                if(!this.testAction()){
                    return;
                }
                //验证码已经发送了
                if(this.isSendIng){
                    return;
                }
                //验证手机号
                if(!this.testTel()){
                    this.showTips('手机号输入错误，请重试！')
                    return;
                }
                this.isSendIng = true;
                //获取验证码
                openAjax({
                    url:'docer_exchange/api/smscode',
                    type:'post',
                    data:{
                        phone:that.tel,
                        channel: that.channel
                    },
                    success:function(data){
                        //验证码发送成功
                        if(data.result === 'ok'){
                            //执行验证码可重发倒计时
                            model.isGoCount();
                        }else{//验证码发送失败
                            var str = getCodeError[data.msg];
                            model.isShowTipsBtn = false;
                            if(data.msg === 'received'){
                                model.isShowTipsBtn = true;
                            }
                            model.showTips(str ? str : '系统崩溃，请稍后尝试');
                            model.isSendIng = false;
                        }
                    },
                    error:function(){
                        model.showTips('系统繁忙，请重试！');
                        model.isSendIng = false;
                    }
                });
            },
            showPrize:function(data){//显示获奖弹窗
                var imgUrl = [];
                for(var i=0,len=data.length;i<len;i++){
                    imgUrl.push(data[i].img_url);
                }
                this.prizeUrl = imgUrl;
                this.isShowPrize = true;
            },
            getPrizeErrTips:function(data){//领取奖品失败提示
                var str = getPrizeError[data.msg];
                this.isShowTipsBtn = false;
                if(data.msg === 'need register'){
                    location.href = data.data.jump;
                    return;
                }
                if(data.msg === 'received'){
                    this.isShowTipsBtn = true;
                }
                this.showTips(str ? str : '系统崩溃，请稍后尝试！');
            },
            getPrize:function(){//获取奖品
                var that = this;
                model.sendCollect('点击', '立即领取点击量');
                //活动结束直接提示活动结束
                if(!this.testAction()){
                    return;
                }
                //如果已经点击过获取不让再点击
                if(this.isGetIng){
                    return;
                }
                this.isGetIng = true;
                //验证手机号
                if(!this.testTel()){
                    this.showTips('手机号输入错误，请重试！');
                    return;
                }
                //验证验证码
                if(!this.testTelCode()){
                    this.showTips('验证码输入错误，请重试！');
                    return;
                }
                //获取奖品
                openAjax({
                    url:'docer_exchange/api/reward',
                    type:'post',
                    data:{
                        phone:that.tel,
                        channel: that.channel,
                        smscode:that.telCode
                    },
                    success:function(data){
                        var prizeO = null;
                        //获取成功
                        if(data.result === 'ok'){
                            prizeO = data.data;
                            that.showPrize(prizeO);
                            model.sendCollect('展示','领取成功');
                        }else{//获取失败
                            that.getPrizeErrTips(data);
                        }
                        that.isGetIng = false;
                    },
                    error:function(){
                        that.showTips('系统繁忙，请重试！');
                        that.isGetIng = false;
                    }
                })
            },
            gotoGetPrize:function(){//去使用跳转路径配置
                var app = Util.getQueryStringRegExp('app');
                var position = Util.getQueryStringRegExp('position');
                var isPc = Util.isPC();
                // if(!isPc){//如果当前是在浏览器的手机端则跳转手机端地址
                //     location.href = 'http://android.myapp.com/myapp/detail.htm?apkName=cn.wps.moffice_eng&ADTAG=moblie';
                //     return;
                // }
                model.sendCollect('点击', '去使用点击量');
                location.href = 'http://www.docer.com/?from_win='+position+'&&position=docer_'+position+'&&csource='+app+'_cooperation_docer';
            },
            //信息收集
            sendCollect: function(action, value) {
                this.sendCount_sub('稻壳通用兑换专题', action, value || '');
            },
            /*
             * CNZZ信息收集 - 参数顺序意义
             *
             * elements     category    {String}    事件发生在谁身上
             * elements     action      {String}    访客跟元素交互的行为动作
             * elements     label       {String}    用于详细的描述事件
             * elements     value       {int}       用于填写打分型事件的分值
             * elements     nodeid      {String}    填写事件元素的div元素ID
             */
            sendCount_sub:function (category, action, label) {
                if(window._czc){
                    var _czc = window._czc || [];
                    _czc.push(['_trackEvent', category, action, label]);
                }else{
                    setTimeout(function() {
                        model.sendCount_sub(category, action, label);
                    }, 500)
                }
            }
        });
        //数据渲染完后才去初始化swiper
        model.$watch('onReady',function(){
            //轮播实现
            var mySwiper = new Swiper('#vipExchangeList',{
                autoplay:3000,
                loop:true,
                autoplayDisableOnInteraction:false,
                pagination: '.pagination',
                grabCursor: true,
                paginationClickable: true
            });
            //验证是否是登录返回领奖用户
            model.backPrize();
            model.sendCollect('展示', '页面展示量');
        });

        return model;
    });