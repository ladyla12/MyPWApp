const CACHE_NAME = "MyPWApp-v1";
var urlToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlToCache);
        })
    );
});

self.addEventListener("fetch", function(event){
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if(response) {
                console.log("ServiceWorker : Menggunakan aset dari cache :", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
              );
            
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if(cacheName != CACHE_NAME){
                        console.log("ServiceWorker : Cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});