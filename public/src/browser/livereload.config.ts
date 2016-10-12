try {
  const _window: any = window;
  const source = new _window.EventSource('/livereload');

  source.onmessage = function(message: any) {
    try {
      if (JSON.parse(message.data).action === 'reload') {
        window.location.reload();
      }
    } catch (e) {}
  };

  source.onerror = function (error: any) {
    const refresh = 5000;
    console.log('livereload error. Backend not available.');
    console.log('refreshing in ' + refresh / 1000 + ' seconds.');

    setTimeout(function () {
      window.location.reload();
    }, refresh);
  };
} catch (err) {}