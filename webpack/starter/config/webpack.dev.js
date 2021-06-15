const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');



module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    liveReload: false,
    // hot: true,
    open: true,
    contentBase: path.resolve('/dist'),
    port: 8002,
    inline: false,
  },
  optimization: {
    minimizer: [
      new UglifyjsPlugin({
        uglifyOptions: {
          output: {
            quote_keys: true,
          },
          compress: {
            drop_console: true, // drop_console在production模式下才生效
          },
        },
      }),
    ],
  },

});