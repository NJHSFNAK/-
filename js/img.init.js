// 线上图片地址
function getImgSrc(src) {
  // var imgRoot = currImgRoot || "./";
  var imgRoot = "./";
  src = src.indexOf("/") == 0 ? src.substring(1) : src;
  return imgRoot + src;
}
