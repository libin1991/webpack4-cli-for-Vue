// process.env.NODE_ENV = 'production'

const path = require('path')

const baseWebpackConfig = require('./webpack.base.conf') // 定义基本配置文件

const merge = require('webpack-merge') // 用来把基础配置文件融合到开发环境配置文件

const HtmlWebpackPlugin = require('html-webpack-plugin') // 动态生成html的插件

const CleanWebpackPlugin = require('clean-webpack-plugin') // 清空打包目录的插件

const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制静态资源的插件

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css插件

const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 代码压缩插件，webpack本身自带了，引入这个是为了配置参数

const proWebpackConfig = merge(baseWebpackConfig, {
  // 生产模式
  mode: 'production',

  // 开发环境 cheap-module-eval-source-map, 生产环境 cheap-module-source-map
  devtool: 'cheap-module-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // html模板路径
      filename: './index.html', // 生成的html存放路径，相对于 output.path
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

    // 复制静态资源的插件 为了同时使用这个插件与清理插件，需要npm run build两次
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(__dirname, '../dist'),
          to: path.resolve(__dirname, '../dzcx_h5sp/act3'),
          force: true,
          toType: 'dir',
          ignore: ['.*']
        }
      ],
      {
        copyUnmodified: true
      }
    ),

    // 每次打包前清理文件夹
    new CleanWebpackPlugin(
      [
        '../dist/*.*', // 删除dist文件夹里面的所有文件
        '../dzcx_h5sp/act3/*.*' // 删除dzcx_h5sp/act3文件夹里面的所有文件
      ],
      {
        allowExternal: true, // 允许插件清理webpack配置文件根目录之外的文件夹
        beforeEmit: true // 在将文件发送到输出目录之前执行clean,默认是false,为了兼容上面的静态copy插件，必须要设为true
      }
    )

    // // 生成css插件，只用于打包生产环境，测试环境这样设置会影响 HMR(热重载)
    // new MiniCssExtractPlugin({
    //     // Options similar to the same options in webpackOptions.output
    //     // both options are optional
    //     filename: devMode ? '[name].css' : '[name].css?[hash:5]',
    //     chunkFilename: devMode ? '[id].css' : '[id].css?[hash:5]',
    // }),
  ],

  // optimization: {
  //     minimize: true,
  //     nodeEnv: 'production',
  //     sideEffects: true,
  //     concatenateModules: true,
  //     splitChunks: { chunks: 'all' },
  //     runtimeChunk: true,
  // },

  optimization: {
    // 打包优化
    minimizer: [
      // 压缩代码 ( webpack已经内置了，这里是因为想要配置一些参数 )
      new UglifyJsPlugin({
        cache: true,
        // compress: {
        //     // drop_console: true // 是否删除代码中所有的console
        // },
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      // 压缩css
      new OptimizeCSSAssetsPlugin({})
    ],
    // 公共代码提取
    splitChunks: {
      chunks: 'all',
      name: 'common'
    },
    runtimeChunk: {
      name: 'runtime'
    }
  }
})

module.exports = proWebpackConfig
