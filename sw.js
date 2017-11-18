var CACHE_NAME = 'grrds-puzzle-cache-v1.0';
var urlsToCache = [
    'index.html',
    'Images/4inarow.svg',
    'Images/bullets0.png',
    'Images/bullets0o.png',
    'Images/bullets1.png',
    'Images/bullets1o.png',
    'Images/dice.svg',
    'Images/dummy.png',
    'Images/easy.png',
    'Images/easy_gold.png',
    'Images/hard.png',
    'Images/hard_gold.png',
    'Images/info.png',
    'Images/lock.svg',
    'Images/mail.svg',
    'Images/medal1.png',
    'Images/medal2.png',
    'Images/medal3.png',
    'Images/medium.png',
    'Images/medium_gold.png',
    'Images/next.png',
    'Images/piece_gold.png',
    'Images/prev.png',
    'Images/puzzle.svg',
    'Images/settings.png',
    'Images/title1.png',
    'Images/title_wide.png',
    'Images/america/theme.png',
    'Images/animals/theme.png',
    'Images/asia/theme.png',
    'Images/europe/theme.png',
    'Images/flowers/theme.png',
    'Images/tricky/theme.png',
    'Scripts/binaryajax.js',
    'Scripts/exif.js',
    'Scripts/jquery.mobile-1.3.2.min.css',
    'Scripts/jquery.mobile-1.3.2.min.js',
    'Scripts/jquery-1.9.1.min.js',
    'Scripts/kinetic-v4.7.4.min.js',
    'Scripts/l10n.js',
    'Scripts/puzzle.css',
    'Scripts/puzzle.js',
    'Scripts/swipe.css',
    'Scripts/swipe.js',
    'Scripts/images/ajax-loader.gif',
    'Scripts/images/ajax-loader.png',
    'Scripts/images/icons-18-black.png',
    'Scripts/images/icons-18-white.png',
    'Scripts/images/icons-36-black.png',
    'Scripts/images/icons-36-white.png',
    'Locales/ar/puzzle.properties',
    'Locales/bn/puzzle.properties',
    'Locales/cs/puzzle.properties',
    'Locales/de/puzzle.properties',
    'Locales/en/puzzle.properties',
    'Locales/es/puzzle.properties',
    'Locales/fr/puzzle.properties',
    'Locales/hr/puzzle.properties',
    'Locales/hu/puzzle.properties',
    'Locales/it/puzzle.properties',
    'Locales/nl/puzzle.properties',
    'Locales/pl/puzzle.properties',
    'Locales/pt_BR/puzzle.properties',
    'Locales/pt_PT/puzzle.properties',
    'Locales/rm/puzzle.properties',
    'Locales/ru/puzzle.properties',
    'Locales/sl/puzzle.properties',
    'Locales/sr/puzzle.properties',
    'Locales/ta/puzzle.properties',
    'Locales/tr/puzzle.properties',
    'Locales/ur/puzzle.properties',
    'Locales/zh/puzzle.properties',
    'Locales/zh_CN/puzzle.properties',
    'Locales/locales.ini',
    'Sounds/click.mp3',
    'Sounds/click.ogg',
    'Sounds/ding.mp3',
    'Sounds/ding.ogg'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function(response) {
                        // Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});