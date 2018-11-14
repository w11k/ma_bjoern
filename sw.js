// This is the "Offline copy of pages" service worker
// v1

// Install stage sets up the index page (home page) in the cache and opens a new cache
self.addEventListener('install', event => {
    const indexPage = new Request('index.html');
    event.waitUntil(
        fetch(indexPage)
        	.then(response => caches.open(getCacheName())
                .then(cache => cache.put(indexPage, response)))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', () => {
    return caches.keys()
        .then(cacheKeys => {
            cacheKeys.forEach(cacheKey => {
                if (cacheKey !== getCacheName()) {
                    caches.delete(cacheKey);
                }
            });
            return self.clients.claim();
        });
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener('fetch', event => {
    const updateCache = request => caches.open(getCacheName()).then(cache => {
        return fetch(request).then(response => cache.put(request, response));
    });

    let request = event.request;
    if (request.url.indexOf('/#/') > -1) {
        const newUrl = request.url.split('#/')[0];
        request = new Request(newUrl);
    }
    if (request.url.indexOf('http') === 0) {
        event.waitUntil(updateCache(request).catch((error) => {
        }));
    }

    event.respondWith(
        fetch(request).catch(() => {
            // Check to see if you have it in the cache
            // Return response
            // If not in the cache, then return error page
            return caches.open(getCacheName()).then(cache => {
                return cache.match(request).then(matching => {
                    return !matching || matching.status === 404 ? Promise.reject('no-match') : matching;
                });
            });
        })
    );
});

function getCacheName() {
    return 'vanilla-wc';
}
