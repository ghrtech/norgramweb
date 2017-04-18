/**
 * Created by whobird on 17/4/10.
 */
var winResizeDuration=null;

$(document).ready(function(){
    if(!IsPC()){
        window.location="./index.html";
        return;
    }
    //project init
    //start
    $("img.lazy").lazyload({
        event : "sporty",
        effect : "fadeIn"
    });
    setPage();



    $('#preloader').delay(350).fadeOut(function(){
        $("img.lazy").trigger("sporty");
    });

    var slideCount=$(".section-wrapper").find(".section-slide").length;

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
                //console.log(">=slide count -1===================")
                //最后一张动画要反向；
                //console.log("translate3d("+(-20*(curIndex-2))+"%, 0px, 0px)");

                $(".section-wrapper").css({
                    "transform": "translate3d("+(-50*(curIndex-2))+"%, 0px, 0px)",
                });
                tweenAnim.setBox(curIndex,-1);

                for(i=0;i<slideCount;i++) {
                    if (i == (curIndex - 1) || i == (curIndex - 2)) {
                        $("#section-" + i).removeClass("active").css("width", "20%");
                    } else if (i == curIndex) {
                        $("#section-" + curIndex).addClass("active").css("width", "50%");
                    } else {
                        $("#section-" + i).removeClass("active").css("width", "50%");
                    }
                }

            }else{
                //console.log("curIndex:"+curIndex);
                //console.log("translate3d("+(-20*curIndex)+"%, 0px, 0px)");
                $(".section-wrapper").css({
                    "transform": "translate3d("+(-50*curIndex)+"%, 0px, 0px)",
                });

                tweenAnim.setBox(curIndex,0);

                for(i=0;i<slideCount;i++){
                    if(i>curIndex){
                        $("#section-"+i).removeClass("active").css("width","20%");
                    }else if(i<curIndex){
                        $("#section-"+i).removeClass("active").css("width","50%");
                    }else{
                        $("#section-"+curIndex).addClass("active").css("width","50%");
                    }
                }

            }


        },100);

        clearTimeout(checkPositionWorker);
        checkPositionWorker=null;
    };

    var mySwiper = new Swiper('.swiper-container', {
       // slidesPerView: 3.2,

        freeMode:true,
        freeModeMomentum:false,
       /* freeModeMomentumBounce : true,
        freeModeMomentumBounceRatio:10,*/

        slidesPerView: 'auto',
        observer:true,
        observerParents:true,
        mousewheelControl:true,
        mousewheelSensitivity :1.8,
        watchSlidesProgress : true,
        touchRatio:3.8,
        //shortSwipes:false,
        //threshold : 100,
        /*freeModeSticky:true,
        freeModeMomentumBounce : true,
        freeModeMomentumBounceRatio:10,*/
        grabCursor : true,

        onProgress: function(swiper, progress){

            //根据 progress 计算当前的index
            var indexRate=100/(slideCount-1);
            var index=Math.round(progress*100/indexRate)||0;
            if(index<0){index=0;}
            if(index>=(slideCount-1)){
                index=slideCount-1;
                //最后一张动画要反向；
                var indexProgress=swiper.slides[index].progress;
                $(".section-wrapper").css({
                    "transform": "translate3d("+((-50*(index-2))-(50*indexProgress) )+"%, 0px, 0px)",
                });


            }else if(index==(slideCount-2)){
                var indexProgress=swiper.slides[index].progress;

                //倒数第二张情况分两种
                if(indexProgress>0){
                    //当前slide移走 时，最后一张进入，动画要反向
                    $(".section-wrapper").css({
                        "transform": "translate3d("+((-50*(index))+(50*indexProgress)  )+"%, 0px, 0px)",
                    });
                }else if(indexProgress<0){
                    //当前slide 移过来
                    $(".section-wrapper").css({
                        "transform": "translate3d("+((-50*(index))-(50*indexProgress)  )+"%, 0px, 0px)",
                    });
                }

            }else{
                var indexProgress=swiper.slides[index].progress;

                $(".section-wrapper").css({
                    "transform": "translate3d("+((-50*(index))-(50*indexProgress)  )+"%, 0px, 0px)",
                });

            }

            curIndex=index;
            if(index>0 && index<slideCount-1){
                if(indexProgress>0){
                    //当前slide移走
                    var $targetSection=$("#section-"+(index+1));
                    $targetSection.css("width",(20+30*indexProgress)+"%");
                    tweenAnim.update(curIndex+1,indexProgress,1);
                }else if(indexProgress<0){
                    //当前slide 移过来
                    var $curSection=$("#section-"+index);
                    $curSection.css("width",(50+30*indexProgress)+"%");
                    tweenAnim.update(curIndex,indexProgress,0);
                }
            }else if(index==0){
                //index＝＝0只处理slide移走情况
                if(indexProgress>0){
                    var $targetSection=$("#section-"+(index+1));
                    $targetSection.css("width",(20+30*indexProgress)+"%");

                    tweenAnim.update(curIndex+1,indexProgress,1);
                }
            }else if(index==(slideCount-1)){
                //最后一张考虑 slide 移过来
                if(indexProgress<0){
                    //当前slide 移过来
                    var $curSection=$("#section-"+index);
                    var $prevSection=$("#section-"+(index-1));
                    var $prevSection2=$("#section-"+(index-2));
                    $curSection.css("width",(50+30*indexProgress)+"%");
                    $prevSection.css("width",(20-30*indexProgress)+"%");
                    $prevSection.css("width",(20-30*indexProgress)+"%");
                    tweenAnim.update(curIndex,indexProgress,0);
                    tweenAnim.update(curIndex-1,indexProgress,-2);
                    tweenAnim.update(curIndex-2,indexProgress,-3);
                }
            }

            clearTimeout(checkPositionWorker);
            checkPositionWorker=null;

            if(!checkPositionWorker){
                //console.log("timeout=============");
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

    $(".swiper-slide > div.col-next").on("click",function(e){
        e.preventDefault();

        var index=$(this).data("index");
        console.log("index============"+index);
        var offset=parseInt($(".swiper-slide").css("width"))*(index-0.3);
        console.log(offset);
        mySwiper.setWrapperTranslate(-offset);

    });


     $(window).on("resize",function(e){
         cancelAnimationFrame (winResizeDuration);
         winResizeDuration=null;
         if(!winResizeDuration){
            winResizeDuration=requestAnimationFrame(setPage);
         }

     });

});

function setPage(){
    setBottom();
    setScale();
}
function setBottom(){
    //计算底部比例,保证底部放大时正好触底
    var w=parseFloat($(".section-slide.active").css("width"));
    var h=parseFloat($("body").css("height"));

    var imageRate=(1000/1980)//根据设计稿

    var bottomPercent=(w-22)*imageRate/h;

    $(".slide-content-set").css("height",bottomPercent*100+"%");

}
function setScale(){
    var curW=parseFloat($(".section-slide.active").css("width"))*0.4;
    var targetW=400;
    var scaleRate=curW/targetW;

    if(scaleRate>1){
        scaleRate=1;
    }

    $(".slide-head").css({
        "-webkit-transform":"scale("+scaleRate+")",
        "transform":"scale("+scaleRate+")"
    });

    $(".slide-header-index").css({
        "-webkit-transform":"scale("+scaleRate+")",
        "transform":"scale("+scaleRate+")"
    });
    $(".slide-head-list").css({
        "-webkit-transform":"scale("+scaleRate+")",
        "transform":"scale("+scaleRate+")"
    });

    var fontScaleSize=14*scaleRate<10?(10/scaleRate):14;
    $(".slide-head").find("p").css("font-size",(fontScaleSize)+"px");
    $(".section-list-title").css("font-size",(fontScaleSize)+"px");

    var contentScaleRate=fontScaleSize*scaleRate/12;
    if(contentScaleRate>1){
        contentScaleRate=1;
    }
    console.log("contentScaleRate============="+contentScaleRate);
    var contentWidth=curW/contentScaleRate;
    $(".content-main").css({
        "min-width":contentWidth+"px",
        "-webkit-transform":"scale("+contentScaleRate+")",
        "transform":"scale("+contentScaleRate+")",
       //"font-size":
    });
    $("#section-0 .slide-head").css({
        "-webkit-transform":"scale("+contentScaleRate+")",
        "transform":"scale("+contentScaleRate+")"
    })
}
