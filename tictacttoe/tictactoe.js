let xotoggle="O";
let checkWinArray = [null, null, null, null, null, null, null, null, null];
let winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
let finishTurn=false;
let win = false;
let aiFirst=false;
let tieGame = false;
let invalidTile=false;
let moveCompleted;
let opponentMiddle;
let winningCombo;
let secondMoveFinished=false;
let oppositeCorner=false;
let opponentMiddleFirst=false;

let aiValue;
let userValue;

let userWon=false;
let aiWon=false;

let wins=0;
let losses=0;
let myTies=0;
let totalPlayed=0;

let timeoutAmount=1500;
let overlayTime=2500;






OverlayOn();

function makeMove(id){
    if (xotoggle =="X") {
        xotoggle = "O";
    }
    else{
        xotoggle = "X";
    }
    let tempId = id.slice(-1);
    UpdateWinArray(tempId);
    AddSquareFlip(id);
    const myFlipTimeout = setTimeout(changeTile, 600, id);
    const mytimeout = setTimeout(RemoveSquareFlip, 2000, id);
}

function UpdateWinArray(tempId){
    invalidTile = false;
    if(checkWinArray[tempId]!=null){
        invalidTile=true;
    }

    else{

        checkWinArray[tempId]=xotoggle;
        checkWin();
        checkTie();
    }



}

function checkWin(id)
{
    for (i=0; i<8; i++){
        const [c1,c2,c3] = winningCombinations[i];
        if(checkWinArray[c1] != null && checkWinArray[c2] != null && checkWinArray[c3] != null)
        {
            if (checkWinArray[c1] == checkWinArray[c2] && checkWinArray[c2] == checkWinArray[c3])
                {
                    
                    if(checkWinArray[c1]==aiValue){
                        document.getElementById("tellFirst").innerHTML="Sorry, you lost.";
                        aiWon=true;
                        UpdateLocalWinStorage();
                        win=true;
                    }
                    else{
                        document.getElementById("tellFirst").innerHTML="Congrats, you won.";
                        UpdateLocalLossStorage();
                        userWon=true;
                        win=true;

                    }

                    UpdateLocalGamesPlayedStorage();
                    document.getElementById("square"+c1).classList.add("winner");
                    document.getElementById("square"+c2).classList.add("winner");
                    document.getElementById("square"+c3).classList.add("winner");
                    document.getElementById("resetButton").disabled=false;

                    winningCombo=[c1,c2,c3];


                }
        }
    }
}


function AddSquareFlip(id){
    document.getElementById(id).classList.add("squareFlip");
}

function RemoveSquareFlip(id){
    document.getElementById(id).classList.remove("squareFlip");

}


function changeTile(id){
    invalidTile = false;
    if(document.getElementById(id).innerHTML == "X" || document.getElementById(id).innerHTML == "O"){
        invalidTile=true;
        return;
    }

    else{

        document.getElementById(id).innerHTML = xotoggle;;
        let numberId = id.slice(-1);
        UpdateWinArray(numberId);
    }

}


function checkTie(){
    if (win == false){
        if (!checkWinArray.includes(null)){
            document.getElementById("tellFirst").innerHTML="Tie Game";
            tieGame=true;
            document.getElementById("resetButton").disabled=false;
            UpdateLocalTieStorage();
            UpdateLocalGamesPlayedStorage();
            return;
        }
    }
}

function UpdateLocalTieStorage(){
    let tries = (parseInt(localStorage.getItem("ties"))+1);
    localStorage.setItem("ties", tries.toString());
    document.getElementById("ties").innerHTML = "AI Ties: " + localStorage.getItem("ties");
    return;
}

function UpdateLocalGamesPlayedStorage(){
    localStorage.setItem("gamesPlayed", (parseInt(localStorage.getItem("gamesPlayed"))+1));
    document.getElementById("totalPlayed").innerHTML = "AI Games Played: " + localStorage.getItem("gamesPlayed");
    return;
}

function UpdateLocalWinStorage(){
    localStorage.setItem("wins", (parseInt(localStorage.getItem("wins"))+1));
    document.getElementById("wins").innerHTML = "AI Wins: " + localStorage.getItem("wins");
    return;
}

function UpdateLocalLossStorage(){
    localStorage.setItem("losses", (parseInt(localStorage.getItem("losses"))+1));
    document.getElementById("losses").innerHTML = "AI Losses: " + localStorage.getItem("losses");
    return;
}

