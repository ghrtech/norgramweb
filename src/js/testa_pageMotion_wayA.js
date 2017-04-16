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
        //freeMode:true,
        //freeModeMomentum:false,
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
            console.log("progress=====================");
            console.log("progress:"+progress);
            console.log("lastProgress:"+lastProgress);
            console.log(prevIndex);
            //console.log(mySwiper.realIndex);
            console.log("progress=====================");
            var index=prevIndex;
            if(progress>lastProgress){
                index=prevIndex+1;
            }else if(progress<lastProgress){
                index=prevIndex-1
            }
            if(index<0){
                index=progress;
            }
            if(index>=slideCount-1){
                console.log(">=slide count -1===================")
                //最后一张动画要反向；
                if(index>=slideCount){
                    console.log(">=slide count===================")
                    $(".section-wrapper").css({
                        "transform": "translate3d("+( (-20*(slideCount-3)) - ((progress-lastProgress)*10) )+"%, 0px, 0px)",
                    });
                    //index>=slideCount时不要做css class处理
                    return;
                }else{
                    $(".section-wrapper").css({
                        "transform": "translate3d("+(-20*(index-2))+"%, 0px, 0px)",
                    })
                }

            }else{
                console.log("index:"+index);
                console.log("translate3d("+(-20*index)+"%, 0px, 0px)")
                $(".section-wrapper").css({
                    "transform": "translate3d("+(-20*index)+"%, 0px, 0px)",
                });
            }

            $(".section-slide").removeClass("section-slide-active");
            $(".section-slide").eq(index).addClass("section-slide-active");

        },

        onTransitionEnd: function(swiper){
            prevIndex=swiper.realIndex;
            lastProgress=swiper.progress;
        }

    });

    $(".nav-panel").on("click",function(e){
       $(".main").toggleClass("nav-active");
    });

    $("body").on("click",function(e){
       console.log(e);
    });
});
