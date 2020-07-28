module.exports = {
  devServer: {
    https: true,
    proxy: {
      '^/api': {
        target: 'http://localhost:1337/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api':'' //remove /service/api
        }
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'BugTrack',
    themeColor: '#4DBA87',
    msTileColor: '#4DBA87',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      background_color: '#4DBA87',
      color: '#FFFFFF'
    },

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'dev/sw.js',
      // ...other Workbox options...
    }
  }
}
