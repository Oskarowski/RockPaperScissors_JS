let playerScore = 0;
let computerScore = 0;
const playerScore_span = document.getElementById('playerScore');
const computerScore_span = document.getElementById('aiScore');
const scoreBoard_div = document.querySelector('.scoreBoard');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById('Rock');
const paper_div = document.getElementById('Paper');
const scissors_div = document.getElementById('Scissors');


function getAiChoice(){
    const choices = ['r', 'p', 's'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function refreshScore(){
    playerScore_span.innerHTML = playerScore;
    computerScore_span.innerHTML = computerScore;
}
function changePlaneUnderImg(div, className){
    const FADE_OUT_INTERVAL = 500;
    div.classList.add(className);
    setTimeout( ()=> div.classList.remove(className) , FADE_OUT_INTERVAL)
}


class Player{
    constructor(player, compueterChoice){
        this.playerChoice = player;
        this.AI = compueterChoice;
        this.choice_div = document.getElementById(this.convertToWord(this.playerChoice));
    }
    convertToWord(sign){
        if(sign === 'r') return 'Rock';
        if(sign === 'p') return 'Paper';
        if(sign === 's') return 'Scissors';
    }
    win() {
        console.log("PLAYER WINS !");
        playerScore++;
        refreshScore();
        result_p.innerHTML = `${this.convertToWord(this.playerChoice)} > ${this.convertToWord(this.AI)}. You WON`;

        changePlaneUnderImg(this.choice_div, 'greenBorder');
    };
    lose(){
        console.log("AI WINS !");
        computerScore++;
        refreshScore();
        result_p.innerHTML = `${this.convertToWord(this.playerChoice)} < ${this.convertToWord(this.AI)}. You LOST...`;

        changePlaneUnderImg(this.choice_div, 'redBorder');
    };
    draw(){
        console.log("DRAW !");
        result_p.innerHTML = `${this.convertToWord(this.playerChoice)} === ${this.convertToWord(this.AI)}. It's DRAW`;

        changePlaneUnderImg(this.choice_div, 'grayBorder');
    };
}

function game(playerChoice) {
    const aiChoice = getAiChoice();
    const player = new Player(playerChoice, aiChoice);

    switch (playerChoice + aiChoice) {
        case 'rs':    
        case 'pr':
        case 'sp':
            player.win();
            break;
        case 'sr':
        case 'rp':
        case 'ps':
            player.lose();
            break;
        case 'ss':
        case 'rr':
        case 'pp':
            player.draw();
            break;
    }
}

function main()
{

    rock_div.addEventListener('click', event => {
        // console.log('rock_div clicked');
        game("r");
    });

    paper_div.addEventListener('click', event => {
        // console.log('paper_div clicked');
        game("p");
    });

    scissors_div.addEventListener('click', event => {
        // console.log('scissors_div clicked');
        game("s");
    });
}

function resetPoints(){
    console.log('resetPoints()');
    playerScore = 0;
    computerScore = 0;
    refreshScore();
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    main();

    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', event => {
        resetPoints();
    });
});
