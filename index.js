// Initialize game variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('El_Risitas_Laugh_Meme_template_5_Sec_[_YouConvert.net_].mp3');
const gameOverSound = new Audio('Man Screaming I Sound Effect.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('12_saal_bilal_saeed_lyrics.mp3');
let speed = 19;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let audioEnabled = false;

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If snake collides with itself or the wall
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) return true;
    return false;
}

function gameEngine() {
    // If snake collides with itself or the wall
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Pyar me aadmi andha hota hai! Abhishek bhi tha!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }

    // If the snake has eaten the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2, b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Display the snake and food
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add(index === 0 ? 'head' : 'snake');
        board.appendChild(snakeElement);
    });

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);

// Keyboard event listeners (for laptops)
window.addEventListener('keydown', e => {
    if (!audioEnabled) {
        enableAudioOnFirstInteraction();
        audioEnabled = true;
    }

    inputDir = { x: 0, y: 1 }; // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            inputDir = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            inputDir = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            inputDir = { x: 1, y: 0 };
            break;
    }
});

// Mobile touch event listeners (for touch devices)
let touchStartX = 0, touchStartY = 0;

window.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;

    if (!audioEnabled) {
        enableAudioOnFirstInteraction();
        audioEnabled = true;
    }
});

window.addEventListener('touchend', e => {
    let touchEndX = e.changedTouches[0].clientX;
    let touchEndY = e.changedTouches[0].clientY;

    let diffX = touchEndX - touchStartX;
    let diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 0) {
            inputDir = { x: 1, y: 0 }; // Right swipe
        } else {
            inputDir = { x: -1, y: 0 }; // Left swipe
        }
    } else {
        // Vertical swipe
        if (diffY > 0) {
            inputDir = { x: 0, y: 1 }; // Down swipe
        } else {
            inputDir = { x: 0, y: -1 }; // Up swipe
        }
    }

    moveSound.play(); // Play move sound on swipe
});

// Function to enable audio on first interaction (required for mobile)
function enableAudioOnFirstInteraction() {
    // Play and pause each audio to unlock it for mobile
    foodSound.play();
    foodSound.pause();
    gameOverSound.play();
    gameOverSound.pause();
    moveSound.play();
    moveSound.pause();
    musicSound.play();
    musicSound.pause();
}
