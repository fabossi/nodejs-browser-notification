const publicVipdKey = 'BDAgbDVTBb2BKTuuOgbcl5H_sSHk4wGrjz_aibS8Ujg8U00J4BU9DNEgUwCbQGAWDBYWVQziGuDO8gffOxftklE';

// Check for service worker

if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
}

// Register service worker, push and send push

async function send() {

    // Registering service worker

    console.log('registering service worker')

    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('service worker registered')

    // Registering push

    console.log('Registering push');

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVipdKey)
    })

    console.log('Push registered')

    // Send Push Notification

    console.log('Sending push');

    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: { 'Content-type': 'application/json' }
    });

    console.log('push sent');
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
