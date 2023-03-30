import { SectionContainer } from '../../components/MUISection';
import PrimaryLayout from '../../layouts/primary/PrimaryLayout';
import SidebarLayout from '../../layouts/sidebar/SidebarLayout';
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
