module.exports = {
  packagerConfig: {
    // icon: './static/icon.ico'
  },
  makers: [
    new (require('@electron-forge/maker-zip').default)({
      platforms: ['zip32']
    }),
    // TODO: project different output for the next release
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