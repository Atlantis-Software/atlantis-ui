var ExtractTextPlugin = require("extract-text-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  target: 'web',
  entry: {
    atlantis : './index.js'
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
    rules: [
      {
        test: /\.js$/,
        exclude: /(\/node_modules\/|\.spec\.js$)/,
        use: [
          { loader: 'babel-loader' }
        ]
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
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ]
      }
      , {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {  minimize: true }
          }
        ],
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          { loader:'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]&publicPath=../fonts/&outputPath=fonts/' }
        ]
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          { loader:'file-loader?name=[name].[ext]&publicPath=../fonts/&outputPath=fonts/' }
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin("atlantis.css"),
    // new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  externals: [
    {
      "moment" : "moment"
    },
    /^\@angular\//,
    /^rxjs\//
  ]
};
