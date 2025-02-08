import { Paper, Typography } from '@mui/material';
import { colorPallete } from '../../assets';
import { IPlayBoxProps } from '../../interfaces';
import { Theme, useTheme } from '@mui/material/styles';
const styles = {
	styledPaper: (theme: Theme, playing: boolean) => ({
		width: 80,
		height: 80,
		margin: theme.spacing(1),
		backgroundColor: colorPallete.box,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: playing ? 'pointer' : 'auto',
		'&:hover': {
			backgroundColor: playing && colorPallete.secondary_purple,
		},
	}),
};
const PlayBox = ({ check, onClickPlay, playing }: IPlayBoxProps) => {
	const theme = useTheme();
	const renderColor = (character: string): string => {
		if (character === 'X') return colorPallete.primary_blue;
		return colorPallete.primary_yellow;
	};

	const handleOnClickPlay = playing ? onClickPlay : undefined;
	return (
		<Paper sx={styles.styledPaper(theme, playing)} onClick={handleOnClickPlay}>
			<Typography variant='h3' sx={{ color: renderColor(check), fontWeight: 800 }}>
				{check}
			</Typography>
		</Paper>
	);
};

export default PlayBox;
