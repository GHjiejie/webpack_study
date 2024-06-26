const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 将css打包为一个文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 将上面打包的文件进行一个压缩
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const WebpackBar = require("webpackbar");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/main.js",
    path: path.resolve(__dirname, "dist"),
    // 设置资源模块的输出路径，通常不这样设置，因为这里只有一个资源模块，所以设置为images,需要考虑到后面还有很多不同类型的资源模块
    // assetModuleFilename: "images/[hash][ext][query]",
    // clean: true, //这个方法调用的是底层的fs.rm()方法，所以不会有任何文件被移动到系统的垃圾箱，而是直接删除，所以要小心使用（不推荐）
  },
  // 设置模块
  // module: {
  //   rules: [
  //     // 处理css文件

  //     {
  //       test: /\.css$/,
  //       use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
  //     },
  //     // 处理scss文件
  //     {
  //       test: /\.s[ac]ss$/i,

  //       use: [
  //         MiniCssExtractPlugin.loader,
  //         "css-loader",
  //         "postcss-loader",

  //         "sass-loader",
  //       ],
  //     },
  //     // 处理图片文件
  //     {
  //       test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
  //       type: "asset",
  //       // 配置资源文件的解析方式，小于8kb的资源文件会被解析为base64格式，大于8kb的资源文件会被解析为资源模块
  //       parser: {
  //         dataUrlCondition: {
  //           maxSize: 8 * 1024, // 8kb
  //         },
  //       },
  //       // 设置单独文件资源输出路径
  //       generator: {
  //         filename: "images/[hash:10][ext][query]",
  //       },
  //     },

  //     // 使用babel处理js文件
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: "babel-loader",
  //         // 可以直接在这里设置预设,也可以在.babelrc等(比如babel.config.js)文件中设置
  //         // options: {
  //         //   // 设置预设
  //         //   presets: ["@babel/preset-env"],
  //         // },
  //       },
  //       // 设置单独文件资源输出路径
  //       generator: {
  //         filename: "js/[hash:10][ext][query]",
  //       },
  //     },
  //   ],
  // },
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/i,
        oneOf: [
          // 处理css文件
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
          },
          // 处理scss文件
          {
            test: /\.s[ac]ss$/i,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader",
            ],
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
        generator: {
          filename: "images/[hash:10][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        oneOf: [
          {
            use: {
              loader: "babel-loader",
            },
            generator: {
              filename: "js/[hash:10][ext][query]",
            },
          },
        ],
      },
    ],
  },
  // 配置插件
  plugins: [
    new HtmlWebpackPlugin({
      // 设置模板文件，打包时会根据此模板生成html文件，同时引入打包后的js文件
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin({
      // 这里面可以实现很多功能，比如删除指定文件，删除指定文件夹，删除指定文件夹下的文件，删除指定文件夹下的指定文件等等
      // cleanOnceBeforeBuildPatterns: ["**/*"],
    }),
    // 将css打包成一个css文件
    new MiniCssExtractPlugin({
      // 设置css文件的输出路径
      filename: "css/[name].[contenthash:8].css",
    }),
    // 压缩css文件
    new CssMinimizerPlugin(),
    // 显示打包进度
    new WebpackBar(),
  ],

  // 配置代码优化选项
  optimization: {
    // 设置为true,表示开启代码压缩,在开发环境下默认是false,在生产环境下默认是true
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },

  // 配置开发服务器

  devServer: {
    host: "localhost",
    port: 8080,
    // 开启热更新
    hot: true,
    open: true,
  },
  // 设置模式
  mode: "development",
};
