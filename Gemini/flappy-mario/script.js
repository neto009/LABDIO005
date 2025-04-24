const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const marioImage = new Image();
marioImage.src = 'path/to/mario.png'; // Update with the correct path to the Mario image

const gravity = 0.5;
const flapStrength = -8;
let isGameOver = false;
let score = 0;

const mario = {
    x: 50,
    y: canvas.height / 2,
    width: 40,
    height: 40,
    velocity: 0,
};

const pipes = [];
const pipeWidth = 50;
const pipeGap = 100;
let frame = 0;

function drawMario() {
    ctx.drawImage(marioImage, mario.x, mario.y, mario.width, mario.height);
}

function drawPipes() {
    pipes.forEach(pipe => {
        ctx.fillStyle = 'green';
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipeWidth, pipe.bottom);
    });
}

function updatePipes() {
    if (frame % 90 === 0) {
        const top = Math.random() * (canvas.height - pipeGap - 20) + 20;
        const bottom = canvas.height - top - pipeGap;
        pipes.push({ x: canvas.width, top, bottom });
    }

    pipes.forEach(pipe => {
        pipe.x -= 2;
    });

    if (pipes.length && pipes[0].x < -pipeWidth) {
        pipes.shift();
        score++;
    }
}

function checkCollision() {
    if (mario.y + mario.height >= canvas.height || mario.y <= 0) {
        isGameOver = true;
    }

    pipes.forEach(pipe => {
        if (mario.x + mario.width > pipe.x && mario.x < pipe.x + pipeWidth) {
            if (mario.y < pipe.top || mario.y + mario.height > canvas.height - pipe.bottom) {
                isGameOver = true;
            }
        }
    });
}

function gameLoop() {
    if (isGameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
        ctx.fillText('Score: ' + score, canvas.width / 2 - 50, canvas.height / 2 + 40);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mario.velocity += gravity;
    mario.y += mario.velocity;

    drawMario();
    drawPipes();
    updatePipes();
    checkCollision();

    frame++;
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isGameOver) {
        mario.velocity = flapStrength;
    } else if (isGameOver) {
        resetGame();
    }
});

function resetGame() {
    isGameOver = false;
    score = 0;
    mario.y = canvas.height / 2;
    mario.velocity = 0;
    pipes.length = 0;
    frame = 0;
    gameLoop();
}

marioImage.onload = () => {
    gameLoop();
};