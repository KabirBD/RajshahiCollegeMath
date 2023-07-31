//Service worker setup
const cacheName = 'v25';
const cacheAssets = [
    '/',
    '/assets/rutine.json',
    '/assets/holidays.json',
    '/index.html',
    '/teachersStuffs.html',
    '/students.html',
    '/files.html',
    '/fullRutines.html',
    '/styles/style.css',
    '/styles/bootstrap.min.css',
    '/styles/icofont.min.css',
    './scripts/jquery.slim.min.js',
    '/scripts/bootstrap.bundle.min.js',
    '/scripts/firebaseConfig.js',
    '/scripts/dateConfig.js',
    '/scripts/firebaseNotice.js',
    '/scripts/main.js',
    '/scripts/files.js',
    '/scripts/teachersStuffs.js',
    '/scripts/newNotice.js',
    '/scripts/uploadFile.js',
    '/scripts/fitty.min.js',
    '/assets/teachersStuffs.json',
    '/assets/logo256.png',
    '/assets/file-storage.png',
    '/assets/noticeboard.png',
    '/assets/upload.png',
    '/assets/teacher.png',
    '/assets/students.png',
    '/assets/bg-nav.svg',
    '/assets/Kalpurush.woff',
    '/assets/icofont.woff'
];

// Call Install Event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});