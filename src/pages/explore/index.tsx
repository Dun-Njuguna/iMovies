import { mockCatCardProps } from '../..//components/cards/cat/CatCard.mocks';
import CatCard from '../../components/cards/cat/CatCard';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../../components/layouts/sidebar/SidebarLayout';
import styles from '../../styles/Home.module.css';
import { NextPageWithLayout } from '../page';

const Dashboard: NextPageWithLayout = () => {
	return (
		<section className={styles.main}>
			<h1 className={styles.title}>
				Welcome to <a href="https://nextjs.org">Next.js!</a>
			</h1>
			<CatCard {...mockCatCardProps.base} />
		</section>
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
