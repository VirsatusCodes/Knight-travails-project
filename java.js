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
           /*  knightInAction(knightStartStop); data translation necessary*/
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

function knightInAction(inp) {
    console.log(inp)
/* 2 over below to avoid comma */
/* let currentLocation = [+inp[0][0], +inp[0][2]];
const targetLocation = [+inp[1][0], +inp[1][2]]; */
let currentLocation = inp[0]
const initialLocation = inp[0]
const targetLocation = inp[1]
console.log(currentLocation, targetLocation)

const transform = (currentLocation, locationChange) => 
[(currentLocation[0] + locationChange[0]), (currentLocation[1] + locationChange[1])];

const isLegalMove = (move) => {
    const minX = 0;
    const minY = 0;
    const MaxX = 7;
    const maxY = 7;

    if(minX <= move[0] && move[0] <= MaxX && minY <= move[1] && move[1] <= maxY) {
        return true
       }
       else return false
}

const isValueEqual = (inp1, inp2) => {  
    if((inp1[0] === inp2[0]) && (inp1[1] === inp2[1])) {
        return true
    }
    else return false
}

const moveGenerator = (currentLocation) => {
    const nextLegalPositions = [];
    const potentialMoves = [
        [1,2],[2,1],[2,-1],[1,-2],[-2,-1],[-1,-2],[-2,1],[-1,2]
    ]
    for(let i = 0; i < potentialMoves.length; i++) {
        const move = transform(currentLocation, potentialMoves[i])
          if(isLegalMove(move)) {
            nextLegalPositions.push(move)
          }
    }
    return nextLegalPositions;
}

const knightMoves = (target) => {
    const queue = [initialLocation]
    const path = []

    while(queue.length > 0) {
        const currentPosition = queue.shift();
        const legalMoves = moveGenerator(currentPosition);
        path.push(currentPosition);
        if(currentPosition[0] === target[0] && currentPosition[1] === target[1]) return path

        legalMoves.forEach(element => {
        for(let i = 0; i < path.length; i++) {

            if(!isValueEqual(element, path[i])) {
                queue.push(element)
            }
        }
    });
}
  }

const moveMaker = () => {
    console.log(knightMoves(targetLocation));
}
moveMaker();

}

const knightStartStop = [[4,5], [5,7]]
const knightStartStop2 = [[0,7], [3,4]]
const knightStartStop3 = [[0,7], [2,2]]

const one = knightInAction(knightStartStop)
const two = knightInAction(knightStartStop2)
/* const three = knightInAction(knightStartStop3) */

