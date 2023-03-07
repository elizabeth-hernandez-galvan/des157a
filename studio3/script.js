(function() {
    //open iife
    "use strict";
    console.log("reading js");

    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const playerName = document.getElementById('player-name');
    const score = document.getElementById('score');
    const score1 = document.getElementById("score1");
    const score2 = document.getElementById("score2");
    const actionArea = document.getElementById('actions');
    const dice = document.getElementById('dice');
    const modal = document.getElementById("myModal");
    const myBtn = document.getElementById("learn");
    const span = document.getElementsByClassName("close")[0];

    const gameData = {
            dice: ["images/1.png", "images/2.png", "images/3.png", "images/4.png", "images/5.png", "images/6.png"],
            players: ['player1', 'player2'],
            score: [0, 0],
            roll1: 0,
            roll2: 0,
            rollSum: 0,
            index: 0,
            gameEnd: 29
        };

    const colors = ["red", "orange", "yellow", "lightgreen", "lightblue", "violet"];

    const numBalls = 300;
    const balls = [];
        
        for (let i = 0; i < numBalls; i++) {
            let ball = document.createElement("div");
            ball.classList.add("ball-bg");
            //Gets random colors from those defined above
            ball.style.background = colors[Math.floor(Math.random() * colors.length)];
            // Random Placement on screen
            ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
            ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
            // Gets random scale factor for each ball
            ball.style.transform = `scale(${Math.random()})`;
            ball.style.width = `${Math.random()}rem`;
            ball.style.height = ball.style.width;
          
            //adds balls to background
            balls.push(ball);
            document.body.append(ball);
        }
        
        // Keyframes (Movement)
        balls.forEach((circles, i, current) => {
            let to = {
                x: Math.random() * (i % 2 === 0 ? -5 : 5),
                y: Math.random() * 50
          };
        
          let anim = circles.animate(
            [
              { transform: "translate(0, 0)" },
              { transform: `translate(${to.x}rem, ${to.y}rem)` }
            ],
            {
              duration: (Math.random() + 1) * 2000,
              direction: "alternate",
              fill: "both",
              iterations: Infinity,
              easing: "ease-in-out"
            }
          );
        });

        myBtn.onclick = function() {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        
        startGame.addEventListener('click', function() {
            document.querySelector("#landing").className = "hidden";
            gameControl.className = "showing";
            //randomy set game index here
            gameData.index = Math.round(Math.random());
            console.log(`index: ${gameData.index}`);

            document.getElementById('quit').addEventListener("click", function(){
                location.reload();
                gameControl.className = "hidden";
            });
            console.log("set up the turn!");
            setUpTurn();
        });

        function setUpTurn() {
            game.className = "showing";
            game.innerHTML = `<p> Roll the dice for the ${gameData.players[gameData.index]}</p>`;
            actionArea.innerHTML = '<button id = "roll"> Fight </button>';

            document.getElementById('roll').addEventListener("click", function(){
                // console.log("Roll the dice!"); 
                throwDice();
            });
        };

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
                actionArea. innerHTML = '<button id = "rollagain">Fight</button> or <button id = "pass">Hide</button>'

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

                return true;

            } else {
                showCurrentScore();
                return false;
            }
        }

        //function to output score
        function showCurrentScore(){
            score1.innerHTML = `Score: ${gameData.score[0]}`;
            score2.innerHTML = `Score: ${gameData.score[1]}`;
        }

}())