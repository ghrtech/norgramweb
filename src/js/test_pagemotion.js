/**
 * Created by whobird on 17/4/10.
 */
$(document).ready(function(){
    var slideCount=$(".section-wrapper").find(".section-slide").length;
    console.log(slideCount);
    var curIndex=0;
    var curIndexProgress=0;
    var lastProgress=0;

    var checkPositionWorker=null;

    function setPosition(){
        console.log("timeout=============action=================");
        console.log(curIndex);
        mySwiper.slideTo(curIndex);
        setTimeout(function(){
            if(curIndex<0){curIndex=0;}
            if(curIndex>=(slideCount-1)){
                curIndex=slideCount-1;
                console.log(">=slide count -1===================")
                //最后一张动画要反向；
                console.log("translate3d("+(-20*(curIndex-2))+"%, 0px, 0px)");
                $(".section-wrapper").css({
                    "transform": "translate3d("+(-20*(curIndex-2))+"%, 0px, 0px)",
                })

            }else{
                console.log("curIndex:"+curIndex);
                console.log("translate3d("+(-20*curIndex)+"%, 0px, 0px)");
                $(".section-wrapper").css({
                    "transform": "translate3d("+(-20*curIndex)+"%, 0px, 0px)",
                });
            }

            $(".section-slide").css("width","20%");
            $("#section-"+curIndex).css("width","50%");

        },100);
        clearTimeout(checkPositionWorker);
        checkPositionWorker=null;
    };

    var mySwiper = new Swiper('.swiper-container', {
       // slidesPerView: 3.2,

        freeMode:true,
        freeModeMomentum:false,
        freeModeMomentumBounce : true,
        freeModeMomentumBounceRatio:10,

        slidesPerView: 'auto',
        observer:true,
        observerParents:true,
        mousewheelControl:true,
        mousewheelSensitivity : 2,
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
            console.log("**********************************************************************");
            console.log("progress===========================");
            console.log("progress:"+progress);
            console.log("lastProgress:"+lastProgress);
            //console.log(mySwiper.realIndex);

            //根据 progress 计算当前的index
            var indexRate=100/(slideCount-1);
            var index=Math.round(progress*100/indexRate);
            if(index<0){index=0;}
            if(index>=(slideCount-1)){
                index=slideCount-1;
                //最后一张动画要反向；
                var indexProgress=swiper.slides[index].progress;
                $(".section-wrapper").css({
                    "transform": "translate3d("+((-20*(index-2))-(20*indexProgress) )+"%, 0px, 0px)",
                });

            }else if(index==(slideCount-2)){
                var indexProgress=swiper.slides[index].progress;
                console.log("translate3d:"+((-20*(index))-(20*(indexProgress)) )+" %");
                //倒数第二张情况分两种
                if(indexProgress>0){
                    //当前slide移走 时，最后一张进入，动画要反向
                    $(".section-wrapper").css({
                        "transform": "translate3d("+((-20*(index))+(20*indexProgress)  )+"%, 0px, 0px)",
                    });
                }else if(indexProgress<0){
                    //当前slide 移过来
                    $(".section-wrapper").css({
                        "transform": "translate3d("+((-20*(index))-(20*indexProgress)  )+"%, 0px, 0px)",
                    });

                }

            }else{
                var indexProgress=swiper.slides[index].progress;
                console.log("translate3d:"+((-20*(index))-(20*(indexProgress)) )+" %");
                $(".section-wrapper").css({
                    "transform": "translate3d("+((-20*(index))-(20*indexProgress)  )+"%, 0px, 0px)",
                });
            }

            curIndex=index;


            if(index>0 && index<slideCount-1){
                if(indexProgress>0){
                    //当前slide移走
                    var $curSection=$("#section-"+index);
                    var $targetSection=$("#section-"+(index+1));
                    $curSection.css("width",(50-30*indexProgress)+"%");
                    $targetSection.css("width",(20+30*indexProgress)+"%");
                }else if(indexProgress<0){
                    //当前slide 移过来
                    var $curSection=$("#section-"+index);
                    var $targetSection=$("#section-"+(index-1));

                    $curSection.css("width",(50+30*indexProgress)+"%");
                    $targetSection.css("width",(20-30*indexProgress)+"%");
                }
            }else if(index==0){
                //index＝＝0只处理slide移走情况
                if(indexProgress>0){
                    var $curSection=$("#section-"+index);
                    var $targetSection=$("#section-"+(index+1));
                    $curSection.css("width",(50-30*indexProgress)+"%");
                    $targetSection.css("width",(20+30*indexProgress)+"%");
                }
            }else if(index==(slideCount-1)){
                //最后一张考虑 slide 移过来
                if(indexProgress<0){
                    //当前slide 移过来
                    var $curSection=$("#section-"+index);
                    var $targetSection=$("#section-"+(index-1));

                    $curSection.css("width",(50+30*indexProgress)+"%");
                    $targetSection.css("width",(20-30*indexProgress)+"%");
                }
            }

            clearTimeout(checkPositionWorker);
            checkPositionWorker=null;

            if(!checkPositionWorker){
                console.log("timeout=============");
                checkPositionWorker=setTimeout(setPosition,300);
            }
        },

        onTransitionEnd: function(swiper){
            console.log("transitionEnd======================");
        }

    });

    $(".nav-btn").on("click",function(e){
       $(".main").toggleClass("nav-active");
    });


});
