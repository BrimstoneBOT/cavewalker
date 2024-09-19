export class Hubworld {
    constructor(width, height) {
        this.mapSize = [30, 20]; 
        this.tileSize = Math.min(Math.floor(width / this.mapSize[0]), Math.floor(height / this.mapSize[1]));
        this.map = this.generateMap();
        this.exitPosition = [this.mapSize[0] - 2, Math.floor(this.mapSize[1] / 2)]; // Exit on the right side
        this.playerStartPosition = [1, Math.floor(this.mapSize[1] / 2)]; // Start on the left side
    }

    generateMap() {
        const map = [];
        for (let y = 0; y < this.mapSize[1]; y++) {
            const row = [];
            for (let x = 0; x < this.mapSize[0]; x++) {
                if (x === 0 || y === 0 || x === this.mapSize[0] - 1 || y === this.mapSize[1] - 1) {
                    row.push('wall');
                } else {
                    row.push(null); // Empty space
                }
            }
            map.push(row);
        }
        // Set the exit
        map[this.exitPosition[1]][this.exitPosition[0]] = 'exit';
        return map;
    }

    draw(ctx) {
        for (let y = 0; y < this.mapSize[1]; y++) {
            for (let x = 0; x < this.mapSize[0]; x++) {
                const tile = this.map[y][x];
                if (tile === 'wall') {
                    ctx.fillStyle = 'gray';
                } else if (tile === 'exit') {
                    ctx.fillStyle = 'yellow';
                } else {
                    ctx.fillStyle = 'green';
                }
                ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }

    isValidMove(x, y) {
        return x >= 0 && x < this.mapSize[0] &&
               y >= 0 && y < this.mapSize[1] &&
               this.map[y][x] !== 'wall';
    }

    isExit(x, y) {
        return this.map[y][x] === 'exit';
    }
}
