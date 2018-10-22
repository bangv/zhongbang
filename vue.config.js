module.exports = {
  // options...
  devServer: {
    proxy: {
      "/zhongbang": {
        target: "http://47.107.33.234",
        // pathRewrite: { "^/zhongbang": "" }
      }
    }
  }
};
