(function() {
    //open iife
    "use strict";
    console.log("reading js");

    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const score = document.getElementById('score');
    const score1 = document.getElementById("score1");
    const score2 = document.getElementById("score2");
    const player = document.getElementById("play1");
    const computer = document.getElementById("play2");
    const actionArea = document.getElementById('actions');
    const dice = document.getElementById('dice');
    const modal = document.getElementById("myModal");
    const myBtn = document.getElementById("learn");
    const span = document.getElementsByClassName("close")[0];
    const popup = document.getElementById("popup");
    const gameData = {
            dice: ["images/1.png", "images/2.png", "images/3.png", "images/4.png", "images/5.png", "images/6.png"],
            players: ['Player 1', 'Player 2', 'Player 3', 'Player 4','Computer'],
            score: [0, 0],
            roll1: 0,
            roll2: 0,
            rollSum: 0,
            index: 0,
            task1: 9,
            task2: 19,
            task3: 29
        };
    
        const pics = [
            'url"images/AI_Gryffindor.jpg")',
            'url"images/AI_Maze.jpg")',
            'url"images/AI_Merperson.jpg")',
            'url"images/AI_Gryffindor.jpg")'
        ];

        const pic = document.querySelector('#player');
  
        function showImage() {
            let a = Math.floor(Math.random() * pics.length);
            let img = pics[a];
            pic.style.backgroundImage = img;
        }

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

        function choosePlayer() {
            // Random Player Generator
        }
        
        // Function to Play Game (Start of play vs Computer)
        const playGame = () => {
        const fightBtn = document.querySelector('.rollagain');
        const passBtn = document.querySelector('.pass');
        // const playerOpt = [fightBtn,passBtn];
        const computerOpt = ['fight','pass'];
        
            // Function to start playing game
            playerOptions.forEach(option => {
                option.addEventListener('click',function(){
        
                    const choiceNumber = Math.floor(Math.random()*2); //(2 chocies)
                    const computerChoice = computerOpt[choiceNumber];
        
                    // Function to check who wins
                    winner(this.innerText,computerChoice)
                    
                    // if(// Calling gameOver function){
                
                    // }
                })
            })
        }
        

        startGame.addEventListener('click', function() {
            document.querySelector("#landing").className = "hidden";
            gameControl.className = "showing";

            showImage();

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
            game.innerHTML = `<p class = "text">${gameData.players[gameData.index]}'s Turn</p>`;
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
                
                game.innerHTML += '<p class = "text">Oh snap! Snake eyes!</p>';
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
                game.innerHTML = `<p class = "text">Sorry, one of your rolls was a one, <br>switching to ${gameData.players[gameData.index]}</p>`;

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
        function checkWinningCondition(player,computer){
            if (gameData.score[gameData.index] > gameData.task1) {
                console.log("Task1")
                
                showCurrentScore();

                if(player === gameData.score[gameData.index] > gameData.task1){
                    console.log("PLAYER WINS")
                    showCurrentScore();

                    score.innerHTML += `<h2 class="winner">Good work, you win with ${gameData.score[gameData.index]} points!</h2>`;
                
                    actionArea.innerHTML = '';
                    document.getElementById('quit').innerHTML = "Start a New Game?";
                }
                else if(computer == gameData.score[gameData.index] > gameData.task1){
                    console.log("COMPUTER WINS")
                    score.innerHTML += `<h2 class="winner">Sorry, the computer wins with ${gameData.score[gameData.index]} points!</h2>`;
                
                    actionArea.innerHTML = '';
                    document.getElementById('quit').innerHTML = "Start a New Game?";
            
                    }

                // score.innerHTML += `<h2 class="winner">${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;
                
                // actionArea.innerHTML = '';
                // document.getElementById('quit').innerHTML = "Start a New Game?";

                openPopup()

                return true;
            }else if (gameData.score[gameData.index] > gameData.task2) {
                console.log("Task2")
                
                showCurrentScore();

                if(player === gameData.score[gameData.index] > gameData.task1){
                    console.log("PLAYER WINS")
                    showCurrentScore();

                    score.innerHTML += `<h2 class="winner">Good work, you win with ${gameData.score[gameData.index]} points!</h2>`;
                
                    actionArea.innerHTML = '';
                }
                else if(computer == gameData.score[gameData.index] > gameData.task1){
                    console.log("COMPUTER WINS")
                    score.innerHTML += `<h2 class="winner">Sorry, the computer wins with ${gameData.score[gameData.index]} points!</h2>`;
                
                    actionArea.innerHTML = '';
                    document.getElementById('quit').innerHTML = "Start a New Game?";
            
                    }

                openPopup()

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

        //Turn on Overlay
        function openPopup() {
        popup.classList.add("open")
        popup.innerHTML = '<h1>CONGRATULATIONS</h1><div class="imgRow"><img src="images/AI_dragon.jpg" alt="dragon"><img src="images/AI_Merperson.jpg" alt="merperson"><img src="images/AI_Maze.jpg" alt="maze"></div><h2>The dragon has been slayed. You have passed the first challenge! Next Challenge: Surviving the Hogwarts Lake.</h2><button id = "continue"> Continue </button>';
        console.log("overlay on");
        }

        const cont = document.getElementById("continue");

        cont.onclick = function() {
            closePopup();
            throwDice();
        }

        function closePopup() {
        popup.classList.remove("open");
        console.log("overlay off");
        }

}())