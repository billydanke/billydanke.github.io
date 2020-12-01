//Randomized Prim Algorithm Maze
//aarawn

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var requestId;

var parent = document.getElementById('parent');

canvas.width = parent.offsetWidth;
canvas.height = parent.offsetHeight;

var gridWidth = 10;
var gridHeight = 10;
var cellSize = 60;


window.addEventListener('resize', function() {
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    if(isComplete) {
        loop();
    }
})

function Wall(direction) {
    this.direction = direction;
    this.draw = function(x, y, size) {
        if(direction == 'N') {
            c.fillStyle = 'black';
            c.fillRect(x,y,size,1);
        }
        else if(direction == 'S') {
            c.fillStyle = 'black';
            c.fillRect(x,y + size,size,1);
        }
        else if(direction == 'E') {
            c.fillStyle = 'black';
            c.fillRect(x,y,1,size);
        }
        else if(direction == 'W') {
            c.fillStyle = 'black';
            c.fillRect(x + size,y,1,size);
        }
    }
}

function Cell(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.frontier = false;
    this.visited = false;

    this.neighbors = [];

    this.walls = [];

    this.createWalls = function() {
        this.walls.push(new Wall('N'));
        this.walls.push(new Wall('S'));
        this.walls.push(new Wall('W'));
        this.walls.push(new Wall('E'));
    }
    this.getNeighbors = function() {
        this.neighbors = [];
        if(typeof grid[this.y-1] != 'undefined' && grid[this.y-1][this.x].visited == false && grid[this.y-1][this.x].frontier == false) {
            this.neighbors.push(grid[this.y-1][this.x]); //UP
        } else if(typeof grid[this.y-1] != 'undefined' && grid[this.y-1][this.x].visited) {
            this.neighbors.push(1);
        } else {this.neighbors.push(0);}

        if(typeof grid[this.y+1] != 'undefined' && grid[this.y+1][this.x].visited == false && grid[this.y+1][this.x].frontier == false) {
            this.neighbors.push(grid[this.y+1][this.x]); //DOWN
        } else if(typeof grid[this.y+1] != 'undefined' && grid[this.y+1][this.x].visited) {
            this.neighbors.push(1);
        } else {this.neighbors.push(0);}

        if(typeof grid[this.y][this.x-1] != 'undefined' && grid[this.y][this.x-1].visited == false && grid[this.y][this.x-1].frontier == false) {
            this.neighbors.push(grid[this.y][this.x-1]); //LEFT
        } else if(typeof grid[this.y][this.x-1] != 'undefined' && grid[this.y][this.x-1].visited) {
            this.neighbors.push(1);
        } else {this.neighbors.push(0);}

        if(typeof grid[this.y][this.x+1] != 'undefined' && grid[this.y][this.x+1].visited == false && grid[this.y][this.x+1].frontier == false) {
            this.neighbors.push(grid[this.y][this.x+1]); //RIGHT
        } else if(typeof grid[this.y][this.x+1] != 'undefined' && grid[this.y][this.x+1].visited) {
            this.neighbors.push(1);
        } else {this.neighbors.push(0);}

        this.neighbors.forEach(neighbor => {
            if(neighbor != 0 && neighbor != 1) {
                neighbor.frontier = true;
                frontierCells.push(neighbor); 
            }
        });
    }
    this.drawWalls = function(xPos,yPos) {
        this.walls.forEach(wall => {
            if(wall != 0) {
                wall.draw(xPos,yPos,this.size);
            }
        });
    }
    this.draw = function(xPos,yPos) {
        if(!this.visited && !this.frontier) {
            c.fillStyle = 'black';
            c.fillRect(xPos, yPos, this.size,this.size);
        } else if(this.visited) {
            c.fillStyle = 'white';
            c.fillRect(xPos, yPos, this.size,this.size);
        } else {
            c.fillStyle = 'orange';
            c.fillRect(xPos, yPos, this.size,this.size);
        }
        this.drawWalls(xPos,yPos);
    }

    this.createWalls();
}

//drawing of the grid
function drawGrid(initialX, initialY) {

    c.clearRect(0,0,innerWidth,innerHeight);

    var yPos = initialY;
    for(var yIndex = 0; yIndex < gridHeight; yIndex++) {
        var xPos = initialX;
        for(var xIndex = 0; xIndex < gridWidth; xIndex++) {
            grid[yIndex][xIndex].draw(xPos,yPos);
            xPos += cellSize
        }

        yPos += cellSize;
    }
}

