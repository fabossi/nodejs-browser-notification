console.log('service worker loaded');

self.addEventListener('push', e => {
    const data = e.data.json();

    console.log('Push received');

    self.registration.showNotification(data.title, {
        body: 'Notified by Felipe Fabossi',
        icon: 'https://drive.google.com/file/d/1adV5rAuNWTkCVSkCD6xbIbUGBXK2ueXO/view?usp=sharing'
    })
});