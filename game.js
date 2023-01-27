class Game {
    constructor() {
        createGame()
    }

    createGame = () => {
        this.board = [
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]
        ]
        this.turn = 0
    }

    placeTile = (row, col) => {
        if (this.board[row][col] == -1) {
            this.board[row][col] = this.turn
            this.turn = 1 - this.turn
        }
    }

    checkWin = (placedRow, placedCol) => {
        check1 = this.board[placedRow]
        check2 = this.board.map(e => e[placedCol])
    }
}