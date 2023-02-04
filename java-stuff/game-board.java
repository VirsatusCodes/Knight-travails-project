class GameBoard  {
    constructor() {
        this.boardSize = 8;
        this.colorOne = 'white';
        this.colorTwo = 'black';
        /* in case i input a method to change colors of tiles by user */
        this.counter = 1;
    }
    resize(inp) {
        this.boardSize = inp
        this.clearBoard();
        this.renderBoard();
    }

    clearBoard() {
            while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    }

    renderBoard() {
        for(let i = this.boardSize; i > 0; i--){

    for(let i = this.boardSize; i > 0 ; i--){

        const grid = document.createElement('div');
        grid.classList.add("grid");
        grid.style.flex= `1 0 ${100/this.boardSize}%`;

        if(this.counter % 2 != 0) {
        grid.style.background = `rgb(${255}, ${255}, ${255})`
        }
        else {
        grid.style.background = `rgb(${0}, ${0}, ${0})`
        }
        this.counter++;
        board.appendChild(grid);
    }
        this.counter += 1
        }
    }
    
}


const newGame = new GameBoard;
newGame.renderBoard();
