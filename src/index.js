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
    const response = await createServiceWorker(context, config, queue, options);
    if (response) log('..done\n');
    else log('..skipped\n');
  })

  const pathPrefix = api._app.config.pathPrefix ? api._app.config.pathPrefix + '/' : '/';

  api.setClientOptions({
    title: options.title,
    serviceWorkerPath: path.join(pathPrefix, options.serviceWorkerPath),
    manifestPath: path.join(pathPrefix, options.manifestPath),
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
  disableServiceWorker: true,
  serviceWorkerPath: 'service-worker.js',
  cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg',
  shortName: 'Gridsome',
  themeColor: '#666600',
  backgroundColor: '#ffffff',
  icon: '',
  msTileImage: '',
  msTileColor: '#666600'
})

module.exports = Plugin