/**
 * @param {String} resource 文件流
 * @param {String} fileType 文件类型
 * @param {String} fileName 文件名 （可以响应头部读取文件名，如下）
 *  let resultFileName = res.headers['content-disposition'];
 *  let name = resultFileName.substring(resultFileName.indexOf('=')).substring(1);
 * 使用方式 this.$downloadBlob(data,'application/octet-stream','download.zip');其中文件名可以从响应头截取
 *
 * */
export function downloadBlob (resource, fileType, fileName) {
  var data = new Blob([resource], {
    type: fileType
  });

  if ("download" in document.createElement("a")) {
    //非IE
    var downloadUrl = window.URL.createObjectURL(data);
    var anchor = document.createElement("a");

    anchor.href = downloadUrl;
    anchor.download = fileName;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
    document.body.removeChild(anchor);
  } else {
    //IE10+下载
    navigator.msSaveBlob(data, fileName);
  }
}
