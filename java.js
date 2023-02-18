(function initiate() {
    renderBoard();
  })();

function renderBoard() {
    const gameboardSize = 8;
    let counter = 1;
    let xCounter = 0;
    let yCounter = 7;
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
            grid.dataset.coordinates = [xCounter, yCounter]
            board.appendChild(grid);
            xCounter++;
        }
        xCounter=0;
        yCounter--;
        counter++;
            }
}

function removeBoard() {
    while(board.firstChild) {
        board.removeChild(board.firstChild);
    }
}
    const knightStartStop = [];

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
            Knight([+knightStartStop[0][0] , +knightStartStop[0][2]], [+knightStartStop[1][0], +knightStartStop[1][2]])
        })

        const reset = document.querySelector('#reset');
        reset.addEventListener('click', () => {
            removeBoard();
            renderBoard();
            while(knightStartStop.length > 0) {
                knightStartStop.pop();
            }
        })
      })();


function knightSelectSpot() {
    const hover = document.querySelector('#board');
    const knightIcon = 'K'
    let knightStartPlaced = false
    
    hover.addEventListener('mousedown', (function (e) {
        if(knightStartPlaced != true) {
        e.target.textContent = knightIcon ;
        knightStartStop.push(e.target.dataset.coordinates)
        knightStartPlaced = true;
        console.log(knightStartStop)
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
        knightStartStop.push(e.target.dataset.coordinates)
        knightEndPlaced = true;
        console.log(knightStartStop)
        }
    }))
}
/* ------------------------------------------------------------------- */
const allMadeMoves = new Map();

const Chess = (x, y) => {
    const coord = [x, y]

    const knightActions = [
        [1,2],[2,1],[2,-1],[1,-2],[-2,-1],[-1,-2],[-2,1],[-1,2]
    ]

    let previousSpot;

    const getPrevious = () => previousSpot;
    const setPrevious = (inp) => {
        previousSpot = previousSpot || inp;
    }
    /* set previous func is very important to do in this order
    because you want the previous spot to be sent only once with a 
    valid value not continually reset, this way it will set its value
    then when something tries to change that value it wont because
    it already has a valid value */

    const callLocation = () => `${coord[0]}, ${coord[1]}`;

    const newMove = (xOffset, yOffset) => {
        const [newX, newY] = [coord[0] + xOffset, coord[1] + yOffset];
        if(0 <= newX && newX < 8 && 0 <= newY && newY < 8) {
            return Chess(newX, newY)
        }
    }

    const knightMovements = () => {
        return knightActions
                .map((moves) => newMove(moves[0], moves[1]))
                .filter((legalMove) => legalMove !== undefined);
    }

    if(allMadeMoves.has(callLocation())) {
        return allMadeMoves.get(callLocation());
    } else {
        newChess = {callLocation, getPrevious, setPrevious, knightMovements}
        allMadeMoves.set(callLocation(), newChess);
        return newChess; 
    }
}

const Knight = (start, goal) => {
    allMadeMoves.clear();

    const beggining = Chess(...start);
    const target = Chess(...goal);

    const queue = [beggining];
    const path = [target];
    /* below adds nodes in a chain leading to original until
    a node link is created between my target and originator */
    while(!queue.includes(target)) {
        const currentPosition = queue.shift();
        const newMoves = currentPosition.knightMovements();

        newMoves.forEach((position) => position.setPrevious(currentPosition));
        /* set up direction chain begining at initial position */
        queue.push(...newMoves)
    }
    /* and this below goes to target and backtracks to original starting point */
    while(!path.includes(beggining)) {
        const prevCoord = path[0].getPrevious();
        path.unshift(prevCoord);
    }

    path.forEach(move => console.log(move.callLocation()));
}

const one = Knight([4,5], [5,7])
const two = Knight([0,7], [3,4]) 
const three = Knight([0,7], [2,2])

