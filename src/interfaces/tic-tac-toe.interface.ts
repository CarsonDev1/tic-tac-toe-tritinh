export interface INoticeBoardProps {
	player: string;
}

export interface IWinner {
	name: string;
	point: number;
}

export interface IWinningBoardProps {
	label: string;
}

export interface IPointProps {
	label: string;
	point: number;
	bgColor: string;
}

export interface IPlayBoxProps {
	check: string;
	onClickPlay: () => void;
	playing: boolean;
}
