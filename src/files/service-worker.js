import path from 'path'
import { generateSW } from 'workbox-build'
import fs from 'fs-extra'

const appendToServiceWorker = async (config, options) => {
    const skipWaitingPath = path.resolve(__dirname, '../utils/skip-waiting.js')
    const skipWaiting = await fs.readFile(skipWaitingPath, 'utf8')
    const outPath = path.join(config.outputDir, options.serviceWorkerPath);
    await fs.writeFile(outPath, `\n${skipWaiting}`, { flag: 'a' })
}

export const createServiceWorker = async (context, config, queue, options) => {
    if (options.disableServiceWorker) return false;
    const serviceWorkerPath = path.join(config.outputDir, options.serviceWorkerPath)
  
    const swConfig = {
      modifyURLPrefix: { '' : config.pathPrefix + '/' || ''},
      swDest: serviceWorkerPath,
      globDirectory: config.outputDir,
      globPatterns: [`**\/*.{${options.cachedFileTypes}}`, "**\/*.json"],
      globIgnores: [options.serviceWorkerPath, '**\/*client.json', '**\/*server.json'],
      templatedURLs: queue.reduce((urls, page) => {
        const url = page.path.substring(1)
        const file = path.relative(config.outputDir, page.htmlOutput)

        if (!options.disableTemplatedUrls) {
          // Don't add url to templatedURLs if it has dynamic routes #29
          if (url && url.indexOf('/:') === -1) urls[url] = file
        }

        return urls
      }, {})
    };
    if (options.modifyServiceWorkerConfig) {
      options.modifyServiceWorkerConfig(swConfig);
    }
    await generateSW(swConfig);

    await appendToServiceWorker(config, options);
    return true;
}
