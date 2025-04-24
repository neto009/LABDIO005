const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const marioImage = new Image();
marioImage.src = 'path/to/mario.png'; // Update with the correct path to the Mario image

const gravity = 0.25;
const flapStrength = 4.5;
let isGameOver = false;

const bird = {
    x: 50,
    y: canvas.height / 2,
    width: 34, // Adjust based on the Mario image size
    height: 24, // Adjust based on the Mario image size
    velocity: 0,
    flap() {
        this.velocity = -flapStrength;
    },
    update() {
        this.velocity += gravity;
        this.y += this.velocity;

        if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            isGameOver = true;
        }
        if (this.y < 0) {
            this.y = 0;
        }
    },
    draw() {
        ctx.drawImage(marioImage, this.x, this.y, this.width, this.height);
    }
};

function handleKeyPress(event) {
    if (event.code === 'Space' && !isGameOver) {
        bird.flap();
    }
}

function update() {
    if (!isGameOver) {
        bird.update();
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.draw();

    if (isGameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
    }
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', handleKeyPress);
marioImage.onload = () => {
    gameLoop();
};