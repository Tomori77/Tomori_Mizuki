(function () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function () {
        console.log('[SW] 注册失败，可能是 file:// 协议或浏览器不支持');
      });
    });
  }
})();
