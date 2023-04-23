import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { SxProps, Theme, styled } from '@mui/material/styles';

import { SvgIconProps } from '@mui/material';

export interface IHighlightCard {
	title?: string;
	sx?: SxProps<Theme> | undefined;
	iconSx?: SxProps<Theme> | undefined;
	Icon?: React.ComponentType<SvgIconProps<'svg', {}>> | undefined;
}

const HighlightCard: React.FC<IHighlightCard> = ({
	title,
	sx,
	Icon,
	iconSx,
}) => {
	return (
		<StyledHighlightCard sx={sx}>
			<Box
				sx={{
					gap: {xs: 1, md:4},
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				{Icon && <Icon sx={iconSx} />}
				{title && (
					<Typography variant={Icon ? 'h6' : 'subtitle1'}>{title}</Typography>
				)}
			</Box>
		</StyledHighlightCard>
	);
};

const StyledHighlightCard = styled(Card)(({ theme, sx }) => ({
	border: `1px solid ${theme.palette.secondary.main}`,
	borderRadius: 50,
	color: theme.palette.secondary.main,
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	sx,
}));

export default HighlightCard;
