export class Hubworld {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tileSize = 64;
        this.map = this.generateMap();
    }

    generateMap() {
        const map = [];
        for (let y = 0; y < this.height / this.tileSize; y++) {
            const row = [];
            for (let x = 0; x < this.width / this.tileSize; x++) {
                row.push(0); // 0 represents grass
            }
            map.push(row);
        }
        // Add cave entrance
        map[5][5] = 1; // 1 represents cave entrance
        return map;
    }

    draw(ctx) {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] === 0) {
                    ctx.fillStyle = 'green';
                } else if (this.map[y][x] === 1) {
                    ctx.fillStyle = 'brown';
                }
                ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }

    isCaveEntrance(x, y) {
        const tileX = Math.floor(x / this.tileSize);
        const tileY = Math.floor(y / this.tileSize);
        return this.map[tileY][tileX] === 1;
    }
}
