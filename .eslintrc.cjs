const { configure, presets } = require('eslint-kit')

module.exports = configure({
  root: __dirname,
  allowDebug: process.env.NODE_ENV !== 'production',

  presets: [
    presets.imports(),
    presets.node(),
    presets.prettier(),
    presets.typescript(),
    presets.react(),
  ],

  extend: {
    ignorePatterns: ['!**/*', 'node_modules', 'dist'],
    rules: {
      'import/extensions': 'off'
    }
  },
})
