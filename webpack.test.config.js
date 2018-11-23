var path = require('path');

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
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        exclude: /\.spec/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(\/node_modules\/|\.spec\.js$)/,
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
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
        test: /\.less$/,
        use: [
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]&publicPath=../&outputPath=fonts/',
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          'file-loader?name=[name].[ext]&publicPath=../&outputPath=fonts/'
        ]
      }
    ]
  },
};
