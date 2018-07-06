'use strict'

const path = require('path') // 获取绝对路径用

const devMode = process.env.NODE_ENV !== 'production' // 定义开发环境

const MiniCssExtractPlugin = require('mini-css-extract-plugin') // CSS文件单独提取出来(生产环境)

const HappyPack = require('happypack') // 多线程打包, 提升打包速度

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // webpack 错误信息提示插件

const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loader插件

module.exports = {
  /**
   * 1. __dirname 为node全局对象，是当前文件所在目录
   * 2. context   为 查找 entry 和 部分插件的 前置路径
   */
  context: path.resolve(__dirname, '../'), // 相当于设置了一个参考系，现在的标准目录环境为该配置文件的上一级

  // 入口文件, 可以配置多个
  entry: {
    main: './src/index.js' // 因为已经有 context, 这里直接使用相对路径就好
    // vendor: ""          // 多个页面面所需的公共库文件, 防止重复打包带入
  },

  // 出口
  output: {
    filename: devMode ? '[name].js' : '[name].bundle.js ? [hash:5]', // 生产环境下 动态绑定 + hash ; 开发环境下不能有hash
    path: path.join(__dirname, '../dist')
  },

  plugins: [
    // 生成css插件，只用于打包生产环境，测试环境这样设置会影响 HMR(热重载)
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].css ? [hash:5]',
      chunkFilename: devMode ? '[id].css' : '[id].css ? [hash:5]'
    }),

    // 更清晰的错误提示插件
    new FriendlyErrorsPlugin(),

    // 多线程编译，加快打包速度
    new HappyPack({
      id: 'babel', // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      loaders: ['babel-loader?cacheDirectory=true'] // 如何处理 .js 文件，用法和 Loader 配置中一样
    }),

    new HappyPack({
      id: 'vue',
      loaders: ['vue-loader']
    }),

    // vue-loader 插件
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      /* 加载器 */

      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // // vue-loader
      // {
      //   test: /\.vue$/,
      //   use: 'vue-loader',
      //   // options: vueLoaderConfig,
      //   include: path.resolve(__dirname, '../src')
      // },

      // babel
      {
        // 用 babel 提供ES6语法解析
        test: /\.js$/,
        use: 'happypack/loader?id=babel',
        exclude: /node_modules/
      },

      {
        // html加载器
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: process.env.NODE_ENV !== 'production' } // 打包的时候自动压缩
          }
        ]
      },

      // css
      {
        // css加载器
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            // fallback to style-loader in development
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
            // loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true, // 压缩css 可以被cssnano取代
              sourceMap: true, // 默认情况下不启用它们，因为它们会导致运行时的额外开销，并增加了 bundle 大小 (JS source map 不会)
              modules: false // 命名模块化，默认为false
              // importLoaders: 1 // 当css模块生效时，并且要同时使用postcss加载器，那么此选项是必须的
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                require('postcss-import')({ root: loader.resourcePath }), // 在@import css文件的时候让webpack监听并编译
                require('postcss-cssnext')({}), // cssnext可以让你写CSS4的语言，并能配合autoprefixer进行浏览器兼容的不全，而且还支持嵌套语法
                // require('autoprefixer')({browsers: "ie >= 9"}), // 浏览器兼容前缀补全
                require('cssnano')({}), // 压缩优化css代码
                require('postcss-px2rem')({ remUnit: 16, baseDpr: 2 }),
                require('postcss-plugins-px2rem')({ remUnit: 16, baseDpr: 2 })
              ]
            }
          }
        ]
      },

      // less
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
        include: path.resolve(__dirname, '../src')
      },

      // file-loader 解决 css 等文件中引入图片路径的问题
      // url-loader 当图片较小的时候会把图片 BASE64 编码，大于 limit 参数的时候还是使用 file-loader 进行拷贝
      // (\?.*)? 匹配带 ? 资源路径，css字体配置中可能带版本信息
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?/,
        use: {
          loader: 'url-loader',
          options: {
            name: devMode ? 'img/[name].[ext]' : 'img/[name].[hash:7].[ext]', // 为防止图片名重复, 为图片名添加一串哈希值, 最高 32 位
            limit: 3145728
          }
        }
      },

      {
        test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: devMode ? 'fonts/[name].[ext]' : 'fonts/[name].[hash:7].[ext]'
          }
        }
      },

      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: devMode ? 'media/[name].[ext]' : 'media/[name].[hash:7].[ext]'
        }
      },

      {
        // 源码映射，报错时指向源码而不是编译后的代码
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },

      // Eslint
      {
        enforce: 'pre', // 防止和其他加载器冲突
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css', '.vue'], // 后缀名自动补全
    alias: {
      // 配置别名可以加快 webpack 查找模块的速度
      components: './src/components/',
      '@': path.resolve(__dirname, 'src')
    }
  }
}
