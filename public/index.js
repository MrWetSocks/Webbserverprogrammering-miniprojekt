const socket = io();

const getGame = () => {
	$.get('http://localhost:3000/game', (data) => {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				// console.log(data);
				$(`#${i}-${j}`).text(
					data.board[i][j] == 0
						? 'X'
						: data.board[i][j] == 1
						? 'O'
						: ''
				);
			}
		}
	});
};

const placeTile = (pos) => {
	$.post('http://localhost:3000/game', pos);
	// state[r][c] = val;
};

$(() => {
	$('.container').on('click', (e) => {
		console.log(e.target.id);
		const [y, x] = e.target.id.split('-').map((item) => parseInt(item));
		console.log(y, x);
		placeTile({ y, x });
	});
	getGame();
	$('#reset').click(() => {
		$.get('http://localhost:3000/reset');
	});

	socket.on('boardUpdate', getGame);

	socket.on('gameEnd', (winner) => {
		const win = winner == 0 ? 'X' : 'O';

		$('#msg-container').text(`${win} vann!!!!`);
	});

	socket.on('reset', () => {
		$('#msg-container').text('');

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				$(`#${i}-${j}`).text('');
			}
		}
		getGame();
	});
});
