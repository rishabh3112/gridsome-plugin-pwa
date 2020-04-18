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
            title: 'Gridsome',
            startUrl: '/',
            display: 'standalone',
            statusBarStyle: 'default',
            manifestPath: 'manifest.json',
            disableServiceWorker: true,
            serviceWorkerPath: 'service-worker.js',
            cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg',
            shortName: 'Gridsome',
            themeColor: '#666600',
            backgroundColor: '#ffffff',
            icon: '', // must be provided like 'src/favicon.png'
            msTileImage: '',
            msTileColor: '#666600',
            gcmSenderId: '',
        }
    }
]
```

## License (MIT)
Open [LICENSE](./LICENSE) file for more info 
