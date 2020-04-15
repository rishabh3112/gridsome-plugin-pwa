import path from 'path'
import fs from 'fs-extra'
import sharp from 'sharp'
import rename from 'rename'

export const createManifest = async (context, config, queue, options) => {
    const manifestDest = path.join(config.outputDir, options.manifestPath);
    const iconsDir = path.join(config.outputDir, 'assets/static/');
    const iconName = options.icon.split('/').slice(-1)[0];

    // Generate all size images from options.icon
    const sizes = [512, 384, 192, 180, 152, 144, 128, 120, 96, 72, 48, 16];
    const iconDir = path.relative(config.outputDir, iconsDir);

    const icons = [];
    await Promise.all(sizes.map((size) => {
        const imagePath = path.join(iconsDir, rename(iconName, { suffix: '-' + size}))
        const src = path.relative(config.outputDir, imagePath);
        const type = 'image/' + iconName.split('.').slice(-1)[0];
        const sizes = `${size}x${size}`;
        icons.push({ src, type, sizes });
        return sharp(options.icon).resize(size, size).toFile(imagePath);
    }));

    await fs.outputFile(manifestDest, JSON.stringify({
        name: options.title,
        short_name: options.shortName,
        start_url: options.startUrl,
        display: options.display,
        theme_color: options.themeColor,
        background_color: options.backgroundColor,
        gcm_sender_id: (options.gcmSenderId? options.gcmSenderId : undefined),
        icons
    }, null, 2));
}
