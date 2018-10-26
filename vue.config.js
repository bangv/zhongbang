module.exports = {
  // options...
  // 基本路径
  baseUrl: './',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  devServer: {
    proxy: 'http://47.107.33.234'
  }
};
