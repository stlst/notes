const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const entryUtil = require("./webpack.entry.util");
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const GettextHtmlPlugin = require('gettext-html-plugin');

// module.exports = {
//   entry: {
//     index: 'index.js',
//   },
//   output: {
//     path: __dirname + '/dist',
//     filename: 'index.js',
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       filename: 'index.html',
//       template: __dirname + '/index.html',
//       chunks: ['index'],
//     }),
//     new HtmlWebpackPlugin({
//       filename: 'zh-cn.html',
//       template: __dirname + '/index.html',
//       chunks: ['index'],
//     }),
//     new GettextHtmlPlugin({
//       langsPath: __dirname + '/langs',
//       sources: {
//         'zh-cn.html': 'zh_CN',
//       },
//     }),
//   ],
// };
const plugins = [
  new CleanWebpackPlugin(),
  // new TransferWebpackPlugin([
  //   {
  //     from: path.resolve(__dirname, "../framework"),
  //     to: "framework",
  //   },
  // ]),
  // new CopyPlugin([
  //   {
  //     from: path.resolve(__dirname, "polyfill.js"),
  //     to: "polyfill.js",
  //   },
  // ]),
  new ExtractTextPlugin('[name].[hash:8].css'),
  // new HtmlWebpackInjector(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, '/../src/index.html'),
    chunks: ['index'],
    minify: {
      // @see https://github.com/kangax/html-minifier#options-quick-reference
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),
  new HtmlWebpackPlugin({
    filename: 'zh-cn.html',
    // template: __dirname + '/index.html',
    template: path.resolve(__dirname, '/../src/index.html'),
    chunks: ['index'],
  }),
  new GettextHtmlPlugin({
    langsPath: path.resolve(__dirname, '/../langs'),
    sources: {
      'zh-cn.html': 'zh_CN',
    },
  }),
  new HtmlWebpackPlugin({
    filename: 'jp.html',
    template: path.resolve(__dirname + '/../src/index.html'),
    chunks: ['index'],
  }),
  new GettextHtmlPlugin({
    langsPath: __dirname + '/../langs',
    sources: {
      'zh-cn.html': 'zh_CN',
      'jp.html': 'jp',
    },
  }),
  new webpack.NamedModulesPlugin(),
  // new webpack.HotModuleReplacementPlugin(),
  // new webpack.NoEmitOnErrorsPlugin(),
];

module.exports = {
  entry: { indexJs: path.resolve(__dirname, '../src/index.js') },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-withimg-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: '[name].[hash:8].[ext]',
          outputPath: 'imgs',
          publicPath: '../../imgs',
          exclude: ['/node_modules/'],
          esModule: false,
        },
      },
      {
        test: /\.css$/,
        exclude: ['/node_modules/'],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '/',
          use: 'css-loader',
        }),
      },
      {
        test: /\.js$/,
        // cacheDirectory缓存loader执行结果，提升打包速度
        loader: 'babel-loader?cacheDirectory',
        exclude: ['/node_modules/'],
        options: {
          presets: ['@babel/preset-env'],
          // 解决chrome打不开的报错问题
          // Uncaught SyntaxError: Duplicate __proto__ fields are not allowed in object literals
          plugins: [['@babel/plugin-transform-runtime'], ['@babel/plugin-transform-modules-commonjs']],
        },
      },
    ],
  },
  plugins: plugins,
  resolve: {
    modules: [
      // 优化模块查找路径
      path.resolve('src'),
      path.resolve('node_modules'),
    ],
  },
};
