console.log("main loaded");

let playerScore = 0;
let computerScore = 0;
const playerScore_span = document.getElementById('playerScore');
const computerScore_span = document.getElementById('aiScore');
const scoreBoard_div = document.querySelector('.scoreBoard');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById('Rock');
const paper_div = document.getElementById('Paper');
const scissors_div = document.getElementById('Scissors');

const FADE_OUT_INTERVAL = 500;

function getAiChoice(){
    const choices = ['r', 'p', 's'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function refreshScore(){
    playerScore_span.innerHTML = playerScore;
    computerScore_span.innerHTML = computerScore;
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

        this.choice_div.classList.add('greenBorder');
        setTimeout( ()=>this.choice_div.classList.remove('greenBorder') , FADE_OUT_INTERVAL)
    };
    lose(){
        console.log("AI WINS !");
        computerScore++;
        refreshScore();
        result_p.innerHTML = `${this.convertToWord(this.playerChoice)} < ${this.convertToWord(this.AI)}. You LOST...`;

        this.choice_div.classList.add('redBorder');
        setTimeout( ()=>this.choice_div.classList.remove('redBorder') , FADE_OUT_INTERVAL)
    };
    draw(){
        console.log("DRAW !");
        result_p.innerHTML = `${this.convertToWord(this.playerChoice)} === ${this.convertToWord(this.AI)}. It's DRAW`;

        this.choice_div.classList.add('grayBorder');
        setTimeout( ()=>this.choice_div.classList.remove('grayBorder') , FADE_OUT_INTERVAL)
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

window.onload = function(){
    main();
}
