if (!self.define) {
  let e,
    s = {};
  const c = (c, t) => (
    (c = new URL(c + ".js", t).href),
    s[c] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = c), (e.onload = s), document.head.appendChild(e);
        } else (e = c), importScripts(c), s();
      }).then(() => {
        let e = s[c];
        if (!e) throw new Error(`Module ${c} didn’t register its module`);
        return e;
      })
  );
  self.define = (t, n) => {
    const a =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[a]) return;
    let i = {};
    const r = (e) => c(e, a),
      o = { module: { uri: a }, exports: i, require: r };
    s[a] = Promise.all(t.map((e) => o[e] || r(e))).then((e) => (n(...e), i));
  };
}
define(["./workbox-7c2a5a06"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "1c769f0fc7c3719e88a4c1397463166e",
        },
        {
          url: "/_next/static/ZDQc8_-qA8MDtevZc1sTt/_buildManifest.js",
          revision: "53723b02eab85f5f409c6bec289da7f1",
        },
        {
          url: "/_next/static/ZDQc8_-qA8MDtevZc1sTt/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/0e5ce63c-049993129d7cc1be.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/107-14f698553cf7a544.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/11dc13b0-9323549bbd73473c.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/13b76428-fb119cac1c6c3c2d.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/233-1eab11e74a5b4f08.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/251-ada7bc8f94d246fc.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/348-4d5c63ae3af1b0df.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/366-5b5eb4045d97cfce.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/592-1ec168ef99799687.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/596-c93fa01df6b6393b.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/647-b25e5b141c3e1bb1.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/755-c774808a926bb599.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/881-f481129513f2197a.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/892-99d3ef0ebf199a3e.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/app/email/page-38f87e86d11cea9e.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/app/finance/page-1a5d3d6417eeb629.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/app/layout-caae7656108495e7.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/app/page-7a8f416c6a4d5198.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/app/pomodoro/page-3df9f35d6e88d63e.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/app/rss-feeds/page-101d2c21db0620ba.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/app/todo/page-f9ff2e9eadebf8fd.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/fd9d1056-459783e97fe6ffad.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/framework-43665103d101a22d.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/main-app-355eb00ee5a26329.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/main-b5cf398421712c73.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/pages/_app-6b79a29ad0d63b21.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/pages/_error-9aeb3e4d490fe4b8.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3",
        },
        {
          url: "/_next/static/chunks/webpack-ebcf855e7c68f0aa.js",
          revision: "ZDQc8_-qA8MDtevZc1sTt",
        },
        {
          url: "/_next/static/css/10f3d68f44455e7a.css",
          revision: "10f3d68f44455e7a",
        },
        {
          url: "/_next/static/media/2aaf0723e720e8b9-s.p.woff2",
          revision: "e1b9f0ecaaebb12c93064cd3c406f82b",
        },
        {
          url: "/_next/static/media/9c4f34569c9b36ca-s.woff2",
          revision: "2c1fc211bf5cca7ae7e7396dc9e4c824",
        },
        {
          url: "/_next/static/media/ae9ae6716d4f8bf8-s.woff2",
          revision: "b0c49a041e15bdbca22833f1ed5cfb19",
        },
        {
          url: "/_next/static/media/b1db3e28af9ef94a-s.woff2",
          revision: "70afeea69c7f52ffccde29e1ea470838",
        },
        {
          url: "/_next/static/media/b967158bc7d7a9fb-s.woff2",
          revision: "08ccb2a3cfc83cf18d4a3ec64dd7c11b",
        },
        {
          url: "/_next/static/media/c0f5ec5bbf5913b7-s.woff2",
          revision: "8ca5bc1cd1579933b73e51ec9354eec9",
        },
        {
          url: "/_next/static/media/d1d9458b69004127-s.woff2",
          revision: "9885d5da3e4dfffab0b4b1f4a259ca27",
        },
        {
          url: "/audio/Rise.ogg",
          revision: "04d59bb94ce8f02476f130ce1715d098",
        },
        {
          url: "/icon-192x192.png",
          revision: "7fe214ae1a081d0b3c6c90effef8cf39",
        },
        {
          url: "/icon-256x256.png",
          revision: "a4d266d11a80e8c2151bd0fa22e1c6b2",
        },
        {
          url: "/icon-384x384.png",
          revision: "59a69e4415b360079bff2851650b4905",
        },
        {
          url: "/icon-512x512.png",
          revision: "4e6424d8b85ba5428f6df4f147e114b4",
        },
        { url: "/manifest.json", revision: "d68dbb97845a69fff6bff5f5239d081c" },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        { url: "/vercel.svg", revision: "61c6b19abff40ea7acd577be818f3976" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: c,
              state: t,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
