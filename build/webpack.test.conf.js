// process.env.NODE_ENV = 'development'
const path = require('path')

const webpack = require('webpack')

const merge = require('webpack-merge') // 用来把基础配置文件融合到开发环境配置文件

const baseWebpackConfig = require('./webpack.base.conf') // 定义基础配置文件

const HtmlWebPackPlugin = require('html-webpack-plugin') // 动态生成html插件

const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin') // Html文件美化插件

const CleanWebpackPlugin = require('clean-webpack-plugin') // 清空打包目录的插件

const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制静态资源的插件

// 定义开发环境的配置
const testWebpackConfig = merge(baseWebpackConfig, {
  // 开发模式
  mode: 'development',

  // 报错的时候在控制台输出源码的位置 ( 开发环境 cheap-module-eval-source-map, 生产环境 cheap-module-source-map )
  devtool: 'cheap-module-eval-source-map',

  //
  plugins: [
    // 动态生成html插件
    new HtmlWebPackPlugin({
      template: './src/index.html', // html模板路径
      filename: './index.html', // 生成的html存放路径，相对于 output.path
      minify: true, // 压缩
      hash: true, // 防止缓存，在引入的文件后面加hash (PWA就是要缓存，默认为true)
      inject: true // 是否将 js 放在body的末尾
    }),

    // 开发环境，美化生成的Html文件
    new HtmlBeautifyPlugin({
      config: {
        html: {
          end_with_newline: true,
          indent_size: 2,
          indent_inner_html: true,
          unformatted: ['p', 'i', 'b', 'span']
        }
      },
      replace: ['type="text/javascript"']
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
      { copyUnmodified: true }
    ),

    // 每次打包前清理文件夹
    new CleanWebpackPlugin(
      [
        '../dist/*.*', // 删除dist文件夹里面的所有文件
        '../dzcx_h5sp/act3/*.*' // 删除dzcx_h5sp/act3文件夹里面的所有文件
      ],
      {
        allowExternal: true, // 允许插件清理webpack配置文件根目录(即build文件夹)之外的文件夹
        beforeEmit: true // 在将文件发送到输出目录之前执行clean,默认是false,为了兼容上面的静态copy插件，必须要设为true
      }
    )
  ]
})

// 导出配置
module.exports = testWebpackConfig
