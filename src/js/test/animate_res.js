/**
 * Created by whobird on 17/4/13.
 */
var tweenAnim=(function($,ta){
    var tweenAnim=ta;
    var tween_items=[];
    var curIndex;
    //tweenAnim.elemDist=[];

    tweenAnim.register=function(){
        $(".swiper-slide").each(function(i,$e){
            //tweenAnim.elemDist[i]=$e;
           if(i==0){

           }else{
               tween_items[i] = new TWEEN.Tween({translate:0,opacity:1,opactiyReverse:0.2} )
                   .to( { translate: 150,opacity:0,opacityReverse:0.6 },1000 )
                   .repeat( Infinity )
                   .delay( 1000*i )
                   .onUpdate( function() {
                       updateBox(this);
                   })
                   .start()
           }
        });
    };
    tweenAnim.start=function(i){
        tween_items[i].start();
    };
    tweenAnim.stop=function(){
        $.each(tween_items,function(i,e){
            e.stop();
        })
    };

    function updateBox(params) {
        //console.log("top=======")
        $box=$("#section-"+curIndex);
        var top =   params.translate  + 'px';

        var opacityReverse=params.opacityReverse;
        var opacity=params.opacity*2;
        console.log($box);
        $box.find(".slide-header-index").css("top",top);
        $box.find(".index-en").css("opacity",opacityReverse);
        $box.find(".index-num").css("opacity",opacityReverse);

        $box.find(".content-main").css({
            "opacity":opacity,
            "-ms-transform":"translateY("+top+"px)",
            "-webkit-transform":"translateY("+top+"px)",
            "transform":"translateY("+top+"px)"
        });
        // s.transform = transform;
    };

    tweenAnim.update=function(i,time){
        var t=i*1000+time;
        curIndex=i;
        console.log("=========i:"+i);
        TWEEN.update(t);
    };

    tweenAnim.init=function(){
        tweenAnim.register();
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