function ShowLocalStorage(){
    
// localStorage.clear()
// localStorage.setItem("ties",myTies);
// localStorage.setItem("gamesPlayed", totalPlayed)
// localStorage.setItem("wins",myTies);
// localStorage.setItem("losses", totalPlayed)

let localTies = localStorage.getItem("ties");
let localGamesPlayed = localStorage.getItem("gamesPlayed");
let localWins = localStorage.getItem("wins");
let localLosses = localStorage.getItem("losses");


document.getElementById("ties").innerHTML= "AI Ties: " + localTies;
document.getElementById("totalPlayed").innerHTML= "AI Games Played: " + localGamesPlayed;
document.getElementById("wins").innerHTML= "AI Wins: " + localWins;
document.getElementById("losses").innerHTML= "AI Losses: " + localLosses;
}


function reset(){

    document.getElementById("playButton").disabled=false;
    OverlayOn();

    xotoggle="";
    checkWinArray = [null, null, null, null, null, null, null, null, null];
    winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    win=false;
    document.getElementById("tellFirst").innerHTML = "";
    finishTurn=false;
    tieGame = false;
    secondMoveFinished=false;
    oppositeCorner=false;
    aiFirst=false;
    opponentMiddleFirst=false;
    invalidTile=false;
    
    // OverlayTwoOn();

    aiValue="";
    userValue="";
    
    for (iCount=0; iCount<9; iCount++){
        document.getElementById("square"+iCount).innerHTML = "";
    }

    // for (i=0; i<3; i++)
    // {
    //     document.getElementById("square"+winningCombo[i]).classList.remove("winner");
    // }

    document.getElementById("square"+winningCombo[0]).classList.remove("winner");
    document.getElementById("square"+winningCombo[1]).classList.remove("winner");
    document.getElementById("square"+winningCombo[2]).classList.remove("winner");


}


function WhoIsFirst(){
    OverlayOn();
    document.getElementById("playButton").disabled=true;
    document.getElementById("resetButton").disabled=true;

    // OverlayTwoOff();

    let startNum = Math.floor(Math.random() *2);

    if (startNum == 0){
        aiFirst = true;
        aiValue="X";
        userValue="O";
    }

    else{
        aiFirst = false;
        aiValue="O";
        userValue="X";
        
    }

    if(aiFirst){
        
        document.getElementById("tellFirst").innerHTML = "Computer First";
        
        StartGame();
        

    }

    else{
        document.getElementById("tellFirst").innerHTML = "Your Turn First";
        OverlayOff();
    }

}

function OverlayOn() {
    document.getElementById("overlay").style.display = "block";
  }

  function OverlayOff() {
    document.getElementById("overlay").style.display = "none";
  }

//   function OverlayTwoOn() {
//     document.getElementById("overlayTwo").style.display = "block";
//   }

//   function OverlayTwoOff() {
//     document.getElementById("overlayTwo").style.display = "none";
//   }


function StartGame(){

    


    if (aiFirst == true){
        firstMove = Math.floor(Math.random()*4);
        if (firstMove == 0){
            const mytimeout = setTimeout(AiMoves, 500, 0);
            const overlayMytimeout = setTimeout(OverlayOff, overlayTime);
            
        }
        if (firstMove == 1){
            const mytimeout = setTimeout(AiMoves, 500, 2);
            const overlayMytimeout = setTimeout(OverlayOff, overlayTime);
            
        }
        if (firstMove == 2){
            const mytimeout = setTimeout(AiMoves, 500, 6);
            const overlayMytimeout = setTimeout(OverlayOff, overlayTime);
            
        }
        if (firstMove == 3){
            const mytimeout = setTimeout(AiMoves, 500, 8);
            const overlayMytimeout = setTimeout(OverlayOff, overlayTime);
            
        }
    }

    
}


function AiThinks(id){

    makeMove(id);

    

    if(win==true||tieGame==true){
        return;
    }

    else if(win==false && invalidTile == false && tieGame==false)
    {

        OverlayOn();
        AiBestMove();
    }
    return;

}



function AiMoves(squarenum){

    if(document.getElementById("square"+squarenum).innerHTML == "X" || document.getElementById("square"+squarenum).innerHTML == "O"){

    }

    else{
        if (xotoggle =="X") {
            xotoggle = "O";
        }
    
        else{
            xotoggle = "X";
        }
        AddSquareFlip("square"+squarenum);

        UpdateWinArray(squarenum);
        setTimeout(function(){
            document.getElementById("square"+squarenum).innerHTML = xotoggle;
        }, 600);
        const mytimeout = setTimeout(RemoveSquareFlip, 2000, "square"+squarenum);
    }


    const overlayMytimeout = setTimeout(OverlayOff, 1500);
    checkWin("square"+squarenum);
    
}


