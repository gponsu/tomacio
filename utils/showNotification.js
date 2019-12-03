function showNotification(body) {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Tomacio', {
          body: body,
          icon: '/logo192.png',
        });
        const audio = new Audio('/sound.mp3');
        audio.play();
      });
    }
  });
}

export default showNotification;
