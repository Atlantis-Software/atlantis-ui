
module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  entry: {
    AtlantisUiModule: './index.js'
  },
  output: {
    filename: 'js/[name]-ui.js',
    path: __dirname + '/dist',
    libraryTarget: "umd"
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.less', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(\/node_modules\/|\.spec\.js$)/,
      loader: 'babel-loader'
    }, {
      test: /\.html$/,
      use: [{
        loader: "html-loader",
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
      }]
    }, {
      test: /\.less$/,
      loader: "css-loader!less-loader"
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]&publicPath=../&outputPath=fonts/"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader?name=[name].[ext]&publicPath=../&outputPath=fonts/"
    }]
  },
};
