(function() {
    "use strict";
    console.log('reading js');

    const startGame = document.getElementById('startgame');
        const gameControl = document.getElementById('gamecontrol');
        const game = document.getElementById('game');
        const dice = document.getElementById('dice');
        const score = document.getElementById('score');
        const score1 = document.getElementById("score1");
        const score2 = document.getElementById("score2");
        const actionArea = document.getElementById('actions');

        const gameData = {
            dice: ['images/1die.jpg', 'images/2die.jpg', 'images/3die.jpg', 'images/4die.jpg', 'images/5die.jpg', 'images/6die.jpg',],
            players: ['player 1', 'player 2'],
            score: [0, 0],
            roll1: 0,
            roll2: 0,
            rollSum: 0,
            index: 0,
            gameEnd: 29

        }

        // function for the game start
        startGame.addEventListener('click', function(){

            //Randomly set game Index
            gameData.index = Math.round(Math.random());
            // console.log(`index: ${gameData.index}`);

            gameControl.innerHTML = '<h2> The Game Has Started</h2>';
            gameControl.innerHTML += '<button id = "quit"> Wanna Quit? </button>';

            document.getElementById('quit').addEventListener("click", function(){
                location.reload();
            });

            throwDice();
        })

        //function to switch turns
        function setUpTurn(){

            game.innerHTML = `<p> Roll the dice for the ${gameData.players[gameData.index]}</p>`;
            actionArea.innerHTML = '<button id = "roll"> Roll the Dice </button>';

            document.getElementById('roll').addEventListener("click", function(){
                // console.log("Roll the dice!"); 
                throwDice();
            });
        }

        //function to throw dice
        function throwDice(){

            actionArea.innerHTML = '';
            dice.innerHTML = "";

            //Get random values for 1 to 6 for the score
            gameData.roll1 = Math.floor(Math.random() * 6) + 1;
            gameData.roll2 = Math.floor(Math.random() * 6) + 1;

            //put the dice images on the screen (the dice array index needs to be one less than roll1 and roll2)
            dice.innerHTML += `<img class="dice" src="${gameData.dice[gameData.roll1 - 1]}">
            <img class="dice" src="${gameData.dice[gameData.roll2 - 1]}">`;

            gameData.rollSum = gameData.roll1 + gameData.roll2;
            console.log(`Score: ${gameData.rollSum}`);

            //If Two 1's are rolled
            if (gameData.rollSum === 2) {
                console.log("Snake eyes were rolled")
                
                game.innerHTML += '<p>Oh snap! Snake eyes!</p>';
                gameData.score[gameData.index] = 0;

                //Switch players
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                
                //Show Current Score
                checkWinningCondition();
                // showCurrentScore();
                setTimeout(setUpTurn, 2000);

            //If either die is a 1
            } else if (gameData.roll1 === 1 || gameData.roll2 === 1){
                console.log("One of the two dice was a 1")
                
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);

                //Switch players
                game.innerHTML = `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`;

                //Show Current Score
                setTimeout(setUpTurn, 2000);

            //If neither die is a 1
            } else {
                console.log("The game proceeds")

                gameData.score[gameData.index] += gameData.rollSum;
                actionArea. innerHTML = '<button id = "rollagain">Roll Again</button> or <button id = "pass">Pass</button>'

                document.getElementById('rollagain').addEventListener('click', function(){
                    throwDice();
                });

                document.getElementById('pass').addEventListener('click', function(){
                    gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                    setUpTurn();
                });

                checkWinningCondition();
            }
        }

        //function to check for winner
        function checkWinningCondition(){
            if (gameData.score[gameData.index] > gameData.gameEnd) {
                
                showCurrentScore();

                score.innerHTML += `<h2>${gameData.players[gameDataindex]} wins with ${gameData.score[gameData.index]} points!</h2>`;
                
                actionArea.innerHTML = '';
                document.getElementById('quit').innerHTML = "Start a New Game?";

                // return true;

            } else {
                showCurrentScore();
                // return false;
            }
        }

        //function to output score
        function showCurrentScore(){
            score1.innerHTML = `Score: ${gameData.score[0]}`;
            score2.innerHTML = `Score: ${gameData.score[1]}`;
        }

}())