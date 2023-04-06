import { SectionContainer } from '../../components/MUISection';
import PrimaryLayout from '../../layouts/primary/PrimaryLayout';
import SidebarLayout from '../../layouts/sidebar/SidebarLayout';
import { NextPageWithLayout } from '../page';

const WacthList: NextPageWithLayout = () => {
	return <SectionContainer>WacthList</SectionContainer>;
};

export default WacthList;

WacthList.getLayout = (page) => {
	return (
		<PrimaryLayout>
			<SidebarLayout />
			{page}
		</PrimaryLayout>
	);
};
