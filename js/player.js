export class Player {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.speed = 7; // Adjust speed for smoother movement
        this.size = 32;
    }

    move(dx, dy, hubworld) {
        const newX = this.x + dx * this.speed;
        const newY = this.y + dy * this.speed;

        if (hubworld.isValidMove(newX, newY)) {
            this.x = newX;
            this.y = newY;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.size, this.size);
        
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x + this.size / 2, this.y - 5);
    }
}
