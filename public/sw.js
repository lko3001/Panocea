if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let r={};const c=e=>a(e,t),u={module:{uri:t},exports:r,require:c};s[t]=Promise.all(n.map((e=>u[e]||c(e)))).then((e=>(i(...e),r)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts("fallback-PDuMX89SMgBr2bXOJOAjm.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"96a42d4c2cc1a93b1fedfa349dda82db"},{url:"/_next/static/PDuMX89SMgBr2bXOJOAjm/_buildManifest.js",revision:"53723b02eab85f5f409c6bec289da7f1"},{url:"/_next/static/PDuMX89SMgBr2bXOJOAjm/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e5ce63c-b61b8fe3037b277f.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/1-ea65158608e5bdf9.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/11dc13b0-9323549bbd73473c.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/133-b8abeecd182fb07d.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/13b76428-fb119cac1c6c3c2d.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/233-8bfbda6ee9a570f7.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/320-87db4a6e66e7d5a3.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/387-4a9bf9c7181ea692.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/398-1575a0c065e95af5.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/43-df4ada72dbe06ee4.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/464-f64393197e1e4b0f.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/465-84a334091fba9b45.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/466-073df571b61910df.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/596-c93fa01df6b6393b.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/634-ce6379831e393cc2.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/685-9009bcca50dc4f07.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/706-40def59099e30f08.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/70e0d97a-f1ed3cfde81f1657.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/712-3b709f33174c8f9f.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/749-166bce46e7de5e14.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/755-f34c279c33632b54.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/761-3ac4bf183b5cfe05.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/904-ba0c6a3b336ecc0e.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/app/(centered-layout)/layout-428b56640cbfe5c4.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/app/(centered-layout)/signin/page-424754a0d1664563.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/app/(pages)/email/page-c566c97d799004fc.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/app/(pages)/finance/page-42892e98c54908a8.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/app/(pages)/layout-ba3e3a21c7fdcb26.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/app/(pages)/notes/page-60f27de829d1cf53.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/app/(pages)/page-bd9d807eff33f747.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/app/(pages)/pomodoro/page-4fa1aef80fbadb79.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/app/(pages)/rss-feeds/page-26e785b667078916.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/app/(pages)/settings/page-5ff896727c236325.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/app/(pages)/text-editor/page-9eb1e1a753476531.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/app/(pages)/todo/page-c531becdca18f385.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/app/layout-62f17a099897a8da.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/app/not-found-dac364dc5a4b1505.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/fd9d1056-459783e97fe6ffad.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/framework-43665103d101a22d.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/main-0d9684555836fc95.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/main-app-355eb00ee5a26329.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/pages/_app-6b79a29ad0d63b21.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/pages/_error-9aeb3e4d490fe4b8.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-83a6d81fc954d0d1.js",revision:"PDuMX89SMgBr2bXOJOAjm"},{url:"/_next/static/css/081a47229daabedf.css",revision:"081a47229daabedf"},{url:"/_next/static/media/2aaf0723e720e8b9-s.p.woff2",revision:"e1b9f0ecaaebb12c93064cd3c406f82b"},{url:"/_next/static/media/50188d80bad94e38-s.woff2",revision:"3454e1c813aad0b9bc6c72d71348c6a0"},{url:"/_next/static/media/91ff6455a84f6e50-s.woff2",revision:"92527e8df10e0deec3715e65587a7f37"},{url:"/_next/static/media/978e8a64d72b8c6e-s.woff2",revision:"cb3b0bf4f200f8396e2f1ac704a6cce3"},{url:"/_next/static/media/9c4f34569c9b36ca-s.woff2",revision:"2c1fc211bf5cca7ae7e7396dc9e4c824"},{url:"/_next/static/media/9cbb0a469dcb7133-s.woff2",revision:"3ee09c6337076fd6d3b5797383936c3d"},{url:"/_next/static/media/a1b296c8f423a2cf-s.woff2",revision:"aa77f91c32023007d75971efefa72184"},{url:"/_next/static/media/ae9ae6716d4f8bf8-s.woff2",revision:"b0c49a041e15bdbca22833f1ed5cfb19"},{url:"/_next/static/media/b1db3e28af9ef94a-s.woff2",revision:"70afeea69c7f52ffccde29e1ea470838"},{url:"/_next/static/media/b967158bc7d7a9fb-s.woff2",revision:"08ccb2a3cfc83cf18d4a3ec64dd7c11b"},{url:"/_next/static/media/c0f5ec5bbf5913b7-s.woff2",revision:"8ca5bc1cd1579933b73e51ec9354eec9"},{url:"/_next/static/media/d1d9458b69004127-s.woff2",revision:"9885d5da3e4dfffab0b4b1f4a259ca27"},{url:"/_next/static/media/d6ed8c16ea958266-s.p.woff2",revision:"3006fe68ffbe248677439fee0d3ba79c"},{url:"/_next/static/media/f60bbb0fb4788069-s.woff2",revision:"0365343558a0ce676dff83f2c1111a54"},{url:"/ancient-email-thumbnail.png",revision:"b8935a0682a80c17ddd973867c34ed16"},{url:"/audio/Rise.ogg",revision:"04d59bb94ce8f02476f130ce1715d098"},{url:"/icon-192x192.png",revision:"3b100ee6dfb91430b920b793d7aef8b6"},{url:"/icon-256x256.png",revision:"15d056cfd9b08a095a7483902e4f6b40"},{url:"/icon-384x384.png",revision:"8a57dd75d5629d31554245fa10924803"},{url:"/icon-512x512.png",revision:"a847b785be51c9722f46ca5d5c3a897d"},{url:"/manifest.json",revision:"028f531e69abd0b4f0f05db26a88f141"},{url:"/modern-email-thumbnail.png",revision:"4bc424f989e9bce794808aabdc17d5ae"},{url:"src/app/_offline.tsx",revision:"PDuMX89SMgBr2bXOJOAjm"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
