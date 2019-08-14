import path from 'path'
import {createManifest} from './files/manifest.js'
import {createServiceWorker} from './files/service-worker.js'

const log = (message) => {process.stdout.write(message)};

function Plugin (api, options) {
  api.afterBuild(async ({ context, config, queue }) => {
    log('Scaffolding PWA assets\n');
    
    log(` - ${options.manifestPath}..`);
    await createManifest(context, config, queue, options);
    log('..done\n');

    log(` - ${options.serviceWorkerPath}..`);
    await createServiceWorker(context, config, queue, options);
    log('..done\n');
  })
  api.setClientOptions({
    title: options.title,
    serviceWorkerPath: path.join('/', options.serviceWorkerPath),
    manifestPath: path.join('/', options.manifestPath),
    statusBarStyle: options.statusBarStyle,
    themeColor: options.themeColor
  })
}

Plugin.defaultOptions = () => ({
  title: 'Gridsome',
  startUrl: '/',
  display: 'standalone',
  statusBarStyle: 'default',
  manifestPath: 'manifest.json',
  serviceWorkerPath: 'service-worker.js',
  cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg',
  shortName: 'Gridsome',
  themeColor: '#666600',
  backgroundColor: '#ffffff',
  icon: ''
})

module.exports = Plugin