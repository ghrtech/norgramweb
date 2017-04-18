/**
 * Created by whobird on 17/4/10.
 */
var winResizeDuration=null;

$(document).ready(function(){
    if(!IsPC()){
        window.location="./index_mobile.html";
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

        requestAnimationFrame(function(){
            if(curIndex<0){
                curIndex=0;
                $(".section-slide").each(function(i,e){
                    if(i>curIndex){
                        $(this).css("width","20%").removeClass("active");
                    }else{
                        $(this).css("width","50%").addClass("active");
                    }
                });
            }
            if(curIndex>=(slideCount-1)){
                curIndex=slideCount-1;
                //console.log(">=slide count -1===================")
                //最后一张动画要反向；
                //console.log("translate3d("+(-20*(curIndex-2))+"%, 0px, 0px)");
                $(".section-wrapper").css({
                    "transform": "translate3d("+(-50*(curIndex-2))+"%, 0px, 0px)",
                })
                tweenAnim.setBox(curIndex,-1);

                $(".section-slide").removeClass("active");
                $("#section-"+(curIndex-1)).css("width","20%");
                $("#section-"+(curIndex-2)).css("width","20%");
                $("#section-"+curIndex).addClass("active").css("width","50%");

                $(".section-slide").each(function(i,e){
                    if(i<curIndex){
                        if(i==(curIndex-1)||i==(curIndex-2)){
                            $(this).css("width","20%").removeClass("active");
                        }else{
                            $(this).css("width","50%").removeClass("active");
                        }

                    }else{
                        $(this).css("width","50%").addClass("active");
                    }
                });
            }else{
                //console.log("curIndex:"+curIndex);
                //console.log("translate3d("+(-20*curIndex)+"%, 0px, 0px)");
                $(".section-wrapper").css({
                    "transform": "translate3d("+(-50*curIndex)+"%, 0px, 0px)",
                });

                tweenAnim.setBox(curIndex,0);
                $(".section-slide").each(function(i,e){
                    if(i>curIndex){
                        $(this).css("width","20%").removeClass("active");
                    }else{
                        $(this).css("width","50%").removeClass("active");
                    }
                });

                $("#section-"+curIndex).addClass("active");
            }

            // $(".section-slide").removeClass("active").css("width","20%");
            console.log("set translate===============");
        });

        clearTimeout(checkPositionWorker);
        checkPositionWorker=null;
    };

    var halfRate=0.1;
    var mySwiper = new Swiper('.swiper-container', {
       // slidesPerView: 3.2,

        freeMode:true,
        freeModeMomentum:true,
       /* freeModeMomentumBounce : true,
        freeModeMomentumBounceRatio:10,*/

        slidesPerView: 'auto',
        observer:true,
        observerParents:true,
        mousewheelControl:true,
        mousewheelSensitivity :1.2,
        watchSlidesProgress : true,
        touchRatio:3,
        //shortSwipes:false,
        //threshold : 100,
        /*freeModeSticky:true,
        freeModeMomentumBounce : true,
        freeModeMomentumBounceRatio:10,*/
        grabCursor : true,

        onProgress: function(swiper, progress){
            //console.log(mySwiper.realIndex);
           /* console.log("**********************************************************************");
            console.log("progress===========================");
            console.log("progress:"+progress);
            console.log("lastProgress:"+lastProgress);*/
            //console.log(mySwiper.realIndex);

            //根据 progress 计算当前的index
            var indexRate=100/(slideCount-1);
            var index=Math.round(progress*100/indexRate)||0;
            if(index<0){index=0;}
            if(index>=(slideCount-1)){
                index=slideCount-1;
                //最后一张动画要反向；
                var indexProgress=swiper.slides[index].progress;
                if(indexProgress >0){
                    var rate=halfRate;
                }else{
                    var rate=2-halfRate;
                }
                $(".section-wrapper").css({
                  //  "transform": "translate3d("+((-50*(index-2))-(20*indexProgress) )+"%, 0px, 0px)

                    "transform": "translate3d("+((-50*(index-2))+(20*indexProgress)*rate )+"%, 0px, 0px)",

                    "-webkit-transition-timing-function":"ease-out",
                    "-ms-transition-timing-function":"ease-out",
                    "transition-timing-function":"ease-out"
                });


            }else if(index==(slideCount-2)){
                var indexProgress=swiper.slides[index].progress;
                //console.log("translate3d:"+((-20*(index))-(20*(indexProgress)) )+" %");
                //倒数第二张情况分两种
                if(indexProgress >0){
                    var rate=halfRate;
                }else{
                    var rate=2-halfRate;
                }
                if(indexProgress>0){
                    //当前slide移走 时，最后一张进入，动画要反向
                    $(".section-wrapper").css({
                        "transform": "translate3d("+((-50*(index))+(20*indexProgress)*rate  )+"%, 0px, 0px)",
                        "-webkit-transition-timing-function":"ease-in",
                        "-ms-transition-timing-function":"ease-in",
                        "transition-timing-function":"ease-in"
                    });
                }else if(indexProgress<0){
                    //当前slide 移过来

                    $(".section-wrapper").css({
                        "transform": "translate3d("+((-50*(index))-(50*indexProgress)*rate  )+"%, 0px, 0px)",

                        "-webkit-transition-timing-function":"ease-out",
                        "-ms-transition-timing-function":"ease-out",
                        "transition-timing-function":"ease-out"

                    });
                }

            }else{
                var indexProgress=swiper.slides[index].progress;
                if(indexProgress >0){
                    var rate=halfRate;
                }else{
                    var rate=2-halfRate;
                }
                //console.log("translate3d:"+((-20*(index))-(20*(indexProgress)) )+" %");
                if(indexProgress>0){
                    $(".section-wrapper").css({
                        "transform": "translate3d("+((-50*(index))-(50*indexProgress)*rate  )+"%, 0px, 0px)",

                        "-webkit-transition-timing-function":"ease-in",
                        "-ms-transition-timing-function":"ease-in",
                        "transition-timing-function":"ease-in"

                    });
                }else{
                    $(".section-wrapper").css({
                        "transform": "translate3d("+((-50*(index))-(50*indexProgress) * rate )+"%, 0px, 0px)",

                        "-webkit-transition-timing-function":"ease-out",
                        "-ms-transition-timing-function":"ease-out",
                        "transition-timing-function":"ease-out"

                    });
                }
              /*  $(".section-wrapper").css({
                    "transform": "translate3d("+((-50*(index))-(50*indexProgress)  )+"%, 0px, 0px)",
                });*/

            }

            curIndex=index;
            //console.log("indexprogress==========================")
            //console.log(indexProgress);
          /*  if(indexProgress >0){
                var rate=halfRate;
            }else{
                var rate=2-halfRate;
            }*/

            if(index>0 && index<slideCount-2){

                if(indexProgress>0){
                    //当前slide移走
                    var $curSection=$("#section-"+index);
                    var $targetSection=$("#section-"+(index+1));
                    //这里移走元素不改变

                   // $targetSection.css("width",(20+30*indexProgress)+"%");

                    $targetSection.css({
                        "width":(20+30*indexProgress*rate)+"%",
                        "-webkit-transition-timing-function":"ease-in",
                        "-ms-transition-timing-function":"ease-in",
                        "transition-timing-function":"ease-in"

                    });

                    //console.log("(0.5-indexProgress)*2*100)==="+(0.5-indexProgress)*2*100);

                   // tweenAnim.update(curIndex,indexProgress,0);
                    tweenAnim.update(curIndex+1,indexProgress,1);
                }else if(indexProgress<0){
                    //当前slide 移过来
                    var $curSection=$("#section-"+index);
                    $curSection.css({
                        "width":(50+30*indexProgress*rate)+"%",
                        "-webkit-transition-timing-function":"ease-out",
                        "-ms-transition-timing-function":"ease-out",
                        "transition-timing-function":"ease-out"
                    });

                    tweenAnim.update(curIndex,indexProgress,0);

                }
            }else if(index==0){
                //index＝＝0只处理slide移走情况
                if(indexProgress>0){
                    var $curSection=$("#section-"+index);
                    var $targetSection=$("#section-"+(index+1));

                    //$targetSection.css("width",(20+30*indexProgress)+"%");

                    $targetSection.css({
                        "width":(20+30*indexProgress*rate)+"%",
                        "-webkit-transition-timing-function":"ease-in",
                        "-ms-transition-timing-function":"ease-in",
                        "transition-timing-function":"ease-in"

                    });

                    //tweenAnim.update(curIndex,indexProgress);
                    tweenAnim.update(curIndex+1,indexProgress,1);
                }
            }else if(index ==(slideCount-2)){
                if(indexProgress>0){
                    var $curSection=$("#section-"+index);
                    var $targetSection=$("#section-"+(index+1));
                    var $prevSection=$("#section-"+(index-1));

                    $targetSection.css({
                        "width":(20+30*indexProgress*rate)+"%",
                        "-webkit-transition-timing-function":"ease-in",
                        "-ms-transition-timing-function":"ease-in",
                        "transition-timing-function":"ease-in"
                    });
                    $prevSection.css({
                        "width":(50-30*indexProgress*rate)+"%",
                        "-webkit-transition-timing-function":"ease-in",
                        "-ms-transition-timing-function":"ease-in",
                        "transition-timing-function":"ease-in"
                    });
                    $curSection.css({
                        "width":(50-30*indexProgress*rate)+"%",
                        "-webkit-transition-timing-function":"ease-in",
                        "-ms-transition-timing-function":"ease-in",
                        "transition-timing-function":"ease-in"
                    });

                    //tweenAnim.update(curIndex,indexProgress);
                    tweenAnim.update(curIndex,indexProgress,0);
                    tweenAnim.update(curIndex-1,indexProgress,0);
                    tweenAnim.update(curIndex+1,indexProgress,1);
                   // tweenAnim.update(curIndex-1,indexProgress,-1);

                }else{
                    //当前slide 移过来
                    var $curSection=$("#section-"+index);
                    var $targetSection=$("#section-"+(index-1));

                    $curSection.css({
                        "width":(50+30*indexProgress*rate)+"%",
                        "-webkit-transition-timing-function":"ease-out",
                        "-ms-transition-timing-function":"ease-out",
                        "transition-timing-function":"ease-out"
                    });
                    tweenAnim.update(curIndex,indexProgress,0);
                }
            } else if(index==(slideCount-1)){
                //最后一张考虑 slide 移过来
                if(indexProgress<0){
                    //当前slide 移过来
                    var $curSection=$("#section-"+index);
                    var $targetSection=$("#section-"+(index-1));
                    var $prevTarget=$("#section-"+(index-2));

                    $curSection.css({
                        "width":(50+30*indexProgress*rate)+"%",
                        "-webkit-transition-timing-function":"ease-out",
                        "-ms-transition-timing-function":"ease-out",
                        "transition-timing-function":"ease-out"
                    });
                    $targetSection.css({
                        "width":(20-30*indexProgress*rate)+"%",
                        "-webkit-transition-timing-function":"ease-out",
                        "-ms-transition-timing-function":"ease-out",
                        "transition-timing-function":"ease-out"
                    });
                    $prevTarget.css({
                        "width":(20-30*indexProgress*rate)+"%",
                        "-webkit-transition-timing-function":"ease-out",
                        "-ms-transition-timing-function":"ease-out",
                        "transition-timing-function":"ease-out"
                    });

                    tweenAnim.update(curIndex,indexProgress,0);
                    tweenAnim.update(curIndex-1,indexProgress,-2);
                    tweenAnim.update(curIndex-2,indexProgress,-3);
                }
            }

            clearTimeout(checkPositionWorker);
            checkPositionWorker=null;

            if(!checkPositionWorker){
                //console.log("timeout=============");
                checkPositionWorker=setTimeout(setPosition,100);
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

  /*  var winResizeDuration=null;
    $(window).on("resize",function(e){
      /!*  if(winResizeDuration !==null){

        }*!/
        if(!winResizeDuration){
            winResizeDuration=setTimeout(setBottom,300);
        }

    });*/


     $(window).on("resize",function(e){
     /*  if(winResizeDuration !==null){

     }*/
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
    setImageWidth();
}
function setBottom(){
    //计算底部比例,保证底部放大时正好触底
    var w=parseFloat($(".section-slide.active").css("width"));
    var h=parseFloat($("body").css("height"));

    var imageRate=(1000/1980)//根据设计稿

    var bottomPercent=(w-22)*imageRate/h;
    //console.log("bottom precent=======")
    //console.log(bottomPercent);
    $(".slide-content-set").css("height",bottomPercent*100+"%");
    //$(".slide-head").css("height",(1-bottomPercent)*100+"%");

    /*
    if(winResizeDuration){
        clearTimeout(winResizeDuration);
        winResizeDuration=null;
    }
    */
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

function setImageWidth(){
   var targetWidth= parseInt($("#slide-1 .col-50").css("width"))-20;
   var imageWidth= parseInt($("#slide-1 .col-20").css("width"))-20;

   var targetHeight=targetWidth*1000/1980;
    var imageHeight=imageWidth*1000/1980;
    $(".section-slide img.lazy").css({
            "width":imageWidth+"px",
           // "left":(-1)*imageWidth/2+"px"
            "right":"10px"
        }).data({
            "start":imageWidth,
            "end":targetWidth
    });
    $(".section-slide .img-wrapper").css({
        "height":imageHeight+"px"
    })
    $(".section-slide.active img.lazy").css({
       "width":targetWidth+"px",
       // "left":(-1)*targetWidth/2+"px"
        "right":"10px"
   });
    $(".section-slide.active .img-wrapper").css({
        "height":targetHeight+"px"
    })

    //reset imagedata parmas
    tweenAnim.init();
}
