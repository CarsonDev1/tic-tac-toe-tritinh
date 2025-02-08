import { Box, Button, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { colorPallete } from '../../assets';
import tictactoeImg from '../../assets/img/tic-tac-toe.png';
import PlayBox from '../play-box';
import Point from '../point';
import { Theme } from '@mui/material/styles';
import NoticeBoard from '../notice-board';
import { IWinner } from '../../interfaces';
import WinningBoard from '../winning-board';

const customStyles = {
	container: (theme: Theme) => ({
		backgroundColor: colorPallete.secondary,
		padding: theme.spacing(3),
		borderRadius: theme.shape.borderRadius,
		maxWidth: '90%',
		margin: 'auto',
		height: 'auto',
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(5),
			maxWidth: 300,
			height: '70%',
		},
		[theme.breakpoints.between('xs', 'md')]: {
			padding: theme.spacing(5),
			maxWidth: 300,
			height: 'auto',
		},
	}),
	newGameButton: (theme: Theme) => ({
		color: theme.palette.common.black,
		backgroundColor: theme.palette.common.white,
		width: '100%',
		'&:hover': {
			backgroundColor: colorPallete.secondary_blue,
			border: `1px solid ${colorPallete.primary_blue}`,
		},
	}),
	infoSection: {
		paddingTop: 2,
	},
};

const TicTacToeGame = () => {
	const [board, setBoard] = useState<string[]>(Array(9).fill(''));
	const [currentTurn, setCurrentTurn] = useState<boolean>(true);
	const [currentPlayer, setCurrentPlayer] = useState<string>('X');
	const [gameActive, setGameActive] = useState<boolean>(false);
	const [scoreX, setScoreX] = useState<IWinner>({ name: '', point: 0 });
	const [scoreO, setScoreO] = useState<IWinner>({ name: '', point: 0 });
	const [drawScore, setDrawScore] = useState<IWinner>({ name: '', point: 0 });
	const [moveCount, setMoveCount] = useState<number>(0);

	const winningPatterns: number[][] = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	const evaluateWinner = (grid: string[]) => {
		for (const [a, b, c] of winningPatterns) {
			if (grid[a] && grid[a] === grid[b] && grid[b] === grid[c]) {
				return grid[a];
			}
		}
		return null;
	};

	const handleCellClick = (index: number) => () => {
		if (board[index] !== '') return;
		const updatedBoard = [...board];
		updatedBoard[index] = currentTurn ? 'X' : 'O';
		setCurrentPlayer(currentTurn ? 'O' : 'X');
		setBoard(updatedBoard);
		setCurrentTurn(!currentTurn);
	};

	const startNewGame = () => {
		setBoard(Array(9).fill(''));
		setGameActive(true);
		setMoveCount(0);
		setScoreX((prev) => ({ ...prev, name: '' }));
		setScoreO((prev) => ({ ...prev, name: '' }));
		setDrawScore((prev) => ({ ...prev, name: '' }));
	};

	useEffect(() => {
		const winner = evaluateWinner(board);
		setMoveCount((prev) => prev + 1);

		if (winner === 'X') {
			setScoreX((prev) => ({ name: 'X', point: prev.point + 1 }));
			setGameActive(false);
		} else if (winner === 'O') {
			setScoreO((prev) => ({ name: 'O', point: prev.point + 1 }));
			setGameActive(false);
		} else if (moveCount === 9 && !winner) {
			setDrawScore((prev) => ({ name: 'draw', point: prev.point + 1 }));
			setGameActive(false);
		}
	}, [board]);

	return (
		<Stack sx={{ height: '100vh', backgroundColor: colorPallete.primary }}>
			<Box sx={customStyles.container}>
				<Grid container justifyContent='center'>
					<Point label='PLAYER X' point={scoreX.point} bgColor={colorPallete.primary_blue} />
					<Point label='DRAW' point={drawScore.point} bgColor={colorPallete.secondary_blue} />
					<Point label='PLAYER O' point={scoreO.point} bgColor={colorPallete.primary_yellow} />
				</Grid>

				<Grid container justifyContent='center'>
					{board.map((cell, idx) => (
						<PlayBox key={idx} check={cell} onClickPlay={handleCellClick(idx)} playing={gameActive} />
					))}
				</Grid>

				{gameActive && (
					<Grid container justifyContent='center'>
						<NoticeBoard player={currentPlayer} />
					</Grid>
				)}

				<Stack sx={customStyles.infoSection}>
					{scoreX.name && <WinningBoard label='Player X Wins!' />}
					{scoreO.name && <WinningBoard label='Player O Wins!' />}
					{drawScore.name && <WinningBoard label='It’s a Draw' />}

					{!gameActive && (
						<div>
							{scoreX.point >= 1 || scoreO.point >= 1 || drawScore.point >= 1 ? (
								<Grid container justifyContent='center' paddingTop={1}>
									<Button sx={customStyles.newGameButton} onClick={startNewGame}>
										Play Again
									</Button>
								</Grid>
							) : (
								<Grid container justifyContent='center' paddingTop={1}>
									<Button sx={customStyles.newGameButton} onClick={startNewGame}>
										New Game
									</Button>
								</Grid>
							)}
						</div>
					)}
				</Stack>
			</Box>

			<img alt='tic-tac-toe' src={tictactoeImg} style={{ width: '20%', position: 'fixed', bottom: 0 }} />
		</Stack>
	);
};

export default TicTacToeGame;
