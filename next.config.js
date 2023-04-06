/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['i.pravatar.cc', 'image.tmdb.org'],
	},
	redirects: async () => [
		{
			source: '/',
			destination: '/explore',
			permanent: false,
		},
	],
};

module.exports = nextConfig;
