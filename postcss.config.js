const autoprefixer = require('autoprefixer') // eslint-disable-line
const postcssPresetEnv = require('postcss-preset-env') // eslint-disable-line

module.exports = {
  plugins: [
    autoprefixer(),
    postcssPresetEnv({
      stage: 0,
    }),
  ],
}
