/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//列出變數

var scores, roundScore, activePlayer, gamePlaying;
 
init();

//按下roll開始擲骰子
document.querySelector('.btn-roll').addEventListener('click', function(){
if(gamePlaying) {
    // 1 亂數
var dice = Math.floor(Math.random() * 6) + 1;
//2 展示結果 先抓出diceDOM 跟著1的結果變換骰子點數
var diceDOM = document.querySelector('.dice');
diceDOM.style.display = 'block';
diceDOM.src = 'dice-' + dice + '.png';
//3 更新每回合積分 
if(dice !== 1) {
//加分
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
} else {
    //Next player
    nextPlayer();
}

}


});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //Add current score to global score
    scores[activePlayer] = scores[activePlayer] + roundScore;

    //update the ui
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //check if player won the game
    if(scores[activePlayer] >= 100) {
       document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
       //when someone won, hide the dice and the red dot
       document.querySelector('.dice').style.display = 'none';
       document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
       document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
       gamePlaying = false; 
    } else {
        //Next player
        nextPlayer();
    }
    }
    
    
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent ='0';
    document.getElementById('current-1').textContent ='0';
    //red dot & box color change while player change 
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //hide the dice before throwing
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
//利用修改html的方式把骰子移走
document.querySelector('.dice').style.display = 'none';
//將雙方原始分數預設為0
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = "Player 1";
document.getElementById('name-1').textContent = "Player 2";
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');

}






//var x = document.querySelector('#score-0').textContent;
//console.log(x); 