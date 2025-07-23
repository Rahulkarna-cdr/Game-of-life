class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  /**
   * Returns a 2D Array
   */

  makeBoard() {
    let anEmptyArr = []
    for(let i=0;i<this.height;i++){
      let row = []
      for(let j=0;j<this.width;j++){
        row.push(0)
      }
      anEmptyArr.push(row)
    }
    return anEmptyArr
  }

getCell(row,col){
  if(row<0 || row>=this.height || col<0 || col>=this.width){
    return 0;  //already dead so will return 0
  }
  return this.board[row][col] //if not then return the element in 2d array
}

setCell(value, row, col){
  if(row>=0 && row<this.height && col>=0 && col<this.width){
    this.board[row][col] = value;
  }
}

toggleCell(row,col){
  let currentVal = this.getCell(row, col)
  let newVal = currentVal ===1? 0 : 1
  this.setCell(newVal,row,col);
}

  livingNeighbors(row, col) {
    // TODO: Return the count of living neighbors.
    let count = 0;
    for(let r=row-1;r<=row+1;r++){
      for(let c=col-1;c<=col+1;c++){
        if(r ===row && c ===col){
          continue;
        }
        if(this.getCell(r,c)===1){
          count++;
        }
      }
    }
    return count;
  }

  conwayRules(currentVal, livingNeighbors){
    if (currentVal ===1 && livingNeighbors<2){
      return 0;
    }
    else if(currentVal ===1 && livingNeighbors >3){
      return 0;
    }
    else if(currentVal === 1 && (livingNeighbors ===2 || livingNeighbors ===3)){
      return 1;
    }
    else if(currentVal ===0 && livingNeighbors===3){
      return 1;
    }
    else{
      return 0;
    }
  }

  /**
   * Given the present board, apply the rules to generate a new board
   */
  
  tick() {
    const newBoard = this.makeBoard();
    for(let row = 0;row<this.height;row++){
      for(let col=0;col<this.width;col++){
        const currentVal = this.getCell(row,col)
        const neighbors = this.livingNeighbors(row,col)
        const newVal = this.conwayRules(currentVal,neighbors)
        newBoard[row][col]=newVal;
      }
    }
    // TODO: Here is where you want to loop through all the cells
    // on the existing board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the new board 
    // (the next iteration of the game) 
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells in newBoard,
    // based on their current alive neighbors
    this.board = newBoard;
  }
}
