const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const prdConfig = {
  mode: "production",
  output: {
    /* 文件名 */
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      })
    ],
    splitChunks: {
      name: false,
      cacheGroups: {
        vendors: {
          name: "vendors",
          priority: -10,
          chunks: "initial",
          minChunks: 1
        }
      }
    },
  },
}

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return prdConfig;
    } else {
      return {};
    }
  }
}