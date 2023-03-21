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
    const actionArea = document.getElementById('actions');
    const dice = document.getElementById('dice');
    const modal = document.getElementById("myModal");
    const myBtn = document.getElementById("learn");
    const span = document.getElementsByClassName("close")[0];
    const popUp1 = document.getElementById("popup1");
    const popUp2 = document.getElementById("popup2");
    const popUp3 = document.getElementById("popup3");
    
    // Initializing Play vs Computer
    let computer = 0;
    let computerTimer;

    //sounds
    const diceSound = new Audio("audio/dice.mp3"); 
    const turnOverSound = new Audio("audio/turnOver.mp3");
    const winSound = new Audio("audio/fanfare.mp3");

    //Overlay Stop on each task
    let flag1 = 0;
    let flag2 = 0;
    
    const gameData = {
        dice: ["images/1.png", "images/2.png", "images/3.png", "images/4.png", "images/5.png", "images/6.png"],
        players: ['Player 1','Computer'],
        score: [0, 0],
        score1: 0,
        score2:0,
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        task1: 10,
        task2: 20,
        gameEnd: 30
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
        ball.style.top = `${Math.floor(Math.random() * 1)}vh`;
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
            duration: (Math.random() + 1) * 3000,
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

        showImage();

        //randomy set game index here
        gameData.index = Math.round(Math.random());
        console.log(`index: ${gameData.index}`);

        document.getElementById('quit').addEventListener("click", function(){
            location.reload();
            gameControl.className = "hidden";
        });

        computer = 1;

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
            turnOverSound.play();

            if(computer){
                game.innerHTML += '<p class = "text">Oh snap! computer rolled snake eyes! Switching to Player 1</p>';
            } else {
                game.innerHTML += '<p class = "text">Oh snap! You rolled snake eyes! Switching to Computer</p>';
            }
            
            //Score Resets
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
            turnOverSound.play();

            if(computer){
                game.innerHTML += '<p class = "text">Sorry, one of your rolls was a one, <br>switching to Player 1</p>';
            } else {
                game.innerHTML += '<p class = "text">Sorry, one of your rolls was a one, <br>switching to Computer</p>';
            }

            //Switch players
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);

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

            if(checkWinningCondition()) {
                winSound.play();
            } else {
                diceSound.play();
            }
        }
    }

        
    //function to check for winner
    function checkWinningCondition(){
        
        if (gameData.score[gameData.index] >= gameData.gameEnd) {

            console.log("WIN")
            showCurrentScore();

            // End Play vs Computer
            clearTimeout(computerTimer);

            openPopup3();
            score.innerHTML += `<h2 class="winner">${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;
                
            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start a New Game?";
                    
            return true;
        }
        else if (gameData.score[gameData.index] >= gameData.task1 && gameData.score[gameData.index] < gameData.task2 && !flag1) {
            console.log("Task 1")
            flag1 = 1;
            showCurrentScore();
            openPopup1();

            return true;
        } 
        else if (gameData.score[gameData.index] >= gameData.task2 && gameData.score[gameData.index] < gameData.gameEnd && !flag2) {
            console.log("Task 2")
            flag2 = 1;
            showCurrentScore();
            openPopup2();

            return true;
        }
        else {
            showCurrentScore();
            return false;
        }
    }

    //function to output score
    function showCurrentScore(){
        score1.innerHTML = `Score: ${gameData.score[0]}`;
        score2.innerHTML = `Score: ${gameData.score[1]}`;
    }

    const cont1 = document.getElementById("continue1");
    const cont2 = document.getElementById("continue2");
    const cont3 = document.getElementById("continue3");
    
    cont1.onclick = function() {
        closePopup1();
    }

    cont2.onclick = function() {
        closePopup2();
    }

    cont3.onclick = function() {
        closePopup3();
        window.location.reload();
    }

    //Turn on Overlay 1
    function openPopup1() {
        popUp1.classList.add("open")
    }

    function closePopup1() {
        popUp1.classList.remove("open");
        console.log("overlay off");
    }

    //Turn on Overlay 2
    function openPopup2() {
        popUp2.classList.add("open")
    }

    function closePopup2() {
        popUp2.classList.remove("open");
        console.log("overlay off");
    }

    //Turn on Overlay 3
    function openPopup3() {
        popUp3.classList.add("open")
    }

    function closePopup3() {
        popUp3.classList.remove("open");
        console.log("overlay off");
    }

}())