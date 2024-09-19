export class Hubworld {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tileSize = 32; // Smaller tiles for more detailed map
        this.map = this.generateMap();
    }

    generateMap() {
        const mapWidth = Math.floor(this.width / this.tileSize);
        const mapHeight = Math.floor(this.height / this.tileSize);
        const map = [];

        for (let y = 0; y < mapHeight; y++) {
            const row = [];
            for (let x = 0; x < mapWidth; x++) {
                if (x === 0 || y === 0 || x === mapWidth - 1 || y === mapHeight - 1) {
                    row.push('wall');
                } else if (Math.random() < 0.1) {
                    row.push('obstacle');
                } else {
                    row.push(null); // Empty space
                }
            }
            map.push(row);
        }

        // Add cave entrance
        map[Math.floor(mapHeight / 2)][Math.floor(mapWidth / 2)] = 'cave';

        return map;
    }

    draw(ctx) {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const tile = this.map[y][x];
                if (tile === 'wall') {
                    ctx.fillStyle = 'gray';
                } else if (tile === 'obstacle') {
                    ctx.fillStyle = 'brown';
                } else if (tile === 'cave') {
                    ctx.fillStyle = 'black';
                } else {
                    ctx.fillStyle = 'green';
                }
                ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }

    isCaveEntrance(x, y) {
        const tileX = Math.floor(x / this.tileSize);
        const tileY = Math.floor(y / this.tileSize);
        return this.map[tileY][tileX] === 'cave';
    }

    isValidMove(x, y) {
        const tileX = Math.floor(x / this.tileSize);
        const tileY = Math.floor(y / this.tileSize);
        return tileX >= 0 && tileX < this.map[0].length &&
               tileY >= 0 && tileY < this.map.length &&
               this.map[tileY][tileX] !== 'wall' &&
               this.map[tileY][tileX] !== 'obstacle';
    }
}