//create entry and exit
function createEntries() {
    var direction = Math.floor(Math.random() * 4) + 1;
    var entryPosition;
    var exitPosition;

    //find positions along decided side of grid
    if(direction == 1 || direction == 2) { //top or bottom
        entryPosition = Math.floor(Math.random() * gridWidth);
        exitPosition = Math.floor(Math.random() * gridWidth);

        grid[0][entryPosition].walls[0] = 0;
        grid[gridHeight-1][exitPosition].walls[1] = 0;
    }
    else { //left or right
        entryPosition = Math.floor(Math.random() * gridHeight);
        exitPosition = Math.floor(Math.random() * gridHeight);

        grid[entryPosition][0].walls[3] = 0;
        grid[exitPosition][gridWidth-1].walls[2] = 0;
    }

}

var activeX;
var activeY;

var frontierCells = [];

var isComplete = false;

function pickRandomCell() {
    var randomX = Math.floor(Math.random() * gridWidth);
    var randomY = Math.floor(Math.random() * gridHeight);

    activeX = randomX;
    activeY = randomY;

    grid[randomY][randomX].visited = true;
    grid[randomY][randomX].getNeighbors();
}

function pickNextCell() {

    if(isComplete) {
        return null;
    }
    
    if(frontierCells.length < 1) {
        //create entry and exit
        createEntries();
        isComplete = true;
        return null;
    }

    var pick = Math.floor(Math.random() * frontierCells.length);
    var pickX = frontierCells[pick].x;
    var pickY = frontierCells[pick].y;

    frontierCells.splice(pick,1);

    grid[pickY][pickX].visited = true;
    grid[pickY][pickX].getNeighbors();

    var carveOptions = [];
    if(grid[pickY][pickX].neighbors[0] == 1) { //up
        carveOptions.push('up');
    }
    if(grid[pickY][pickX].neighbors[1] == 1) { //down
        carveOptions.push('down');
    }
    if(grid[pickY][pickX].neighbors[2] == 1) { //left
        carveOptions.push('left');
    }
    if(grid[pickY][pickX].neighbors[3] == 1) { //right
        carveOptions.push('right');
    }

    var directionChoice = Math.floor(Math.random() * carveOptions.length);

    switch(carveOptions[directionChoice]) {
        case 'up':
            //remove up wall
            grid[pickY][pickX].walls[0] = 0;
            grid[pickY-1][pickX].walls[1] = 0;
            break;
        case 'down':
            //remove down wall
            grid[pickY][pickX].walls[1] = 0;
            grid[pickY+1][pickX].walls[0] = 0;
            break;
        case 'left':
            //remove left wall
            grid[pickY][pickX].walls[3] = 0;
            grid[pickY][pickX-1].walls[2] = 0;
            break;
        case 'right':
            //remove right wall
            grid[pickY][pickX].walls[2] = 0;
            grid[pickY][pickX+1].walls[3] = 0;
            break;
    }
}

var grid = [];

function loop() {
    requestId = window.requestAnimationFrame(loop);
    
    c.clearRect(0,0,innerWidth,innerHeight);
    drawGrid(Math.floor(innerWidth / 2 - (gridWidth * cellSize / 2)),Math.floor(innerHeight / 2 - (gridHeight * cellSize / 2)));

    if(isComplete) {
        window.cancelAnimationFrame(requestId);
        requestId = undefined;
    }
    
    pickNextCell();
}

function init() {
    if(requestId != 'undefined') {
        window.cancelAnimationFrame(requestId);
        requestId = undefined;
    }

    gridWidth = parseInt(document.getElementById('width').value,10);
    gridHeight = parseInt(document.getElementById('height').value,10);
    cellSize = parseInt(document.getElementById('scale').value,10);

    grid = [];
    frontierCells = [];
    isComplete = false;

    //populate grid with cells
    for(var y = 0; y < gridHeight; y++) {
        grid[y] = new Array(gridWidth);

        for(var x = 0; x < gridWidth; x++) {
            grid[y][x] = new Cell(x,y,cellSize);
        }
    }
    
    pickRandomCell();
    loop();
}

init();



/* RULES OF THE MAZE

1.) start with a grid full of cells, each with 4 walls around them
2.) pick a random cell
3.) find all of that cell's neighboring unvisited cells (top, bottom, left, right) and add them to the frontier cells list
4.) randomly pick a cell from the frontier cells list, mark it as visited, remove the cell from the frontier list, and remove the wall between the
    previously visited cell and the new cell (if there are multiple surrounding visited cells, pick one at random)
5.) repeat steps 3 and 4 until the maze generation is complete.

*/