function AiBestMove(){
    
    moveCompleted=false;

    for (iCount=0; iCount<8; iCount++){
        const [w1,w2,w3] = winningCombinations[iCount];

        if(moveCompleted==false && (checkWinArray[w1] != null && checkWinArray[w2]!=null || checkWinArray[w2]!= null && checkWinArray[w3]!=null || checkWinArray[w1]!=null && checkWinArray[w3]!=null)){
            if(checkWinArray[w1] == aiValue && checkWinArray[w2]== aiValue && checkWinArray[w3]==null){
                const mytimeout = setTimeout(AiMoves, timeoutAmount, w3);
                moveCompleted=true;
                return;
                
            }
    
            if(checkWinArray[w1] == aiValue && checkWinArray[w3] == aiValue && checkWinArray[w2]==null){
                const mytimeout = setTimeout(AiMoves, timeoutAmount, w2);
                moveCompleted=true;
                return;
                
            }
    
            if(checkWinArray[w2] == aiValue && checkWinArray[w3] == aiValue && checkWinArray[w1]==null){
                const mytimeout = setTimeout(AiMoves, timeoutAmount, w1);
                moveCompleted=true;
                return;
                
            }

        }
    }


    for (iCount=0; iCount<8; iCount++){
        const [w1,w2,w3] = winningCombinations[iCount];
    if(moveCompleted==false && (checkWinArray[w1] != null && checkWinArray[w2]!=null || checkWinArray[w2]!= null && checkWinArray[w3]!=null || checkWinArray[w1]!=null && checkWinArray[w3]!=null)){

        if(checkWinArray[w1] == userValue && checkWinArray[w2]== userValue && checkWinArray[w3]==null){
            const mytimeout = setTimeout(AiMoves, timeoutAmount, w3);
            moveCompleted=true;
            return;
            
        }

        if(checkWinArray[w1] == userValue && checkWinArray[w3] == userValue && checkWinArray[w2]==null){
            const mytimeout = setTimeout(AiMoves, timeoutAmount, w2);
            moveCompleted=true;
            return;
            
        }

        if(checkWinArray[w2] == userValue && checkWinArray[w3] == userValue && checkWinArray[w1]==null){
            const mytimeout = setTimeout(AiMoves, timeoutAmount, w1);
            moveCompleted=true;
            return;
            
        }

    }
}

    if(aiFirst == true && moveCompleted==false && secondMoveFinished==false){
        ComputerFirstSecondMove();
    }
    if(aiFirst == true && moveCompleted==false){
        ComputerFirstThirdMove();
    }

    if(aiFirst==false && moveCompleted==false && ((checkWinArray[0]!=null && checkWinArray[8]!=null) || (checkWinArray[2]!=null && checkWinArray[6]!=null))){
        PlaceOnSides();
    }

    if(aiFirst==false && checkWinArray[4]!=null && opponentMiddleFirst==false && moveCompleted==false){
        PlaceInCorner();
        opponentMiddleFirst=true;
    }

    if(moveCompleted==false){
        CheckMiddle();
    }

    if(moveCompleted==false){
        CheckOpposite();
    }

    if(moveCompleted == false){
        AiRandomMove();
    }
    else{
        return
    }
}

function AiRandomMove(){

    let randomNum; 
        finishTurn=false;
        
        while (finishTurn==false)
        {
            randomNum = Math.floor(Math.random()*9);
        
            if(checkWinArray[randomNum] == null)
            {
                const myTimeout = setTimeout(AiMoves, timeoutAmount,randomNum);
                finishTurn = true;
                moveCompleted=true;
                return;
            }
        }
    }

function CheckMiddle(){
    if (checkWinArray[4]==null){
        const myTimeout = setTimeout(AiMoves, timeoutAmount,4);
        moveCompleted=true;
    }
    else{
        return;
    }
}

function CheckOpposite(){
    if(checkWinArray[0] != null && checkWinArray[8]==null){
        const myTimeout = setTimeout(AiMoves, timeoutAmount,8);
         moveCompleted=true;
         return;
    }
    else if(checkWinArray[2] != null && checkWinArray[6]==null){
        const myTimeout = setTimeout(AiMoves, timeoutAmount,6);
         moveCompleted=true;
         return;
    }
    else if(checkWinArray[6] != null && checkWinArray[2]==null){
        const myTimeout = setTimeout(AiMoves, timeoutAmount,2);
         moveCompleted=true;
         return;
    }
    else if(checkWinArray[8] != null && checkWinArray[0]==null){
        const myTimeout = setTimeout(AiMoves, timeoutAmount,0);
         moveCompleted=true;
         return;
    }
}


