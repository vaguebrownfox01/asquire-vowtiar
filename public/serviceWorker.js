const BASIC_CACHE = "verycachemoneyofyou-mui";
const DYNAMIC_CACHE = "dynamicboi-mui";
// const urlsToCache = ["index.html", "offline.html"];
const urlsToCache = [];
const self = this;

// Install SW
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(BASIC_CACHE).then((cache) => {
			console.log("Opened cache");
			return cache.addAll(urlsToCache);
		})
	);
});

// self.addEventListener("fetch", (event) => {
// 	event.respondWith(
// 		caches.match(event.request).then((response) => {
// 			if (response) {
// 				return response;
// 			} else {
// 				return fetch(event.request)
// 					.then((res) => {
// 						return caches.open(DYNAMIC_CACHE).then((cache) => {
// 							cache
// 								.put(event.request.url, res.clone())
// 								.catch((err) => {
// 									console.log("nothing really matters");
// 								});
// 							return res;
// 						});
// 					})
// 					.catch((e) => {
// 						console.log("fetch catch: ", e);
// 						return caches.match("offline.html").then((r) => {
// 							return r;
// 						});
// 					});
// 			}
// 		})
// 	);
// });

// Activate SW
self.addEventListener("activate", (event) => {
	console.log("activating SW");
	const cacheWhitelist = [];
	cacheWhitelist.push(BASIC_CACHE);

	event.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					} else {
						return null;
					}
				})
			)
		)
	);
});
