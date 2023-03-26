/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['i.pravatar.cc'],
	},
	redirects: async () => [
		{
			source: '/',
			destination: '/explore',
			permanent: true,
		},
	],
};

module.exports = nextConfig;
