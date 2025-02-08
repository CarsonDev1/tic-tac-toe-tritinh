import { Paper, Typography } from '@mui/material';
import { IPointProps } from '../../interfaces';
import { Theme, useTheme } from '@mui/material/styles';

const styles = {
	scoreBox: (bgColor: string, theme: Theme) => ({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: 80,
		height: 80,
		backgroundColor: bgColor,
		margin: theme.spacing(1),
	}),
};

const Point = ({ label, point, bgColor }: IPointProps) => {
	const theme = useTheme();
	return (
		<Paper sx={styles.scoreBox(bgColor, theme)}>
			<Typography variant='caption'>{label}</Typography>
			<Typography variant='h6'>{point}</Typography>
		</Paper>
	);
};

export default Point;
