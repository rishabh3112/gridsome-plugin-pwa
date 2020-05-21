const { register } = require('register-service-worker');

const clientConfig = function (Vue, options, context) {
  let {head, isClient} = context;
  if (process.env.NODE_ENV === 'production' && isClient) {
    register(options.serviceWorkerPath, {
      ready () {
        console.log('Service worker is active.')
      },
      registered (registration) {
        console.log('Service worker has been registered.')
      },
      cached (registration) {
        console.log('Content has been cached for offline use.')
      },
      updatefound (registration) {
        console.log('New content is downloading.')
      },
      updated (registration) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });  
        console.log('New content is available; please refresh.')
      },
      offline () {
        console.log('No internet connection found. App is running in offline mode.')
      },
      error (error) {
        console.error('Error during service worker registration:', error)
      }
    })
  }

  const iconsDir = 'assets/static/';
  const iconName = options.icon.split('/').slice(-1)[0];
  const msTileImage = `/${iconsDir}${iconName}-144x144.png`;

  head.link.push({
    rel: 'manifest',
    href: options.manifestPath.replace('\\', '/')
  })

  if (options.svgFavicon) {
    var emptyIcon = head.link.find(x => x.rel === 'icon' && x.href === 'data:,');
    if (emptyIcon) {
      const index = head.link.indexOf(emptyIcon);
      head.link.splice(index, 1);
    }

    head.link.push({
      rel: 'icon',
      type: 'image/svg+xml',
      href: options.svgFavicon
    });

    head.link.push({
      rel: 'alternate icon',
      href: 'favicon.ico',
    });
  }

  if (options.appleMaskIcon && options.appleMaskIconColor) {
    head.link.push({
      rel: 'mask-icon',
      href: options.appleMaskIcon,
      color: options.appleMaskIconColor,
    })
  }

  head.meta.push({
    name: 'theme-color',
    content: options.themeColor
  })

  head.meta.push({
    name: 'apple-mobile-web-app-capable',
    content: 'yes'
  })

  head.meta.push({
    name: 'apple-mobile-web-app-status-bar-style',
    content: options.statusBarStyle
  })

  head.meta.push({
    name: 'apple-mobile-web-app-title',
    content: options.title
  })

  head.meta.push({
    name: 'application-name',
    content: options.title
  })

  if (options.msTileColor) {
    head.meta.push({
      name: 'msapplication-TileColor',
      content: options.msTileColor
    })
  }
  
  head.meta.push({
    name: 'msapplication-TileImage',
    content: msTileImage
  })
}

export default clientConfig;
