import { Paper, Typography } from '@mui/material';
import { IWinningBoardProps } from '../../interfaces';
import { useTheme } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';

const styles = {
	styledPaper: (theme: Theme) => ({
		maxWidth: 290,
		width: '100%',
		height: 40,
		backgroundColor: theme.palette.success.main,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 1,
		padding: '5px',
	}),
};
const WinningBoard = ({ label }: IWinningBoardProps) => {
	const theme = useTheme();

	return (
		<Paper sx={styles.styledPaper(theme)}>
			<Typography variant='subtitle1' sx={{ color: theme.palette.common.white }}>
				{label}
			</Typography>
		</Paper>
	);
};

export default WinningBoard;
