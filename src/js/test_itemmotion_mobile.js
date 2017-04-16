/**
 * Created by whobird on 17/4/10.
 */
var winResizeDuration=null;

$(document).ready(function(){

    //project init
    //start
    $("img.lazy").lazyload({
        event : "sporty",
        effect : "fadeIn"
    });

    var bodyWidth=parseInt($("body").css("width"));
    console.log(bodyWidth)
    $(".section-slide").css("width",(bodyWidth-40)+"px");
    $(".section-wrapper").css("width",(bodyWidth-40)*9+"px");

    setPage(bodyWidth-40);

    $('#preloader').delay(350).fadeOut(function(){
        $("img.lazy").trigger("sporty");
    });

    var slideCount=$(".section-wrapper").find(".section-slide").length;
    console.log(slideCount);
    var curIndex=0;
    var curIndexProgress=0;
    var lastProgress=0;

    var checkPositionWorker=null;
    $(".nav-btn").on("click",function(e){
       $(".main").toggleClass("nav-active");

    });



});

function setPage(w){
    //setBottom(w);
    setScale(w);
}
function setBottom(w){
    //计算底部比例,保证底部放大时正好触底
    var w=w;
    var h=parseFloat($("body").css("height"));
    console.log(w);
    var imageRate=(1000/1980)//根据设计稿
    console.log(h);

    var bottomPercent=(w-22)*imageRate/h;
    console.log("bottom precent=======")
    console.log(bottomPercent);
    $(".slide-content-set").css("height",bottomPercent*100+"%");
    //$(".slide-head").css("height",(1-bottomPercent)*100+"%");


}
function setScale(w){
    var curW=w;
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

    var contentScaleRate=fontScaleSize*scaleRate/12;
    if(contentScaleRate>1){
        contentScaleRate=1;
    }
    console.log("contentScaleRate============="+contentScaleRate);
    var contentWidth=curW/contentScaleRate;
    $(".content-main").css({

        "-webkit-transform":"scale("+scaleRate+")",
        "transform":"scale("+scaleRate+")",
       //"font-size":
    });
    $("#section-0 .slide-head").css({
        "-webkit-transform":"scale("+contentScaleRate+")",
        "transform":"scale("+contentScaleRate+")"
    })
}
