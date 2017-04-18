/**
 * Created by whobird on 17/4/13.
 */
var tweenAnim=(function($,ta){
    var tweenAnim=ta;

    tweenAnim.setBox=function(i,current){
        //当前页面 -1＝＝最后一张

        var opacity=0;
        var params={translate:0,opacity:opacity,opacityReverse:0.2,}
        var $box,$box1,$box2;
        var listTop=75,listOpt=1;

        $boxAll=$(".section-slide");

        $boxAll.find(".slide-header-index").css("top",0);
        $boxAll.find(".index-en").css("opacity",0.2);
        $boxAll.find(".index-num").css("opacity",0.2);
        $boxAll.find(".content-main").css({
            "opacity":1,
        });
        $boxAll.find(".section-list-title").css({
            "opacity":0,
            "-ms-transform":"translate3d(0,0,0)",
            "-webkit-transform":"translate3d(0,0,0)",
            "transform":"translate3d(0,0,0)",
        });

        if(i<=1){
            if(i==0){
               var opacity=1;
                var listTop=0;
                var listOpt=0;
                var listTop=0;
                var listOpt=0;
            }else{
                var opacity=0;
                var listTop=75;
                var listOpt=1;
                var listTop2=0;
                var listOpt2=0;
            }


            $box=$("#section-1");
            $box.find(".slide-header-index").css("top",params.translate);
            $box.find(".index-en").css("opacity",params.opacityReverse);
            $box.find(".index-num").css("opacity",params.opacityReverse);
            $box.find(".content-main").css({
                "opacity":opacity,
            });
            $box.find(".section-list-title").css({
                "opacity":listOpt,
                "-ms-transform":"translate3d(0,-"+listTop+"px,0)",
                "-webkit-transform":"translate3d(0,-"+listTop+"px,0)",
                "transform":"translate3d(0,-"+listTop+"px,0)",
            });

            $box2=$("#section-2");
            $box2.find(".slide-header-index").css("top",params.translate);
            $box2.find(".index-en").css("opacity",params.opacityReverse);
            $box2.find(".index-num").css("opacity",params.opacityReverse);
            $box2.find(".content-main").css({
                "opacity":1,
            });
            $box2.find(".section-list-title").css({
                "opacity":listOpt2,
                "-ms-transform":"translate3d(0,-"+listTop2+"px,0)",
                "-webkit-transform":"translate3d(0,-"+listTop2+"px,0)",
                "transform":"translate3d(0,-"+listTop2+"px,0)",
            });

            return;
        }else if(current==-1){
            //最后一张设置前两张
            $box=$("#section-"+i);
            $box1=$("#section-"+(i-1));
            $box2=$("#section-"+(i-2));

            $box.find(".slide-header-index").css("top",params.translate);
            $box.find(".index-en").css("opacity",params.opacityReverse);
            $box.find(".index-num").css("opacity",params.opacityReverse);
            $box.find(".content-main").css({
                "opacity":params.opacity,
            });

            $box.find(".section-list-title").css({
                "opacity":1,
                "-ms-transform":"translate3d(0,-"+listTop+"px,0)",
                "-webkit-transform":"translate3d(0,-"+listTop+"px,0)",
                "transform":"translate3d(0,-"+listTop+"px,0)",
            });


            $box1.find(".slide-header-index").css("top",params.translate);
            $box1.find(".index-en").css("opacity",params.opacityReverse);
            $box1.find(".index-num").css("opacity",params.opacityReverse);
            $box1.find(".content-main").css({
                "opacity":1,
            });

            $box1.find(".section-list-title").css({
                "opacity":0,
                "-ms-transform":"translate3d(0,0,0)",
                "-webkit-transform":"translate3d(0,0,0)",
                "transform":"translate3d(0,0,0)",
            });


            $box2.find(".slide-header-index").css("top",params.translate);
            $box2.find(".index-en").css("opacity",params.opacityReverse);
            $box2.find(".index-num").css("opacity",params.opacityReverse);
            $box2.find(".content-main").css({
                "opacity":1,
            });

            $box2.find(".section-list-title").css({
                "opacity":0,
                "-ms-transform":"translate3d(0,0,0)",
                "-webkit-transform":"translate3d(0,0,0)",
                "transform":"translate3d(0,0,0)",
            });


        }else{
            $box=$("#section-"+i);
            $box1=$("#section-"+(i-1));
            $box2=$("#section-"+(i+1));

            $box.find(".slide-header-index").css("top",params.translate);
            $box.find(".index-en").css("opacity",params.opacityReverse);
            $box.find(".index-num").css("opacity",params.opacityReverse);
            $box.find(".content-main").css({
                "opacity":params.opacity,
            });

            console.log("list-top==============="+listTop)
            $box.find(".section-list-title").css({
                "opacity":1,
                "-ms-transform":"translate3d(0,-"+listTop+"px,0)",
                "-webkit-transform":"translate3d(0,-"+listTop+"px,0)",
                "transform":"translate3d(0,-"+listTop+"px,0)",
            });


            $box1.find(".slide-header-index").css("top",params.translate);
            $box1.find(".index-en").css("opacity",params.opacityReverse);
            $box1.find(".index-num").css("opacity",params.opacityReverse);
            $box1.find(".content-main").css({
                "opacity":0,
            });

            $box1.find(".section-list-title").css({
                "opacity":0,
                "-ms-transform":"translate3d(0,0,0)",
                "-webkit-transform":"translate3d(0,0,0)",
                "transform":"translate3d(0,0,0)",
            });


            $box2.find(".slide-header-index").css("top",params.translate);
            $box2.find(".index-en").css("opacity",params.opacityReverse);
            $box2.find(".index-num").css("opacity",params.opacityReverse);
            $box2.find(".content-main").css({
                "opacity":1,
            });
            $box2.find(".section-list-title").css({
                "opacity":0,
                "-ms-transform":"translate3d(0,0,0)",
                "-webkit-transform":"translate3d(0,0,0)",
                "transform":"translate3d(0,0,0)",
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

        console.log(curOpt)

        var params={translate:0,opacity:1,opacityReverse:0.2}
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
            }if(time<0){
                //time 0>-.5
                //最后一张反向运动
                var top =  75+  +(time)*150 + 'px';//=>0
                var opacityReverse=0.6+time*2*0.4;//=>.2
                var opacity=-2*time;//=>1
                var listTop=0;
                var listOpt=0;
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
                }else{
                    var opacity=0;
                    var listTop=75;
                    var listOpt=1;
                }

            }

        }
      /*  var top =   params.translate +(-time)*150 + 'px';
        var opacityReverse=params.opacityReverse+time*2*0.4;
        var opacity=params.opacity+(time*2);
        console.log($box);
*/
        $box.find(".slide-header-index").css("top",top);
        $box.find(".index-en").css("opacity",opacityReverse);
        $box.find(".index-num").css("opacity",opacityReverse);
        $box.find(".content-main").css({
            "opacity":opacity,
           /* "-ms-transform":"translateY("+top+"px)",
            "-webkit-transform":"translateY("+top+"px)",
            "transform":"translateY("+top+"px)"*/
        });
        // s.transform = transform;

        $box.find(".section-list-title").css({
            "opacity":listOpt,
            "-ms-transform":"translate3d(0,-"+listTop+"px,0)",
            "-webkit-transform":"translate3d(0,-"+listTop+"px,0)",
            "transform":"translate3d(0,-"+listTop+"px,0)",
        });
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

