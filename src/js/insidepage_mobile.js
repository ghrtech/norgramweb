/**
 * Created by whobird on 17/4/18.
 */
var insidePage=(function($,ip){
    var insidePage=ip;

    var curUrl=location.href.slice(0,-5);

    insidePage.swiperInit=function() {
        var slideCount=$("siwper-slide").length;
        var curIndex
        var mySwiper = new Swiper('.swiper-container', {
            //slidesPerView: 'auto',
            slidesPerView: 1,
            observer: true,
            observerParents: true,
            mousewheelControl: true,
           /* mousewheelControl: true,
            mousewheelSensitivity: 1.2,
            watchSlidesProgress: true,
            touchRatio: 3,*/
            /*onProgress: function (swiper, progress) {

                //根据 progress 计算当前的index
                var indexRate = 100 / (slideCount - 1);
                var index = Math.round(progress * 100 / indexRate) || 0;

                $(".content-title").append("<h1>"+index+"</h1>");
            },//end onProgress*/
            onSlideChangeStart: function(swiper){
                $(".content-title").fadeOut(function(){
                });
            },
            onSlideChangeEnd: function(swiper){
                $(".content-title").html("<h1>"+swiper.activeIndex+"</h1>").fadeIn();
            },

        });//end mySwiper
    }//end swiperInit
    insidePage.init=function(){

        //start
        $("img.lazy").lazyload({
            event : "sporty",
            effect : "fadeIn"
        });

        $('#preloader').delay(350).fadeOut(function(){
            $("img.lazy").trigger("sporty");
        });
        $(".nav-btn").on("click",function(e){
            $(".main").toggleClass("nav-active");
            $(".main-content").toggleClass("fadeOutRight")

        });

        insidePage.swiperInit();
    };
    return insidePage;
})(jQuery,insidePage||{});

$(document).ready(function(){
    insidePage.init();
});

