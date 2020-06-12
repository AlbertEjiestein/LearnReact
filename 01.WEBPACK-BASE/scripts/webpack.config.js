const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path');

module.exports = {
  entry: {
    home: path.resolve(process.cwd(), 'src/home.js'),
    about: path.resolve(process.cwd(), 'src/about.js')
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'js/[name].[chunkHash].js'
  },
  module: {
    rules: [
      {test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']},
      {test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'less-loader']},
      {test: /\.webp|jpg|png$/, use: [ 
          // {
          //   loader: 'file-loader',
          //   options: {
          //     name: 'images/[name].[ext]',
          //     publicPath: '/'
          //   }
          // }
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]',
              publicPath: '/',
              limit: 8192
            }
          }
        ]
      },
      {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack配置",
      template: path.resolve(process.cwd(), './public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkHash:5].css'
    }),
    new CopyWebpackPlugin([
      {from: path.resolve(process.cwd(), 'src/static'), to: path.resolve(process.cwd(), 'dist/static')}
    ])
  ],
  devServer: {
    open: true,
    port: 3000
  }
}