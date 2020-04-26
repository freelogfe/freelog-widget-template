const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/v1',
        createProxyMiddleware({
            target: 'http://qi.testfreelog.com',
            changeOrigin: true,
        })
    );
};