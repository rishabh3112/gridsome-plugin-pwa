<center>
<img src="https://gridsome.org/logos/logo-circle-light.svg" alt="gridsome logo" width="100px"/>
<h1>PWA plugin for Gridsome</h1>
</center>

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
            serviceWorkerPath: 'service-worker.js',
            shortName: 'Gridsome',
            themeColor: '#666600',
            backgroundColor: '#ffffff',
            icon: '' // must be supplied!
        }
    }
]
```

## License (MIT)
Open [LICENSE](./LICENSE) file for more info 