import path from 'path'
import { generateSW } from 'workbox-build'
import fs from 'fs-extra'

const appendToServiceWorker = async (options) => {
    const skipWaitingPath = path.resolve(__dirname, '../utils/skip-wating.js')
    const skipWaiting = await fs.readFile(skipWaitingPath, 'utf8')
    await fs.writeFile(options.serviceWorkerPath, `\n${skipWaiting}`, { flag: 'a' })
}

export const createServiceWorker = async (context, config, queue, options) => {
    const serviceWorkerPath = path.join(config.outDir, options.serviceWorkerPath)    
  
    await generateSW({
      swDest: serviceWorkerPath,
      globDirectory: config.outDir,
      globPatterns: ['**\/*.{js,json,css,html,png,jpg,jpeg,svg}'],
      globIgnores: [options.serviceWorkerPath],
      templatedUrls: queue.reduce((urls, page) => {
        const url = page.path.substring(1)
        const file = path.relative(config.outDir, page.htmlOutput)
        if (url) urls[url] = file
        return urls
      }, {})
    })

    await appendToServiceWorker(options);
}
