var webpack = require('webpack');
var path = require('path');
var less = require('less');

// Webpack Config


module.exports = {
  entry: {
    atlantis: path.join(__dirname, 'src', 'index.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
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
      "@angular/platform-browser-dynamic": "@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
      "@angular/forms": "@angular/forms/bundles/forms.umd.js",
      "jquery": "jquery/dist/jquery.js",
      "moment": "moment/min/moment-with-locales.js",
      // "atlantis-ui-ngx" : "atlantis-ui/dist/js/ngxAtlantis-ui.js",
      "atlantis-ui-less":"atlantis-ui/less/atlantis-ui.less",
      "atlantis-ui-js": path.join(__dirname, '../',"dist/js/atlantis-ui.js"),
      "atlantis-ui-ngx": path.join(__dirname, './',"ngxAtlantis-ui.js"),
      // "atlantis-ui-less": path.join(__dirname, '../',"less/atlantis-ui.less"),
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
       loader: "url-loader?limit=10000&mimetype=application/font-woff&name=../fonts/[name].[ext]"
      }, {
       test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
       loader: "file-loader?name=../fonts/[name].[ext]"
      },
      {
      test: /\.less$/,
      include: /node_modules/,
      loader: 'style-loader!css-loader!less-loader'
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }
}
