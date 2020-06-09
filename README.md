<p align="center">
    <a href="https://www.npmjs.com/package/gridsome-plugin-pwa">
      <img src="https://gridsome.org/logos/logo-circle-light.svg" alt="gridsome logo" width="100px"/>
    </a>
    <h1 align="center">gridsome-plugin-pwa</h1>
    <p align="center"> A PWA plugin for gridsome </p>
    <p align="center"><a href="https://npmjs.com/package/gridsome-plugin-pwa"><img src="https://badge.fury.io/js/gridsome-plugin-pwa.svg" alt="npm version"></a> <img alt="npm" src="https://img.shields.io/npm/dt/gridsome-plugin-pwa"> <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/gridsome-plugin-pwa"></p>
</p>

## Installation

```
# For npm
$ npm install gridsome-plugin-pwa
# For yarn
$ yarn add gridsome-plugin-pwa
```

## Usage

Add `gridsome-plugin-pwa` to plugin array with following configurable options to `gridsome.config.js`

> Defaults for required fields and example for optional fields values are mentioned below along side properties

```js
...
plugins:[
    {
        use: 'gridsome-plugin-pwa',
        options: {
            // Service Worker Options
            disableServiceWorker: false,
            serviceWorkerPath: 'service-worker.js',
            cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg,gif',
            disableTemplatedUrls: false,       // Optional

            // Manifest Options (https://developer.mozilla.org/en-US/docs/Web/Manifest)
            manifestPath: 'manifest.json',
            title: 'Gridsome',
            startUrl: '/',
            display: 'standalone',
            statusBarStyle: 'default',
            themeColor: '#666600',
            backgroundColor: '#ffffff',
            icon: '',
            shortName: 'Gridsome',              // Optional
            description: 'Gridsome is awesome!',// Optional
            categories: ['education'],          // Optional
            lang: 'en-GB',                      // Optional
            dir: 'auto',                        // Optional
            maskableIcon: true,                 // Optional
            screenshots: [                      // Optional
                {
                    src: 'src/screenshot1.png',
                    sizes: '1280x720',
                    type: 'image/png',
                },
            ]
            gcmSenderId: undefined,             // Optional

            // Standard Meta Tags
            svgFavicon: 'favicon.svg',          // Optional. Requires favicon.ico fallback

            // Microsoft Windows Meta Tags
            msTileColor: '#666600',             // Optional

            // Apple MacOS Meta Tags
            appleMaskIcon: 'favicon.svg',       // Optional
            appleMaskIconColor: '#666600',      // Optional
        }
    }
]
```

## License (MIT)

Open [LICENSE](./LICENSE) file for more info
