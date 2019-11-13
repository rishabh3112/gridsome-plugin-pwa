import path from 'path'
import { generateSW } from 'workbox-build'
import fs from 'fs-extra'

const appendToServiceWorker = async (config, options) => {
    const skipWaitingPath = path.resolve(__dirname, '../utils/skip-wating.js')
    const skipWaiting = await fs.readFile(skipWaitingPath, 'utf8')
    const outPath = path.join(config.outputDir, options.serviceWorkerPath);
    await fs.writeFile(outPath, `\n${skipWaiting}`, { flag: 'a' })
}

export const createServiceWorker = async (context, config, queue, options) => {
    const serviceWorkerPath = path.join(config.outputDir, options.serviceWorkerPath)
  
    await generateSW({
      swDest: serviceWorkerPath,
      globDirectory: config.outputDir,
      globPatterns: [`**\/*.{${options.cachedFileTypes}}`, "**\/*.json"],
      globIgnores: [options.serviceWorkerPath, '**\/*client.json', '**\/*server.json'],
      templatedUrls: queue.reduce((urls, page) => {
        const url = page.path.substring(1)
        const file = path.relative(config.outputDir, page.htmlOutput)
        if (url) urls[url] = file
        return urls
      }, {})
    })

    await appendToServiceWorker(config, options);
}
