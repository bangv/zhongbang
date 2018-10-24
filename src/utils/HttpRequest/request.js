// import axios from 'axios';
//
// const ZHONGBANG = 'zhongbang'
//
// // 开发人员在这里输入开发人员和API地址，如果有开发人员，请在vue.config.js里配置新的代理
// const Modules = {
//   SYS_LOGIN: ZHONGBANG + '/user/login',
// }
//
// /**
//  * method: 'get' or 'post' , 'post'是默认值
//  *
//  * @param options
//  * @returns {*}
//  */
// let request = (options) => {
//   //default options, mixin options
//   let opt = {
//     method: 'post',
//     ...options
//   }
//   console.log('url:', process.env.VUE_APP_HOST + opt['url'])
//   return axios[opt.method](process.env.VUE_APP_HOST + opt['url'], opt['params']);
// }
//
// // request({
// //   url: Modules.SYS_LOGIN,
// //   params: {
// //     mobile: "4634",
// //     pwd: "123456",
// //     verifyCode: "1234"
// //   }
// // }).then(res => {
// //   console.log(res);
// // });
// export {
//   request,
//   Modules
// }
