export class Player {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.speed = 5;
        this.size = 32;
    }

    move(dx, dy) {
        this.x += dx * this.speed;
        this.y += dy * this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.size, this.size);
        
        // Draw player name above the character
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x + this.size / 2, this.y - 5);
    }
}
