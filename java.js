(function initiate() {
    renderBoard();
  })();

function renderBoard() {
    const gameboardSize = 8;
    let counter = 1;
    let xCounter = 1;
    let yCounter = 8;
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
        xCounter=1;
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
            knightInAction(knightStartStop);
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
const knightStartStop = ['4,5', '5,7']
const knightStartStop2 = ['1,1', '2,3']

function knightInAction(inp) {
    console.log(inp)
/* 2 over below to avoid comma */
const currentLocation = [+inp[0][0], +inp[0][2]];
const targetLocation = [+inp[1][0], +inp[1][2]];

const transform = (currentLocation, locationChange) => 
[(currentLocation[0] + locationChange[0]), (currentLocation[1] + locationChange[1])];

const isLegalMove = (move) => {
    const minX = 1;
    const minY = 1;
    const MaxX = 8;
    const maxY = 8;

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

const moveMaker = () => {
    let legalMoves = [];
    let potentialRoute = [];
    const potentialMoves = [
        [1,2],[2,1],[2,-1],[1,-2],[-2,-1],[-1,-2],[-2,1],[-1,2]
    ]
for (let i = 0; i < potentialMoves.length; i++) {
    
   const potentialAction = transform(currentLocation, potentialMoves[i]);

   if(isLegalMove(potentialAction)) {
    legalMoves.push(potentialAction);
/*     console.log(i, legalMoves); */
   }
}

for (let i = 0; i < legalMoves.length; i++) {
    if(isValueEqual(legalMoves[i], targetLocation)) {
     potentialRoute.push(legalMoves[i]);
     console.log(potentialRoute)
    }
 }

}
moveMaker();
}



knightInAction(knightStartStop)
knightInAction(knightStartStop2)