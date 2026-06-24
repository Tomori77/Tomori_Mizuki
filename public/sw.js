const CACHE_NAME = 'mizuki-tools-v1';
const OFFLINE_PREFIX = '/offline/';

// 新加工具时，在这里补上对应的路径
const PRECACHE_URLS = [
  '/offline/RP卡体检验收台.html',
  '/offline/世界书助手.html',
  '/offline/变量UI辅助制作.html',
  '/offline/角色卡工坊.html',
  '/offline/正则UI转化.html',
  '/offline/CC角色卡协作台.html',
  '/offline/生图固定提示词助手.html',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.pathname.startsWith(OFFLINE_PREFIX)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
  }
});
