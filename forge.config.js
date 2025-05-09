module.exports = {
  packagerConfig: {
    // icon: './static/icon.ico'
  },
  makers: [
    new (require('@electron-forge/maker-zip').default)({
      platforms: ['zip32']
    }),
    // {
    //   name: '@electron-forge/maker-squirrel',
    //   config: {
    //     name: 'SystemObserverWidget',
    //     // setupIcon: './static/icon.ico',
    //     noMsi: true,
    //     setupExe: 'SystemObserverWidgetSetup.exe',
    //     setupDir: './build'
    //   }
    // }
  ]
}