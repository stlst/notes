const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyjsPlugin({
        extractComments: false,
        parallel: true, // 开启并行压缩
        sourceMap: false, // 是否开启sourceMap
        uglifyOptions: {
          compress: {
            unused: true, // 是否去掉未关联的函数和变量
            drop_console: true // 是否屏蔽控制台输出
          },
          output: {
            quote_keys: true,
            comments: false // 是否保留注释
          },
          warnings: false // 是否展示warnings
        },
      }),

      // TODO 优化css
      // new OptimizeCssAssetsPlugin({
      //   cssProcessorOptions:{
      //     safe:true,
      //     autoprefixer:{disabled:true}
      //   }
      // })
    ],
  },

});