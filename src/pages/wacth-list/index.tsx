import { AppBar } from '@mui/material';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../../components/layouts/sidebar/SidebarLayout';
import { SectionContainer } from '../../components/MUISection';
import { NextPageWithLayout } from '../page';

const WacthList: NextPageWithLayout = () => {
	return (
		<SectionContainer>
			<div>WacthList</div>
		</SectionContainer>
	);
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
