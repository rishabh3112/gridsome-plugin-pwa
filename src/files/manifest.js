import path from 'path'
import sizeOf from 'image-size'
import fs from 'fs-extra'

export const createManifest = async (context, config, queue, options) => {
    const manifestDest = path.join(config.outDir, options.manifestPath)
    const iconsDir = path.join(config.outDir, 'assets/static/');
    const iconName = options.icon.split('/').slice(-1)[0];
    // Copy Favicon from options.icon to assets/static
    fs.copyFileSync(path.resolve(context, options.icon), path.join(iconsDir, iconName));

    //TODO: generate all size images from options.icon
    const iconsNames = [path.relative(config.outDir, path.join(iconsDir, iconName))]
    const icons = iconsNames.map((icon) => {
        let iconData =  sizeOf(path.resolve(config.outDir, icon));
        iconData.src = icon;
        return iconData;
    });

    await fs.outputFile(manifestDest, JSON.stringify({
        name: options.title,
        short_name: options.shortName,
        start_url: options.startUrl,
        display: options.display,
        theme_color: options.themeColor,
        background_color: options.backgroundColor,
        icons: icons.map(set => ({
            src: set.src,
            sizes: `${set.width}x${set.height}`,
            type: 'image/'+set.type,
        }))
    }, null, 2))
}