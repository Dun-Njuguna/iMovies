import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../../components/layouts/sidebar/SidebarLayout';
import { SectionContainer } from '../../components/MUISection';
import { NextPageWithLayout } from '../page';

const CommingSoon: NextPageWithLayout = () => {
	return (
		<SectionContainer>
			<div>Comming Soon</div>
		</SectionContainer>
	);
};

export default CommingSoon;

CommingSoon.getLayout = (page) => {
	return (
		<PrimaryLayout>
			<SidebarLayout />
			{page}
		</PrimaryLayout>
	);
};
