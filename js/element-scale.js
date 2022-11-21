// 地图进行缩放的时候监听该函数, 也就是点击的时候缩放
// 定义上一次的缩放倍数
let prevZoom = map.getZoom();
map.on('zoomend', function () {
  var amapInfVis = $('.amap-info').css('display')
  if (amapInfVis === 'block') {
    // 非手机端
    if (!isMobile()) {
      // var currZoom = map.getZoom();
      // var currContentWidth = Number($('.amap-info-content').css('width').replace('px', ''));
      // if (currZoom > prevZoom) {
      //   $('.amap-info-content').css({ width: currContentWidth + 40 + 'px' })
      // } else {
      //   $('.amap-info-content').css({ width: currContentWidth - 80 + 'px' })
      // }
      // prevZoom = currZoom;
    }
  }
});