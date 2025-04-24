class Wheel {
    constructor(canvasId, numSections) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.numSections = numSections;
        this.angle = 0;
        this.speed = 0;
        this.isSpinning = false;
        this.sectionAngle = (2 * Math.PI) / this.numSections;
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.save();
        this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.context.rotate(this.angle);

        for (let i = 0; i < this.numSections; i++) {
            this.context.beginPath();
            this.context.moveTo(0, 0);
            this.context.arc(0, 0, 200, this.sectionAngle * i, this.sectionAngle * (i + 1));
            this.context.fillStyle = i % 2 === 0 ? '#FF0000' : '#000000';
            this.context.fill();
            this.context.stroke();
        }

        this.context.restore();
    }

    spin() {
        this.isSpinning = true;
        this.speed = 0.5; // Initial speed
        this.animate();
    }

    animate() {
        if (this.isSpinning) {
            this.angle += this.speed;
            this.speed *= 0.99; // Simulate friction
            this.draw();

            if (this.speed < 0.01) {
                this.isSpinning = false;
                this.speed = 0;
                this.angle = Math.round(this.angle / this.sectionAngle) * this.sectionAngle; // Snap to section
                this.determineWinningNumber();
            } else {
                requestAnimationFrame(this.animate.bind(this));
            }
        }
    }

    determineWinningNumber() {
        const winningIndex = Math.floor((this.angle / this.sectionAngle) % this.numSections);
        console.log(`Winning number: ${winningIndex}`);
        // Additional logic to handle the winning number can be added here
    }
}