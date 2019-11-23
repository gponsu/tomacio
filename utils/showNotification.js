function showNotification(body) {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Tomacio', {
          body: body,
          icon: 'logo192.png',
        });
      });
    }
  });
}

export default showNotification;
