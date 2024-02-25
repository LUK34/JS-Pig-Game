'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0'); //for toggling the active class css(if diceNumber=1)
const player1El = document.querySelector('.player--1'); //for toggling the active class css(if diceNumber=1)
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El =document.getElementById('current--0');
const current1El =document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


//Starting Conditions
//We have to declare the variable at global scope.
let scores, currentScore, activePlayer, playing

const init=function()
{
    scores=[0,0]; //Player scores will be stored in an array
    currentScore=0;
    activePlayer=0; // Toggling between the players when the diceNumber is 0.
    playing= true;
    score0El.textContent=0;
    score1El.textContent=0;
    current0El.textContent=0;
    current1El.textContent=0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner'); //we have to do it for both because we don't know which player has won.
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

//adding the below code will run the initialization which is crucial for this application
init()


//Switch Player function logic
const switchPlayer=function()
{
    //Switch to next player
        //If dice number is 1. Toggle the active player but before that set the active player to 0. 
        document.getElementById(`current--${activePlayer}`).textContent=0;
        currentScore=0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');

        /*
        If Player0 it will remove the active class if active class is there. If teh active class is note there it will add it.
        Same thing goes for Player1.
        */
}


//Rolling Dice Logic:
btnRoll.addEventListener('click',function()
{
    if(playing)
    {
         //1. Generating a random dice roll
         const diceNumber = Math.trunc(Math.random() * 6)+1;
        console.log(diceNumber);

        //2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${diceNumber}.png`;


        //3. Check for rolled 1: If true, toggle to next player
        if(diceNumber!==1)
        {
            //Add dice to current score        
            currentScore += diceNumber;
            //Assigning the total score based on the active player(If dice number is not 1)
            document.getElementById(`current--${activePlayer}`).textContent=currentScore;
        }
        else
        {
            switchPlayer();
        }
    }
   
});


//Hold Button Logic:
btnHold.addEventListener('click',function()
{
    if(playing)
    {
         //1.Add current score to active player's score
        scores[activePlayer] += currentScore;//scores[1]=scores[1]+currentScore
        document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];

        //If we are using getElementById we do not specify '.' . Only in the case of class we have to specify by '.'.

        //2.Check if the players score is >=100
        //Finish the game
        if(scores[activePlayer] >= 100)
        {
            playing= false;

            diceEl.classList.add('hidden');

            document
            .querySelector(`.player--${activePlayer}`)
            .classList.add(`player--winner`);
            
            document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove(`player-active`);    
        }
        else
        {
            //Switch to the next player
            switchPlayer();
        }
    }
   
});


//Reset Logic:
btnNew.addEventListener('click',init);





/*

* If you are using querySelector remember '.' is for id and '#' is for class

* getElementById is faster than querySelector.

*/