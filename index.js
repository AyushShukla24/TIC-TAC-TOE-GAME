const boxes=document.querySelectorAll(".box");
const newGameBtn=document.querySelector(".btn");
const gameInfo=document.querySelector(".game-info");

let currentPlayer;
let gameGrid;

const winningPostions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    newGameBtn.classList.remove(".active");
    //UI ALSO CLEAN
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //remove green color after winning
        box.classList=`box box${index+1}`;
    })
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
  }

  initGame();

  function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="0";
    }
    else{
        currentPlayer="X";
    }

    gameInfo.innerText=`Current Player - ${currentPlayer}`;
  }

  function checkGameOver(){
      let answer="";
    winningPostions.forEach((position)=>{
        // if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" ||gameGrid[position[3]]!=="") && (gameGrid[position[0]]===gameGrid[position[1]]) &&(gameGrid[position[1]]===gameGrid[position[2]]))
        if (
            (gameGrid[position[0]] !== "" ||
              gameGrid[position[1]] !== "" ||
              gameGrid[position[2]] !== "") &&
            gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[0]] === gameGrid[position[2]]
          )
        {
            if(gameGrid[position[0]]==="X")
            answer="X";
        else
        answer="0";
        

        // disable pointer events
        boxes.forEach((box)=>{
            box.style.pointerEvents="none";
        })
        //winner
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
        //no winner
    }
});

if(answer!==""){
    gameInfo.innerText=`Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    console.log("lol");
    return;
}
let cnt=0;
gameGrid.forEach((box)=>{
    if(box!=="")
    cnt++;
});

if(cnt===9){
    gameInfo.innerText="Game Tied !";
    newGameBtn.classList.add("active");
}
  }

  function handleClick(index){
    if(gameGrid[index]===""){
        gameGrid[index]=currentPlayer;
        boxes[index].innerText=currentPlayer;
        boxes[index].style.pointerEvents="none";
        swapTurn();
        checkGameOver();
    }
  }

  boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    });
  });

  newGameBtn.addEventListener("click",initGame);