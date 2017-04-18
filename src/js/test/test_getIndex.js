/**
 * Created by whobird on 17/4/10.
 */
$(document).ready(function(){
    var slideCount=$(".section-wrapper").find(".section-slide").length;
    console.log(slideCount);
    var prevIndex=0;
    var lastProgress=0;
    var mySwiper = new Swiper('.swiper-container', {
       // slidesPerView: 3.2,

        freeMode:true,
        freeModeMomentum:false,

        slidesPerView: 'auto',
        observer:true,
        observerParents:true,
        mousewheelControl:true,
        watchSlidesProgress : true,
        touchRatio:3,
        shortSwipes:false,
        threshold : 100,
        /*freeModeSticky:true,
        freeModeMomentumBounce : true,
        freeModeMomentumBounceRatio:10,*/
        grabCursor : true,

        onProgress: function(swiper, progress){
            //console.log(mySwiper.realIndex);
            console.log("**********************************************************************")
            console.log("progress===========================");
            console.log("progress:"+progress);
            console.log("lastProgress:"+lastProgress);
            //console.log(mySwiper.realIndex);
            //根据 progress 计算当前的index
            var indexRate=100/(slideCount-1);
            var index=Math.round(progress*100/indexRate);

            if(index>(slideCount-1)){
                index=slideCount-1;
            }

            console.log(index);
            console.log("index progress=====================");
            var indexProgress=swiper.slides[index].progress;
            console.log(indexProgress);
            console.log("==================================================*************");
            console.log("translate3d("+((-20*(index))-(20*indexProgress))+" %");
            lastProgress=swiper.progress;

            $(".section-wrapper").css({
                "transform": "translate3d("+((-20*(index))-(20*indexProgress)  )+"%, 0px, 0px)",
            })
        },

        onTransitionEnd: function(swiper){
            console.log("transitionEnd======================");


        }

    });

    $(".nav-panel").on("click",function(e){
       $(".main").toggleClass("nav-active");
    });

    $("body").on("click",function(e){
       console.log(e);
    });
});
