module.exports = {
    // options...
    devServer: {
        proxy: {
            '/xiaocong': {
                target: 'http://dev-swagger.esmart365.com:5012',
                pathRewrite: {'^/xiaocong' : ''}
            },
            '/liuyi': {
                target: 'http://dev-swagger.esmart365.com:5002',
                pathRewrite: {'^/liuyi' : ''}
            }
        }
    }
}
