const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { CacheFirst } = require('workbox-strategies');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { registerRoute } = require('workbox-routing');

precacheAndRoute(self.__WB_MANIFEST);

const assetCacheStrategy = new CacheFirst({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

const assetCachingMatcher = ({ request }) =>
  request.destination === 'style' ||
  request.destination === 'script' ||
  request.destination === 'image';

registerRoute(assetCachingMatcher, assetCacheStrategy);
