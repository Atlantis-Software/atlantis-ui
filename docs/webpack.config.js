var webpack = require('webpack');
var path = require('path');
var fse = require('fs-extra');

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
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.html', '.less', '.js', '.ts'],
    alias: {
      "moment": "moment/min/moment-with-locales.js",
      "atlantis-ui-css": path.join(__dirname, "dist", "atlantis.css"),
      "atlantis-ui": path.join(__dirname, "dist", "js", "atlantis-ui.js")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" }
        ]
      },
      {
        test: /\.html$/,
        use: [
          { loader: "html-loader",
            options: {
              minimize: true,
              removeAttributeQuotes: false,
              caseSensitive: true,
              customAttrSurround: [
                [/#/, /(?:)/],
                [/\*/, /(?:)/],
                [/\[?\(?/, /(?:)/]
              ],
              customAttrAssign: [/\)?\]?=/]
            }
          }
        ]

      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          { loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]&publicPath=compiled/fonts/&outputPath=fonts/" }
        ]
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          { loader: "file-loader?name=[name].[ext]&publicPath=compiled/fonts/&outputPath=fonts/" }
        ]
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.jpg$/,
        use: [
          { loader: "file-loader?name=[name].[ext]&publicPath=compiled/img/&outputPath=img/" }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core/,
      path.resolve(__dirname, '../src')
    )
  ]
};
