/* eslint-env node */
const { configure } = require('quasar/wrappers')
require('dotenv').config()

module.exports = configure(function (ctx) {
  return {
    eslint: {
      fix: true,
      warnings: true,
      errors: true
    },
    boot: ['axios'],
    css: ['app.css'],
    extras: ['roboto-font', 'material-icons'],

    build: {
      env: require('dotenv').config().parsed,
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16'
      },

      vueRouterMode: 'history',
      env: {
        API_URL: ctx.dev ? process.env.API_DEV : process.env.API_PROD
      },
      publicPath: '/todo'
    },

    devServer: {
      https: true,
      port: 8080,
      open: true
    },

    framework: {
      config: {},
      plugins: ['Notify', 'Dialog']
    },

    animations: [],

    ssr: {
      pwa: true,
      prodPort: 3000,
      middlewares: ['render']
    },

    pwa: {
      workboxMode: 'generateSW',
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
      useFilenameHashes: true
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      inspectPort: 5858,
      bundler: 'packager',
      packager: {},

      builder: {
        appId: 'quasarcrud'
      }
    },

    bex: {
      contentScripts: ['my-content-script']
    }
  }
})