function ComputerFirstSecondMove(){

    //COMPUTER FIRST AND OPPONENT GOES MIDDLE
    if(checkWinArray[4]!=null){
        if (firstMove==0 && checkWinArray[8]==null){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,8);
            moveCompleted=true;
            opponentMiddle=true;
            return;
        }
        if (firstMove==1 && checkWinArray[6]==null){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,6);
            moveCompleted=true;
            opponentMiddle=true;
            secondMoveFinished=true;
            return
        }
        if (firstMove==2 && checkWinArray[2]==null){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,2);
            moveCompleted=true;
            opponentMiddle=true;
            secondMoveFinished=true;
            return
        }
        if (firstMove==3 && checkWinArray[0]==null){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,0);
            moveCompleted=true;
            opponentMiddle=true;
            secondMoveFinished=true;
            return
        }
    }

    //COMPUTER FIRST AND THEY GO ON OPPOSITE CORNER
    if(firstMove==0 && checkWinArray[8]!=null || firstMove==1 && checkWinArray[6]!=null || firstMove==2 && checkWinArray[2]!=null || firstMove==3 && checkWinArray[0]!=null){
        PlaceInCorner();
        secondMoveFinished=true;
        oppositeCorner=true;
    }
    
    //COMPUTER FIRST AND THEY GO ON ONE OF THE SIDES
    if(checkWinArray[1]!=null || checkWinArray[3]!=null || checkWinArray[5]!=null || checkWinArray[7]!=null){
        if (firstMove==0 && (checkWinArray[1]!=null || checkWinArray[5]!=null)){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,6);
            moveCompleted=true;
            secondMoveFinished=true;
            return;
        }
        if (firstMove==0 && (checkWinArray[3]!=null || checkWinArray[7]!=null)){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,2);
            moveCompleted=true;
            secondMoveFinished=true;
            return;
        }
        if (firstMove==1 && (checkWinArray[1]!=null || checkWinArray[3]!=null)){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,8);
            moveCompleted=true;
            secondMoveFinished=true;
            return;
        }
        if(firstMove==1 && (checkWinArray[5]!=null || checkWinArray[7]!=null)){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,0);
            moveCompleted=true;
            secondMoveFinished=true;
            return;
        }
        if (firstMove==2 && (checkWinArray[3]!=null || checkWinArray[1]!=null)){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,8);
            moveCompleted=true;
            secondMoveFinished=true;
            return;
        }
        if(firstMove==2 && (checkWinArray[7]!=null || checkWinArray[5]!=null)){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,0);
            moveCompleted=true;
            secondMoveFinished=true;
            return;
        }
        if (firstMove==3 && (checkWinArray[7]!=null || checkWinArray[3]!=null)){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,2);
            moveCompleted=true;
            secondMoveFinished=true;
            return;
        }
        if(firstMove==3 && (checkWinArray[5]!=null || checkWinArray[1]!=null)){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,6);
            moveCompleted=true;
            secondMoveFinished=true;
            return;
        }
        

    }




}

function ComputerFirstThirdMove(){

    if(oppositeCorner==true){
        PlaceInCorner();
    }

    if(opponentMiddle!=true){
        if (firstMove==0 && checkWinArray[8]==null){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,8);
            moveCompleted=true;
            return;
        }
        if (firstMove==1 && checkWinArray[6]==null){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,6);
            moveCompleted=true;
            return
        }
        if (firstMove==2 && checkWinArray[2]==null){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,2);
            moveCompleted=true;
            return
        }
        if (firstMove==3 && checkWinArray[0]==null){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,0);
            moveCompleted=true;
            return
        }
    }

}


function PlaceInCorner(){
    if(checkWinArray[0]==null){
        const myTimeout = setTimeout(AiMoves, timeoutAmount,0);
        moveCompleted=true;
        return
    }
    if(checkWinArray[2]==null){
        const myTimeout = setTimeout(AiMoves, timeoutAmount,2);
        moveCompleted=true;
        return
    }
    if(checkWinArray[6]==null){
        const myTimeout = setTimeout(AiMoves, timeoutAmount,6);
        moveCompleted=true;
        return
    }
    if(checkWinArray[8]==null){
        const myTimeout = setTimeout(AiMoves, timeoutAmount,8);
        moveCompleted=true;
        return
    }
}


function PlaceOnSides(){
    moveCompleted=false;
    let realCount;
    while(moveCompleted==false){
        let sideCount = Math.floor(Math.random()*4)
        if(sideCount==0){
            realCount=1;
        }
        if(sideCount==1){
            realCount=3;
        }
        if(sideCount==2){
            realCount=5;
        }
        if(sideCount==3){
            realCount=7;
        }

        if(checkWinArray[realCount]==null){
            const myTimeout = setTimeout(AiMoves, timeoutAmount,realCount);
            moveCompleted=true;
        }
    }
}