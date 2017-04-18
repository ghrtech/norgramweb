/**
 * Created by whobird on 17/4/13.
 */
var tweenAnim=(function($,ta){
    var tweenAnim=ta;
    var halfRate=0.6;
    var params={translate:0,opacity:1,opacityReverse:0.2};
    tweenAnim.init=function(){
        var start= parseInt($("#slide-1 .col-20").css("width"))-20;
        var end= parseInt($("#slide-1 .col-50").css("width"))-20;

        params.imageStart=start;
        params.imageEnd=end;
        params.offset=params.imageEnd-params.imageStart;

        params.heightStart=start*1000/1980;
        params.heightEnd=end*1000/1980;

        console.log("parmas===================")
        console.log(params);
    };
    tweenAnim.setBox=function(i,current){
        //当前页面 -1＝＝最后一张

        var opacity=0;
        params.opacity=opacity;
        var listTop=75,listOpt=1;

        if(current==-1){
            //最后一张设置前两张

            var index=i;
            $(".section-slide").each(function(i,e){
                if(i==index-1 || i== index-2){
                    $(this).find(".slide-header-index").css("top",params.translate);
                    $(this).find(".index-en").css("opacity",params.opacityReverse);
                    $(this).find(".index-num").css("opacity",params.opacityReverse);
                    $(this).find(".content-main").css({
                        "opacity":1,
                    });

                    $(this).find(".section-list-title").css({
                        "opacity":0,
                        "-ms-transform":"translate3d(0,0,0)",
                        "-webkit-transform":"translate3d(0,0,0)",
                        "transform":"translate3d(0,0,0)",
                    });
                    $(this).find(" .img-wrapper").css({
                        "height":params.heightStart+"px",
                    });
                    $(this).find(" img.lazy").css({
                        "width":params.imageStart+"px",
                        // "left":(-1)*params.imageStart/2+"px"
                    });

                }else{
                    $(this).find(".slide-header-index").css("top",params.translate);
                    $(this).find(".index-en").css("opacity",params.opacityReverse);
                    $(this).find(".index-num").css("opacity",params.opacityReverse);
                    $(this).find(".content-main").css({
                        "opacity":params.opacity,
                    });

                    $(this).find(".section-list-title").css({
                        "opacity":1,
                        "-ms-transform":"translate3d(0,-"+listTop+"px,0)",
                        "-webkit-transform":"translate3d(0,-"+listTop+"px,0)",
                        "transform":"translate3d(0,-"+listTop+"px,0)",
                    });
                    $(this).find(" .img-wrapper").css({
                        "height":params.heightEnd+"px",
                    });
                    $(this).find(" img.lazy").css({
                        "width":params.imageEnd+"px",
                        //  "left":(-1)*params.imageEnd/2+"px"
                    });
                }
            })

        }else{
            var index=i;
            $(".section-slide").each(function(i,e){
                if(i>index){
                    $(this).find(".slide-header-index").css("top",params.translate);
                    $(this).find(".index-en").css("opacity",params.opacityReverse);
                    $(this).find(".index-num").css("opacity",params.opacityReverse);
                    $(this).find(".content-main").css({
                        "opacity":1,
                    });

                    $(this).find(".section-list-title").css({
                        "opacity":0,
                        "-ms-transform":"translate3d(0,0,0)",
                        "-webkit-transform":"translate3d(0,0,0)",
                        "transform":"translate3d(0,0,0)",
                    });
                    $(this).find(" .img-wrapper").css({
                        "height":params.heightStart+"px",
                    });
                    $(this).find(" img.lazy").css({
                        "width":params.imageStart+"px",
                        // "left":(-1)*params.imageStart/2+"px"
                    });

                }else{

                    $(this).find(".slide-header-index").css("top",params.translate);
                    $(this).find(".index-en").css("opacity",params.opacityReverse);
                    $(this).find(".index-num").css("opacity",params.opacityReverse);

                    if(i==0){
                        $(this).find(".content-main").css({
                            "opacity":1,
                        });
                    }else{
                        $(this).find(".content-main").css({
                            "opacity":params.opacity,
                        });

                    }

                    $(this).find(".section-list-title").css({
                        "opacity":1,
                        "-ms-transform":"translate3d(0,-"+listTop+"px,0)",
                        "-webkit-transform":"translate3d(0,-"+listTop+"px,0)",
                        "transform":"translate3d(0,-"+listTop+"px,0)",
                    });
                    $(this).find(" .img-wrapper").css({
                        "height":params.heightEnd+"px",
                    });
                    $(this).find(" img.lazy").css({
                        "width":params.imageEnd+"px",
                        //  "left":(-1)*params.imageEnd/2+"px"
                    });
                }
            });
        }
    };
    function updateBox(i,time,prev) {
        //console.log("top=======")
        //第一个slide 不操作；
        console.log("update box");
        if(i==0){return;}
        console.log(prev);
        if(prev<=-1){
            //当前正向移动
            //反向倒数第一张
            //反向倒数第二张；
            //prev=-2||prev=-3
            var curOpt="prev";
        }else if(prev==1){
            var curOpt="next";
        }else{
            var curOpt="current";
        }

        console.log(curOpt);

        if(time >0){
            var rate=halfRate;
        }else{
            var rate=2-halfRate;
        }

        $box=$("#section-"+i);

        if(curOpt=="current"){
            if(time>0){
                //当前slide移走0>0.5
                //var top =   params.translate +(time)*150 + 'px';//=>75
                var top=0
                var listTop=75;
                var listOpt=1;
                var opacityReverse=params.opacityReverse//.6
                //底部文字opacity=0;
                var opacity=0;//=>0.5

                var imageSize=params.imageEnd-time*params.offset*rate;

            }
            if(time<0){
                //当前slide移入 －0。5>0
                var top =   params.translate +(-1)*(time)*150 + 'px';//=>0
                var listTop=75+(time)*150;

                var listOpt=1+time*2;
                var opacityReverse=params.opacityReverse +(-1)*time*2*0.4;//=>.2
                //底部文字opacity>0;
                var opacity=0;//=>0.5

                //
                var imageSize=params.imageEnd+time*params.offset*rate;
            }
        }if(curOpt=="next"){
            if(time>0){
                console.log("next=====================")
                console.log(time)
            //slide移入0>0.5
                var top =   params.translate +(time)*150 + 'px';//=>0
                var opacityReverse=params.opacityReverse +time*2*0.4;//=>.2

                var listTop=0;
                var listOpt=0;
                //底部文字opacity>0;
                var opacity=params.opacity-2*time;//=>0.5
                console.log("rate=========="+rate);
                var imageSize=params.imageStart+time*params.offset*rate;
            }if(time<0){
                //time 0>-.5
                //最后一张反向运动
                var top =  75+  +(time)*150 + 'px';//=>0
                var opacityReverse=0.6+time*2*0.4;//=>.2
                var opacity=-2*time;//=>1
                var listTop=0;
                var listOpt=0;

                var imageSize=params.imageEnd+time*params.offset*rate;
            }
        }if(curOpt=="prev") {
            if(time<0){
                //time -.5>0
                if(prev==-3){
                    var top =   params.translate;

                }else{
                    //var top =   params.translate +(-1)*(time)*150 + 'px';//=>0
                    var top=params.translate;
                }

                var opacityReverse=params.opacityReverse;
                if(prev==-3||prev==-2){
                    var opacity=params.opacity+time*2;
                    var listTop=0;
                    var listOpt=0;
                    var imageSize=params.imageStart-time*params.offset*rate;
                }else{
                    var opacity=0;
                    var listTop=75;
                    var listOpt=1;
                    var imageSize=params.imageStart-time*params.offset*rate;
                }

            }

        }

        var imageHeight=imageSize*1000/1980;

        if(time>0){
            $box.find(".slide-header-index").css({
                "top":top,
                "-webkit-transition-timing-function":"ease-in",
                "-ms-transition-timing-function":"ease-in",
                "transition-timing-function":"ease-in"
            });
            $box.find(".index-en").css({
                "opacity":opacityReverse,
                "-webkit-transition-timing-function":"ease-in",
                "-ms-transition-timing-function":"ease-in",
                "transition-timing-function":"ease-in"
            });
            $box.find(".index-num").css({
                "opacity":opacityReverse,
                "-webkit-transition-timing-function":"ease-in",
                "-ms-transition-timing-function":"ease-in",
                "transition-timing-function":"ease-in"
            });
            $box.find(".content-main").css({
                "opacity":opacity,
                "-webkit-transition-timing-function":"ease-in",
                "-ms-transition-timing-function":"ease-in",
                "transition-timing-function":"ease-in"
            });

            $box.find(".section-list-title").css({
                "opacity":listOpt,
                "-ms-transform":"translate3d(0,-"+listTop+"px,0)",
                "-webkit-transform":"translate3d(0,-"+listTop+"px,0)",
                "transform":"translate3d(0,-"+listTop+"px,0)",

                "-webkit-transition-timing-function":"ease-in",
                "-ms-transition-timing-function":"ease-in",
                "transition-timing-function":"ease-in"
            });
            $box.find(".img-wrapper").css({
                "height":imageHeight+"px",
                "-webkit-transition-timing-function":"ease-in",
                "-ms-transition-timing-function":"ease-in",
                "transition-timing-function":"ease-in"
            });
            $box.find("img.lazy").css({
                "width":imageSize+"px",
                "-webkit-transition-timing-function":"ease-in",
                "-ms-transition-timing-function":"ease-in",
                "transition-timing-function":"ease-in"
            })
        }else{
            $box.find(".slide-header-index").css({
                "top":top,
                "-webkit-transition-timing-function":"ease-out",
                "-ms-transition-timing-function":"ease-out",
                "transition-timing-function":"ease-out"
            });
            $box.find(".index-en").css({
                "opacity":opacityReverse,
                "-webkit-transition-timing-function":"ease-out",
                "-ms-transition-timing-function":"ease-out",
                "transition-timing-function":"ease-out"
            });
            $box.find(".index-num").css({
                "opacity":opacityReverse,
                "-webkit-transition-timing-function":"ease-out",
                "-ms-transition-timing-function":"ease-out",
                "transition-timing-function":"ease-out"
            });
            $box.find(".content-main").css({
                "opacity":opacity,
                "-webkit-transition-timing-function":"ease-out",
                "-ms-transition-timing-function":"ease-out",
                "transition-timing-function":"ease-out"
            });

            $box.find(".section-list-title").css({
                "opacity":listOpt,
                "-ms-transform":"translate3d(0,-"+listTop+"px,0)",
                "-webkit-transform":"translate3d(0,-"+listTop+"px,0)",
                "transform":"translate3d(0,-"+listTop+"px,0)",

                "-webkit-transition-timing-function":"ease-out",
                "-ms-transition-timing-function":"ease-out",
                "transition-timing-function":"ease-out"
            });
            $box.find(".img-wrapper").css({
                "height":imageHeight+"px",
                "-webkit-transition-timing-function":"ease-out",
                "-ms-transition-timing-function":"ease-out",
                "transition-timing-function":"ease-out"
            });
            $box.find("img.lazy").css({
                "width":imageSize+"px",
                "-webkit-transition-timing-function":"ease-out",
                "-ms-transition-timing-function":"ease-out",
                "transition-timing-function":"ease-out"
            })
        }
    };

    tweenAnim.update=function(i,time,prev){
        //var t=i*1000+time;
        updateBox(i,time,prev)
    };


    return tweenAnim;
})(jQuery,tweenAnim||{});

/*=======================================================*/
//init();
/*
var tween1;
function init() {
    var $target1 = $( '#section-1' ).find(".slide-header-index"),
        target1=$target1.get(0);
    tween1 = new TWEEN.Tween( target1.dataset )
        .to( { translate: 80 }, 10000)
        .repeat(0 )
        .easing(TWEEN.Easing.Cubic.InOut)
        .delay( 1000)
        .onUpdate( function() {
            console.log("update");
            updateBox( $target1, this );
        })
        .start()
}
//var count=0;
var ani;
function animate( time ) {
    ani=requestAnimationFrame( animate );

    TWEEN.update( time );
}
function setTranslate(time){
    console.log("set transition==========="+time)
    TWEEN.update(time);
}

function updateBox( $box, params ) {
    //console.log("top=======")
    var top =  Math.floor( params.translate ) + 'px';
    //console.log(top);
    console.log("=======$box")
    console.log($box);
    $box.css("top",top);
    // s.transform = transform;
}
*/

/*=======================================================*/

