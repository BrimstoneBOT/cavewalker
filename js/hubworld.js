export class Hubworld {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tileSize = 32;
        this.mapSize = [Math.floor(width / this.tileSize), Math.floor(height / this.tileSize)];
        this.map = this.generateMap();
        this.exitPosition = this.generateExit();
        this.exitRevealed = false;
        this.playerStartPosition = this.generatePlayerStart();
    }

    generateMap() {
        const map = [];
        for (let y = 0; y < this.mapSize[1]; y++) {
            const row = [];
            for (let x = 0; x < this.mapSize[0]; x++) {
                if (x === 0 || y === 0 || x === this.mapSize[0] - 1 || y === this.mapSize[1] - 1) {
                    row.push('obstacle');
                } else if (Math.random() < 0.1) {
                    row.push('obstacle');
                } else {
                    row.push(null);
                }
            }
            map.push(row);
        }
        return map;
    }

    generateExit() {
        let x, y;
        do {
            x = Math.floor(Math.random() * (this.mapSize[0] - 2)) + 1;
            y = Math.floor(Math.random() * (this.mapSize[1] - 2)) + 1;
        } while (this.map[y][x] !== null);
        return [x, y];
    }

    generatePlayerStart() {
        let x, y;
        do {
            x = Math.floor(Math.random() * (this.mapSize[0] - 2)) + 1;
            y = Math.floor(Math.random() * (this.mapSize[1] - 2)) + 1;
        } while (this.map[y][x] !== null || (x === this.exitPosition[0] && y === this.exitPosition[1]));
        return [x, y];
    }

    draw(ctx) {
        for (let y = 0; y < this.mapSize[1]; y++) {
            for (let x = 0; x < this.mapSize[0]; x++) {
                const tile = this.map[y][x];
                if (tile === 'obstacle') {
                    ctx.fillStyle = 'gray';
                } else if (this.exitRevealed && x === this.exitPosition[0] && y === this.exitPosition[1]) {
                    ctx.fillStyle = 'yellow';
                } else {
                    ctx.fillStyle = 'green';
                }
                ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }

    isValidMove(x, y) {
        const tileX = Math.floor(x / this.tileSize);
        const tileY = Math.floor(y / this.tileSize);
        return tileX >= 0 && tileX < this.mapSize[0] &&
               tileY >= 0 && tileY < this.mapSize[1] &&
               this.map[tileY][tileX] !== 'obstacle';
    }

    isExit(x, y) {
        const tileX = Math.floor(x / this.tileSize);
        const tileY = Math.floor(y / this.tileSize);
        return this.exitRevealed && tileX === this.exitPosition[0] && tileY === this.exitPosition[1];
    }
}
