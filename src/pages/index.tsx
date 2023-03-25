import { mockCatCardProps } from '../components/cards/cat/CatCard.mocks';
import CatCard from '../components/cards/cat/CatCard';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout';
import { SectionContainer } from '../components/MUISection/index.js';
import { NextPageWithLayout } from './page';

const Dashboard: NextPageWithLayout = () => {
	return (
		<SectionContainer>
			<h1>
				Welcome to <a href="https://nextjs.org">Next.js!</a>
			</h1>
			<CatCard {...mockCatCardProps.base} />
		</SectionContainer>
	);
};

export default Dashboard;

Dashboard.getLayout = (page) => {
	return (
		<PrimaryLayout>
			<SidebarLayout />
			{page}
		</PrimaryLayout>
	);
};
