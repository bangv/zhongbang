import axios from 'axios';
const XIAOCONG = 'xiaocong';
const LIUYI = 'liuyi'

// 开发人员在这里输入开发人员和API地址，如果有开发人员，请在vue.config.js里配置新的代理
const Modules = {
    SYS_LOGIN: XIAOCONG + '/v1/management/merchant/login'
}

/**
 * method: 'get' or 'post' , 'post'是默认值
 *
 * @param options
 * @returns {*}
 */
let request = (options) => {
    //default options, mixin options
    let opt = {
        method: 'post',
        ...options
    }
    console.log('url:', process.env.VUE_APP_HOST + opt['url'])
    return axios[opt.method](process.env.VUE_APP_HOST + opt['url'], opt['params'])
}

export {
    request,
    Modules
}