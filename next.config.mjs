/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		loader: 'akamai',
		path: '',
	},
	assetPrefix: './',
	redirects: async () => [
		{
			source: '/',
			destination: '/explore',
			permanent: false,
		},
	],
};

module.exports = nextConfig;
