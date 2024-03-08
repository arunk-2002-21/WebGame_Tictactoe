let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset_btn");
let newGambtn=document.querySelector('#new_btn');
let msgContainer=document.querySelector('.msg-container')
let msg=document.querySelector("#msg");

let count=0;
let turnO=true; //PlayerX, PlayerO

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame=()=>{
    turnO=true;
    count=0;
    enablebtn();
    msgContainer.classList.add("hide");
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            //playerO
            box.innerText="O";
            box.style.color="purple";
            turnO=false;
        }
        else{
            //playerX
            box.innerText="X";
            box.style.color="#FF7B9C";
            turnO=true;
        }
        box.disabled=true;
        count++;

        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gamedraw();
        }
    });
});

gamedraw =()=>{
    msg.innerText="Game is Draw :-)";
    msgContainer.classList.remove("hide");
    disablebtn();
}

const disablebtn =()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enablebtn =()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner = (winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disablebtn();
};

let checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText; 
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val!= "" && pos3Val!= ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return true;
            } 
        }
    }
};

newGambtn.addEventListener("click",resetGame);
resetbtn.addEventListener('click',resetGame);
