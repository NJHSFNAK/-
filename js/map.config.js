var polygons = [];
var xCalc = 0;
var yCalc = 0;
function drawBounds(bounds) {
  map.remove(polygons); //清除上次结果
  polygons = [];
  if (bounds) {
    var outer = [
      new AMap.LngLat(-360, 90, true),
      new AMap.LngLat(-360, -90, true),
      new AMap.LngLat(360, -90, true),
      new AMap.LngLat(360, 90, true),
    ];
    var pathArray = [outer];
    /**
     * 多边形轮廓线的节点坐标数组，当为“环”多边形时（多边形区域在多边形内显示为“岛”），
     * path为二维数组，数组元素为多边形轮廓线的节点坐标数组“环”多边形时，
     * 要求数组第一个元素为外多边形，其余为“岛”多边形，外多边形需包含“岛”多边形，
     * 否则程序不作处理
     *
     * */
    pathArray.push.apply(pathArray, bounds);
    for (var i = 0, l = bounds.length; i < l; i++) {
      //生成行政区划polygon
      var polygon = new AMap.Polygon({
        strokeWeight: 1,
        path: bounds[i],
        fillOpacity: 0.4,
        fillColor: "#80d8ff",
        strokeColor: "#0091ea",
      });
      polygons.push(polygon);
    }
    //console.log(pathArray)
    var polygon = new AMap.Polygon({
      path: pathArray,
      // strokeColor: '#00eeff', //边框线颜色
      strokeWeight: 1,
      fillColor: "#13305B", //遮罩图层颜色
      fillOpacity: 0.1,
    });

    polygon.setPath(pathArray);
    console.log(pathArray[1]);
    map.add(polygon);
  }

  // map.setFitView(polygons) //视口自适应

  polygons.push(polygon);
}
// 计算坐标与地图之间比例
function posCalcLnglat(prevElement, nextElement) {
  // 将经纬度转换为像素
  var lnglat0 = new AMap.LngLat(prevElement.lnglat[0], prevElement.lnglat[1]);
  var pixel0 = map.lngLatToContainer(lnglat0); // 获得 Pixel 对象
  var lnglat1 = new AMap.LngLat(nextElement.lnglat[0], nextElement.lnglat[1]);
  var pixel1 = map.lngLatToContainer(lnglat1); // 获得 Pixel 对象
  // x,y缩放比例
  xCalc =
    Math.abs(pixel1.x - pixel0.x) /
    Math.abs(prevElement.pos[0] - nextElement.pos[0]);
  yCalc =
    Math.abs(pixel1.y - pixel0.y) /
    Math.abs(prevElement.pos[1] - nextElement.pos[1]);
  // 地图上距离上、下、左、右的边界的距离
  var mapTopDistance = prevElement.pos[1] * yCalc;
  var mapBottomDistance = prevElement.pos[3] * yCalc;
  var mapLeftDistance = prevElement.pos[0] * xCalc;
  var mapRightDistance = prevElement.pos[2] * xCalc;
  // 地图上、下、左、右的像素
  var mapTop = pixel0.y - mapTopDistance;
  var mapBottom = pixel0.y + mapBottomDistance;
  var mapLeft = pixel0.x - mapLeftDistance;
  var mapRight = pixel0.x + mapRightDistance;
  // 将像素转换为经纬度
  var lt = new AMap.Pixel(mapLeft, mapTop);
  var lngLT = map.containerToLngLat(lt);
  var rt = new AMap.Pixel(mapRight, mapTop);
  var lngRT = map.containerToLngLat(rt);
  var lb = new AMap.Pixel(mapLeft, mapBottom);
  var lngLB = map.containerToLngLat(lb);
  var rb = new AMap.Pixel(mapRight, mapBottom);
  var lngRB = map.containerToLngLat(rb);
  var bds = [[lngLT, lngRT, lngRB, lngLB]];
  drawBounds(bds);
}
// 定义需要的变量
// 起始x,y坐标，终点x,y坐标，前一个缩放比例
var sx, sy, ex, ey;
// 获取当前的中心点坐标,获取中心点到上、左边距离
var centerLngLat, centerPos;
// 当前地图的缩放比例
var mapZoom;
let mouseCount = 0;
let mouseMove = false;
var container = document.querySelector(".mapBox");
container.addEventListener(
  "touchstart",
  function (e) {
    var events = e.touches[0];
    // 起始位置
    sx = events.pageX;
    sy = events.pageY;
    centerLngLat = map.getCenter().toString().split(",");
    mapZoom = map.getZoom();
    centerPos = map.lngLatToPixel(
      [Number(centerLngLat[0]), Number(centerLngLat[1])],
      mapZoom
    );
    mouseMove = true;
    container.addEventListener(
      "touchmove",
      function (event) {
        moveFun(event);
      },
      false
    );
  },
  false
);
// 平移事件
function moveFun(event) {
  event.preventDefault();
  event.stopPropagation();
  if (mouseMove) {
    // 通过event.touches.length判断有几个手指触摸在屏幕上
    if (event.touches && event.touches.length == 1) {
      var touchMove = event.touches[0];
      ex = touchMove.pageX;
      ey = touchMove.pageY;
      // 获取T移动的距离
      var mapLeft = centerPos.x + (sy - ey);
      var mapTop = centerPos.y + (ex - sx);
      // 将移动的距离转为经纬度
      var moveLnglat = map
        .pixelToLngLat(new AMap.Pixel(mapLeft, mapTop), map.getZoom())
        .toString()
        .split(","); // 返回 LngLat 对象
      // 平移经纬度
      map.panTo([Number(moveLnglat[0]), Number(moveLnglat[1])]);
    }
  }
}
map.on("zoomstart", function (e) {
  mouseMove = false;
});

container.addEventListener("touchend", function (e) {
  if (e.touches.length === 0) {
    mouseMove = true;
    sx = 0;
    sy = 0;
    ex = 0;
    ey = 0;
  }
});

// 鼠标点击获取经纬度
map.on("click", function (e) {
  // 经度
  // console.log('坐标', e.lnglat.getLng(), e.lnglat.getLat());
});


// 点击元素事件
function elementClick(ExtData) {
  if (typeof mapItemClick == "function") {
    mapItemClick(ExtData);
  }
}
