// JavaScript Document

//判断是pc还是移动端
$(function () {
  function IsPC () {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }

  //自适应不同宽高rem
  function setRem (window, document) {
    var html = document.documentElement;//返回html元素
    function refreshRem () {

      var width = document.documentElement.clientWidth;
      var height = document.documentElement.clientHeight;
      var wW;
      if (IsPC()) {

        wW = html.clientWidth;
      } else {
        if (width >= height) {////判断是移动端横屏
          wW = html.clientWidth
        } else {        //竖屏
          wW = html.clientHeight
        }
      }
      var rem = wW * 100 / 3840;
      html.style.fontSize = rem + 'px';
    }
    refreshRem()
    // window.addEventListener('resize', refreshRem)
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        refreshRem()
      }
    })
  }

  function detectOrient () {
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    var wrapper = document.body;//document.body 属性返回 <body> 元素， document.documentElement 属性返回 <html> 元素。
    var style1 = "";
    if (IsPC()) {
      $('.bodyBg').removeClass('isMobile')
      setRem(window, document)
      $('.footer').css('bottom', '0')
    } else {
      if (width >= height) { // 横屏
        $('.bodyBg').removeClass('isMobile')
        setRem(window, document)
        style1 += "width:" + width + "px;";
        style1 += "height:" + height + "px;";
        style1 += "-webkit-transform: rotate(0); transform: rotate(0);";
        style1 += "-webkit-transform-origin: 0 0;";
        style1 += "transform-origin: 0 0;";
      } else { // 竖屏
        setRem(window, document)
        style1 += "width:" + height + "px;";// 注意旋转后的宽高切换
        style1 += "height:" + width + "px;";
        // 注意旋转中点的处理
        style1 += "-webkit-transform-origin: " + width + "px " + width + "px;";
        style1 += "transform-origin: " + width / 2 + "px " + width / 2 + "px;";
        style1 += "overflow: scroll";
        style1 += "-webkit-transform: rotate(90deg); transform: rotate(90deg);";
      }
      wrapper.style.cssText = style1;
    }
  }
  window.onresize = detectOrient();
  $(window).resize(function () {
    detectOrient();
  })
})