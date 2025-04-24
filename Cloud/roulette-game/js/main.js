// This file contains the main JavaScript code for the roulette game.
// It initializes the game, sets up the canvas, and handles user interactions.

const canvas = document.getElementById('rouletteCanvas');
const ctx = canvas.getContext('2d');
const wheel = new Wheel(ctx);
let isSpinning = false;
let spinDuration = 5000; // Duration of the spin in milliseconds
let spinStartTime;

function init() {
    canvas.width = 800;
    canvas.height = 800;
    drawWheel();
    document.getElementById('spinButton').addEventListener('click', startSpin);
}

function drawWheel() {
    wheel.draw();
}

function startSpin() {
    if (isSpinning) return;
    isSpinning = true;
    spinStartTime = performance.now();
    playSound('wheel-spinning.mp3');
    requestAnimationFrame(spin);
}

function spin(timestamp) {
    const elapsed = timestamp - spinStartTime;
    const progress = Math.min(elapsed / spinDuration, 1);
    const rotation = easeOutCubic(progress) * 360; // Rotate the wheel

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    drawWheel();
    ctx.restore();

    if (progress < 1) {
        requestAnimationFrame(spin);
    } else {
        isSpinning = false;
        playSound('ball-rolling.mp3');
        // Logic to determine the winning number can be added here
    }
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function playSound(soundFile) {
    const audio = new Audio(`assets/sounds/${soundFile}`);
    audio.play();
}

window.onload = init;