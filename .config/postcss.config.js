module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-discard-duplicates'),
    require('cssnano')({
      preset: 'default',
    })
  ]
}
