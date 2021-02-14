import path from 'path'
import fs from 'fs-extra'
import sharp from 'sharp'
import rename from 'rename'

export const createManifest = async (context, config, queue, options) => {
    const manifestDest = path.join(config.outputDir, options.manifestPath);
    const iconsDir = path.join(config.outputDir, options.staticAssetsDir);
    const iconName = options.icon.split('/').slice(-1)[0];
    let maskableIconName = typeof options.maskableIcon === 'string' 
        ? options.maskableIcon.split('/').slice(-1)[0] 
        : null

    // Generate all size images from options.icon
    const sizes = [512, 384, 192, 180, 152, 144, 128, 120, 96, 72, 48, 16];
    const iconDir = path.relative(config.outputDir, iconsDir);

    const icons = [];
    await Promise.all(sizes.map((size) => {
        const sizes = `${size}x${size}`;

        // for { icon }
        let imagePath = path.join(iconsDir, rename(iconName, { suffix: `-${sizes}` }))
        let src = path.relative(config.outputDir, imagePath);
        let type = 'image/' + iconName.split('.').slice(-1)[0];
        let purpose = 'any'

        // maskableIcon can now be boolean or an icon path. 
        // if it is true, or is the same icon file as standard icon, set 'maskable any' 
        // also revert maskableIconName to null, as we won't need to process separately
        if (options.maskableIcon === true || options.maskableIcon === options.icon) {
            purpose = 'maskable any'
            maskableIconName = null
        } 

        // add and process { icon }
        icons.push({src, type, sizes, purpose});
        const results = [sharp(options.icon).resize(size, size).toFile(imagePath)]

        // if maskableIcon is a string, then we need to process it as a separate maskable icon
        if (maskableIconName) {
            imagePath = path.join(iconsDir, rename(maskableIconName, { suffix: `-maskable-${sizes}` }))
            src = path.relative(config.outputDir, imagePath);
            type = 'image/' + maskableIconName.split('.').slice(-1)[0];
            purpose = 'maskable'

            // add and process { maskableIcon }
            icons.push({src, type, sizes, purpose});
            results.push(sharp(options.maskableIcon).resize(size, size).toFile(imagePath))
        }

        // always return a single promise
        return Promise.all(results)
    }));

    await fs.outputFile(manifestDest, JSON.stringify({
        name: options.title,
        short_name: options.shortName,
        description: options.description,
        lang: options.lang,
        dir: options.dir,
        categories: options.categories,
        start_url: options.startUrl,
        display: options.display,
        theme_color: options.themeColor,
        background_color: options.backgroundColor,
        screenshots: options.screenshots,
        shortcuts: options.shortcuts,
        scope: options.scope,
        gcm_sender_id: options.gcmSenderId,
        icons
    }, null, 2));
}
