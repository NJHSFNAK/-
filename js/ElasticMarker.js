// 公共样式的映射
var zoomStyleMapping = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
  14: 0,
  15: 0,
  16: 0,
  17: 0,
};

// 公共样式列表
function commonStyleArrFun(imageUrl, size) {
  return [
    {
      icon: {
        img: getImgSrc(imageUrl),
        size: [size[0], size[1]], //可见区域的大小
        anchor: "bottom-center",
        fitZoom: 11.41, //最合适的级别
        scaleFactor: 2, //地图放大一级的缩放比例系数
        maxScale: 6, //最大放大比例
        minScale: 0.01, //最小放大比例
      },
    },
  ];
}

// 公共加载灵活点标记的插件
function commonLoaderLayer(position, zoom = [], data, stylesArr) {
  return new AMap.ElasticMarker({
    position,
    zooms: zoom || zooms,
    // 指定样式列表
    styles: stylesArr,
    // 指定 zoom 与样式的映射
    zoomStyleMapping: zoomStyleMapping,
    extData: data,
    clickable: true,
    cursor: "pointer",
  });
}

// 存放静态图片数据
const imageEMILayers = [];
// 加载静态图片
function setEMImageLayer() {
  for (let i = 0; i < EMConfig.length; i++) {
    // 样式列表
    var stylesArr = commonStyleArrFun(EMConfig[i].imageUrl, EMConfig[i].size);
    // 建立作用域
    let elasticMarker = commonLoaderLayer(
      EMConfig[i].bounds,
      EMConfig[i].zooms,
      { "data-map": EMConfig[i].dataMap },
      stylesArr
    );
    // 点击获取data-map
    elasticMarker.on("click", function () {
      // 添加data-map
      elementClick(elasticMarker.getExtData());
    });
    imageEMILayers.push(elasticMarker);
  }
}
// 存放坐标数据
const locationEMILayers = [];

// 加载坐标数据
function setEMLocationLayer() {
  for (let i = 0; i < lenPos.length; i++) {
    // 样式列表
    var stylesArr = commonStyleArrFun("/images/location.png", [37, 49]);
    let elasticMarker = commonLoaderLayer(
      lenPos[i].lnglats,
      lenPos[i].zooms,
      { imageUrl: getImgSrc(lenPos[i].imageUrl) },
      stylesArr
    );
    // 点击获取data-map
    elasticMarker.on("click", function () {
      // 添加data-map
      locationClick(elasticMarker.getExtData().imageUrl);
    });
    locationEMILayers.push(elasticMarker);
  }
}

function locationClick(imageUrl) {
  $(".img-mask .img").attr("src", imageUrl);
  $(".img-mask").show();
}

$(".img-mask .close-btn").click(() => {
  $(".img-mask").hide();
});
