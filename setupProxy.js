const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/.netlify/functions/',
		createProxyMiddleware({
			target: 'http://localhost:8888',
			pathRewrite: {
				'^/\\.netlify/functions': '',
			},
		}),
	);
};
