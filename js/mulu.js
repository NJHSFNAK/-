$(function(){
    //目录展开和关闭
    $(".catalogBtn").click(function(){
        if($(this).hasClass("closeCatalog")){
            $(".catalogBox").css({"opacity":"1","filter":"Alpha(opacity=100)"})
            $(this).removeClass("closeCatalog")
            $(this).parent().animate({"right":"0"},500)
        } else{
            $(this).addClass("closeCatalog")
            $(this).parent().animate({"right":"-546px"},500)
            setTimeout(function(){
                $(".catalogBox").css({"opacity":"0","filter":"Alpha(opacity=0)"})
            },400)
        }
    })

    //省市区域弹层展开和关闭
    $(".jsPic").click(function(){
        $(".cityName,.openArea").fadeIn()
    })
    $(".closeMask").click(function(){
        $(".cityName,.openArea").fadeOut()
    })
    // 三级菜单
    muliNavShow()
    function muliNavShow(){
        $('.muluNav span').each(function(index){
            $('.muluNav span').eq(index).click(function(event){
                event.stopPropagation();
                if(index == '0'){
                    $(this).siblings().removeClass("active")
                    $('.catalogBox .ul2').addClass('none')
                    $('.catalogBox .ul3').addClass('none')
                }else if(index == '1'){
                    $('.muluNav span').eq(1).addClass('active')
                    $('.muluNav span').eq(2).removeClass("active")
                    $('.catalogBox .ul2').removeClass('none')
                    $('.catalogBox .ul3').addClass('none')
                }else if(index == '2'){
                    $('.muluNav span').addClass('active')
                    $('.catalogBox .ul2').removeClass('none')
                    $('.catalogBox .ul3').removeClass('none')
                }
            })
        })
    }
})