try {
  const _window: any = window;
  const source = new _window.EventSource('/livereload');

  console.log('GOTIT');

  source.onmessage = function(message: any) {
    try {
      if (JSON.parse(message.data).action === 'reload') {
        window.location.reload();
      }
    } catch (e) {}
  };

  source.onerror = function (error: any) {
    const refresh = 5;
    console.log('livereload error. Backend not available.');
    console.log('refreshing in ' + refresh + ' seconds.');
    setTimeout(function () {
      window.location.reload();
    }, refresh * 1000);
  };
} catch (err) {

}