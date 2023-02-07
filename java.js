(function initiate() {
    renderBoard();
  })();

function renderBoard() {
    const gameboardSize = 8;
    let counter = 1;
    for(let i = gameboardSize; i > 0; i--){

        for(let i = gameboardSize; i > 0 ; i--){
    
            const grid = document.createElement('div');
            grid.classList.add("grid");
            grid.style.flex= `1 0 ${100/gameboardSize}%`;
    
            if(counter % 2 != 0) {
            grid.style.backgroundColor = `rgb(${255}, ${255}, ${255})`
            }
            else {
            grid.style.backgroundColor = `rgb(${100}, ${100}, ${100})`
            }
            counter++;
            board.appendChild(grid);
        }
        counter++;
            }
}

function removeBoard() {
    while(board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

    (function wireButtons() {
        const knightStart = document.querySelector('#knightStart');
        knightStart.addEventListener('click', () => {
            knightSelectSpot();
        })

        const knightEnd = document.querySelector('#knightEnd');
        knightEnd.addEventListener('click', () => {
            knightEndSpot();
        })

        const knightMoves = document.querySelector('#knightMoves');
        knightMoves.addEventListener('click', () => {
            knightInAction();
        })

        const reset = document.querySelector('#reset');
        reset.addEventListener('click', () => {
            removeBoard();
            renderBoard();
        })
      })();

/* the select spots are going to need to record the coordinates */
function knightSelectSpot() {
    const hover = document.querySelector('#board');
    const knightIcon = 'K'
    let knightStartPlaced = false
    
    hover.addEventListener('mousedown', (function (e) {
        if(knightStartPlaced != true) {
        e.target.textContent = knightIcon ;
        knightStartPlaced = true;
        }
    }))
}

function knightEndSpot() {
    const hover = document.querySelector('#board');
    const knightIcon = 'K'
    let knightEndPlaced = false
    
    hover.addEventListener('mousedown', (function (e) {
        if(knightEndPlaced != true) {
        e.target.textContent = knightIcon ;
        knightEndPlaced = true;
        }
    }))
}

function knightInAction() {

}