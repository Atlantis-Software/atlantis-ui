var webpack = require('webpack');
var path = require('path');
var less = require('less');
var fse = require('fs-extra')

fse.copy('../dist/', 'dist/', function(err) {
  if (err) return console.log('ERROR DIST CREATE FILE : ', err)
});


module.exports = {
  entry: {
    atlantis: path.join(__dirname, 'src', 'index.js')
  },
  output: {
    path: path.join(__dirname, 'compiled'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  devtool : 'source-map',
  resolve : {
    modules: ['node_modules'],
    extensions: ['.html','.less', '.js', '.ts'],
    alias: {
      "@angular/core": "@angular/core/bundles/core.umd.js",
      "@angular/router": "@angular/router/bundles/router.umd.js",
      "@angular/common": "@angular/common/bundles/common.umd.js",
      "@angular/compiler": "@angular/compiler/bundles/compiler.umd.js",
      "@angular/platform-browser": "@angular/platform-browser/bundles/platform-browser.umd.js",
      "@angular/platform-browser/animations": "@angular/platform-browser/bundles/platform-browser-animations.umd.js",
      "@angular/platform-browser-dynamic": "@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
      "@angular/forms": "@angular/forms/bundles/forms.umd.js",
      "@angular/animations": "@angular/animations/bundles/animations.umd.js",
      "@angular/animations/browser": "@angular/animations/bundles/animations-browser.umd.js",
      "jquery": "jquery/dist/jquery.js",
      "moment": "moment/min/moment-with-locales.js",
      "atlantis-ui-css": path.join(__dirname,"dist","css","atlantis-ui.css"),
      "atlantis-ui-js": path.join(__dirname, "dist","js","atlantis-ui.js"),
      "atlantis-ui-ngx": path.join(__dirname, "dist", "js", "ngxAtlantis-ui.js")
    }
  },
  module : {
    loaders : [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      { test: /\.html$/, loader: "html-loader", options : {
          minimize: true,
          removeAttributeQuotes: false,
          caseSensitive: true,
          customAttrSurround: [[/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/]],
          customAttrAssign: [/\)?\]?=/]
        }
      },
      {
       test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
       loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]&publicPath=compiled/&outputPath=fonts/"
      }, {
       test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
       loader: "file-loader?name=[name].[ext]&publicPath=compiled/&outputPath=fonts/"
      },
      {
      test: /\.less$/,
      include: /node_modules/,
      loader: 'style-loader!css-loader!less-loader'
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.jpg$/, loader: "file-loader?name=[name].[ext]&publicPath=compiled/&outputPath=img/"}
    ]
  }
}
