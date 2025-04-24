const GRAVITY = 0.1; // Acceleration due to gravity
const FRICTION = 0.98; // Friction coefficient for the ball
const INITIAL_BALL_SPEED = 5; // Initial speed of the ball

class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = INITIAL_BALL_SPEED;
        this.angle = 0; // Angle in radians
    }

    update() {
        // Apply gravity
        this.speed *= FRICTION;
        this.y += this.speed * Math.sin(this.angle);
        this.x += this.speed * Math.cos(this.angle);
        
        // Check for collision with the wheel
        if (this.y + this.radius >= canvas.height) {
            this.speed = -this.speed; // Bounce back
            this.y = canvas.height - this.radius; // Reset position
        }
        
        // Simulate the ball rolling around the wheel
        this.angle += 0.05; // Adjust angle for rolling effect
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
}

class Wheel {
    constructor(radius) {
        this.radius = radius;
        this.angle = 0; // Current angle of the wheel
        this.speed = 0; // Current speed of the wheel
    }

    spin() {
        this.speed = Math.random() * 10 + 5; // Random speed for spinning
    }

    update() {
        this.angle += this.speed;
        this.speed *= 0.99; // Slow down the wheel gradually
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function updatePhysics(ball, wheel) {
    ball.update();
    wheel.update();
}