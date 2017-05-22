var webpack = require('webpack');
var less = require('less');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackShellPlugin = require('webpack-shell-plugin');
var fse = require('fs-extra');

module.exports = {
  context: __dirname,
  entry: {
    atlantis : './atlantis-ui.js',
    ngxAtlantis : './ngx-atlantis-ui.js'
  },
  output: {
    filename: 'js/[name]-ui.js',
    path: __dirname + '/dist',
    libraryTarget: "umd"
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.less','.js']
  },
  module : {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options : {
              minimize : true,
              removeAttributeQuotes: false,
              caseSensitive: true,
              customAttrSurround: [[/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/]],
              customAttrAssign: [/\)?\]?=/]
            }
          }
        ]
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!less-loader"})
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        options: {
          minimize: true
        }
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]&publicPath=../&outputPath=fonts/"
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=[name].[ext]&publicPath=../&outputPath=fonts/"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("css/atlantis-ui.css"),
    new WebpackShellPlugin({
      onBuildEnd: [
        'cp -r dist/ docs/'
      ]
    })
  ],
  externals: [
    {
      "moment" : "moment",
      "jquery" : "jQuery"
    },
    /^\@angular\//,
    /^rxjs\//
  ]
}

fse.copy('./dist/', './docs/', function(err) {
  if (err) return console.log('ERROR DIST CREATE FILE : ', err)
});
