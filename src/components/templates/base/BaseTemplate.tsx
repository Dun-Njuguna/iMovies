import Box from '@mui/material/Box';
import styles from './BaseTemplate.module.css';

export interface IBaseTemplate {
	sampleTextProp: string;
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ sampleTextProp }) => {
	return <Box className={styles.container}>{sampleTextProp}</Box>;
};

export default BaseTemplate;
