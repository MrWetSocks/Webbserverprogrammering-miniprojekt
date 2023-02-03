const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));

class Game {
	constructor() {
		this.createGame();
	}

	createGame = () => {
		this.board = [
			[-1, -1, -1],
			[-1, -1, -1],
			[-1, -1, -1],
		];
		this.turn = 0;
		this.isPlaying = true;
	};

	checkWin = (placedRow, placedCol) => {
		console.log(placedRow, placedCol);
		const check1 = this.board[placedRow];
		const check2 = this.board.map((e) => e[placedCol]);
		const check3 = this.board.map((e, ind) => e[ind]);
		const check4 = this.board.map((e, ind) => e[2 - ind]);

		console.log('check 1', check1, new Set(check1).size);
		console.log('check 2', check2, new Set(check2).size);
		console.log('check 3', check3, new Set(check3).size);
		console.log('check 4', check4, new Set(check4).size);
		if (
			(new Set(check1).size == 1 && check1[0] != -1) ||
			(new Set(check2).size == 1 && check2[0] != -1) ||
			(new Set(check3).size == 1 && check3[0] != -1) ||
			(new Set(check4).size == 1 && check4[0] != -1)
		) {
			io.emit('gameEnd', this.turn);
			this.isPlaying = false;
		}
	};

	placeTile = (row, col) => {
		console.log('från placeTile', row, col);
		console.log(this.board, this.isPlaying);
		if (this.board[row][col] == -1 && this.isPlaying) {
			console.log(row, col);
			this.board[row][col] = this.turn;
			this.checkWin(row, col);
			this.turn = 1 - this.turn;
			io.emit('boardUpdate');
		}
	};
}
let game = new Game();

// game.board = [
// 	[0, -1, -1],
// 	[-1, 0, -1],
// 	[0, 1, 1],
// ];
app.get('/game', (req, res) => {
	res.send(game);
});

app.get('/reset', (req, res) => {
	game.createGame();
	console.log(game);
	io.emit('reset');
	// io.emit('boardUpdate');
});

app.post('/game', (req, res) => {
	console.log(req.body);
	game.placeTile(req.body.y, req.body.x);
});

io.on('connection', (socket) => {
	console.log('A new user connected');
});

const PORT = 3000;
http.listen(PORT, () => {
	console.log(`Server is now listening on port ${PORT}`);
});
