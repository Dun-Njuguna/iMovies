import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';
import styles from './PrimaryLayout.module.css';

export interface IPrimaryLayout {}

const PrimaryLayout: React.FC<PropsWithChildren<IPrimaryLayout>> = ({
	children,
}) => {
	return (
		<Box className={styles.main} px={{ xs: '1rem', md: '3rem' }} py="5rem">
			{children}
		</Box>
	);
};

export default PrimaryLayout;
