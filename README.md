<p align="center">
    <a href="https://www.npmjs.com/package/gridsome-plugin-pwa">
      <img src="https://gridsome.org/logos/logo-circle-light.svg" alt="gridsome logo" width="100px"/>
    </a>
    <h1 align="center">gridsome-plugin-pwa</h1>
    <p align="center"> A PWA plugin for gridsome </p>
    <p align="center"><img alt="npm" src="https://img.shields.io/npm/dt/gridsome-plugin-pwa"></p>
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

> Defaults are mentioned below along side properties

```js
...
plugins:[
    {
        use: 'gridsome-plugin-pwa',
        options: {
            // Service Worker Options
            disableServiceWorker: true,
            serviceWorkerPath: 'service-worker.js',
            cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg,gif',

            // Manifest Options (https://developer.mozilla.org/en-US/docs/Web/Manifest)
            manifestPath: 'manifest.webmanifest',
            title: 'Gridsome',
            shortName: 'Gridsome',
            description: 'Gridsome is awesome!',
            categories: ['education'],
            lang: 'en-GB',
            dir: 'auto',
            startUrl: '/',
            display: 'standalone',
            statusBarStyle: 'default',
            themeColor: '#666600',
            backgroundColor: '#ffffff',
            icon: '', // must be provided like 'src/favicon.png'
            maskableIcon: true, // The image has a safe border around it that can be cut away
            screenshots: [
                {
                    src: 'src/screenshot1.png',
                    sizes: '1280x720',
                    type: 'image/png',
                },
            ]
            gcmSenderId: undefined,

            // Standard Meta Tags
            svgFavicon: 'src/favicon.svg', // Optional

            // Microsoft Windows Meta Tags
            msTileColor: '#666600',

            // Apple MacOS Meta Tags
            appleMaskIcon: 'src/favicon.svg', // Optional
            appleMaskIconColor: '#666600',
        }
    }
]
```

## License (MIT)
Open [LICENSE](./LICENSE) file for more info 
