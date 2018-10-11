// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {
      browsers: [
        '> 1%',
        'last 2 versions',
        'not ie <= 20',
        'not ie_mob <= 100',
        'not ff <= 100',
        'not and_ff <= 100',
        'not Edge <= 100',
        'Android >= 4.0'
      ]
    }
  }
}
