import { Paper, Typography } from '@mui/material';
import { colorPallete } from '../../assets';
import { INoticeBoardProps } from '../../interfaces';
import { useTheme } from '@mui/material/styles';
const styles = {
	styledPaper: (color: string) => ({
		maxWidth: 250,
		width: '100%',
		height: 40,
		backgroundColor: color,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	}),
};
const NoticeBoard = ({ player }: INoticeBoardProps) => {
	const theme = useTheme();
	const renderColor = (player: string): string => {
		if (player === 'X') {
			return colorPallete.primary_blue;
		}
		return colorPallete.primary_yellow;
	};
	return (
		<Paper sx={styles.styledPaper(renderColor(player))}>
			<Typography variant='h6' sx={{ color: theme.palette.common.black }}>
				{player ? player : 'X'} turn
			</Typography>
		</Paper>
	);
};

export default NoticeBoard;
