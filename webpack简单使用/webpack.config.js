const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 将css打包为一个文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 将上面打包的文件进行一个压缩
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    // 设置资源模块的输出路径，通常不这样设置，因为这里只有一个资源模块，所以设置为images,需要考虑到后面还有很多不同类型的资源模块
    // assetModuleFilename: "images/[hash][ext][query]",
    // clean: true, //这个方法调用的是底层的fs.rm()方法，所以不会有任何文件被移动到系统的垃圾箱，而是直接删除，所以要小心使用（不推荐）
  },

  // 设置模块
  module: {
    rules: [
      // 处理css文件
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // 处理scss文件
      {
        test: /\.s[ac]ss$/i,
        // use: ["style-loader", "css-loader", "sass-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      // 处理图片文件
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset",
        // 配置资源文件的解析方式，小于8kb的资源文件会被解析为base64格式，大于8kb的资源文件会被解析为资源模块
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
        // 设置单独文件资源输出路径
        generator: {
          filename: "images/[hash:10][ext][query]",
        },
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
  ],

  // 配置代码优化选项
  // optimization: {
  //   minimizer: [new CssMinimizerPlugin()],
  // },

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
