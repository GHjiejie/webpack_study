module.exports = {
  plugins: {
    "postcss-preset-env": {
      // 用于指定浏览器的兼容性，这里我们指定兼容最近的两个版本的浏览器，使用人数占比大于1%的浏览器，不兼容的浏览器不需要考虑
      browsers: ["last 2 versions", ">1%", "not dead"],
      // 也可以指定浏览器的版本
      // target: {
      //   chrome: "58",
      //   ie: "11",
      // },
      // 控制是否自动添加浏览器前缀
      // autoprefixer: false,
    },
  },
};
