self.addEventListener('install', function(event){
    event.waitUntill(
        caches.open('sw- cache').then(function(cache){
            return cache.add('index.html');
        })
    );
});