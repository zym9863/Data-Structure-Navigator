const CACHE_NAME = 'data-structure-navigator-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // CSS 文件通常由 Vite 处理并内联或通过 JS 加载，
  // 但如果直接在 index.html 中引用了其他 CSS 文件，请在此处添加
  // '/css/style.css',
  // JS 文件通常由 Vite 打包，主入口是 main.ts -> index.html 中的 <script type="module" src="/src/main.ts"></script>
  // Vite 会处理 main.ts 及其依赖的打包和哈希，Service Worker 通常不需要直接缓存这些。
  // 如果有其他通过 <script> 标签直接引入的 JS 文件，请在此处添加。

  // 图标也应该被缓存
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/manifest.json',
  '/src/assets/vue.svg', // 根据 index.html 中的 icon 路径
  // 根据项目实际情况添加其他需要缓存的静态资源，例如字体文件等
  // '/fonts/noto-sans-sc-v26-latin_chinese-simplified-regular.woff2'
];

self.addEventListener('install', event => {
  // 执行安装步骤
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 缓存中找到了资源
        if (response) {
          return response;
        }
        // 否则，从网络请求
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
