const _self: ServiceWorkerGlobalScope = self as any

self.addEventListener('install', function (event) {
    _self.skipWaiting();
    event.waitUntil(
        self.caches.open('cache1')
            .then(function (cache) {
                return cache.addAll(['/', '/favicon.ico']);
            })
    );
});
self.addEventListener('activate', event => {
});

_self.addEventListener('fetch', function (event) {
    event.respondWith(fetch(event.request).then(x => {
        event.waitUntil(self.caches.open('cache1').then(cache => cache.put(event.request, x)))
        return x
    }).catch(x => caches.match(event.request)))
});