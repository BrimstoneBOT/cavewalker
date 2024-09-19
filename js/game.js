import { Player } from './player.js';
import { Hubworld } from './hubworld.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;

        this.hubworld = new Hubworld(this.canvas.width, this.canvas.height);
        this.player = null;

        this.gameState = 'menu';
        this.lastMoveTime = 0;
        this.moveDelay = 100; // Delay between moves in milliseconds

        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('start-game').addEventListener('click', () => this.showNameInput());
        document.getElementById('submit-name').addEventListener('click', () => this.startGame());
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    handleKeyDown(e) {
        if (this.gameState !== 'hubworld') return;

        const currentTime = Date.now();
        if (currentTime - this.lastMoveTime < this.moveDelay) return;

        let dx = 0;
        let dy = 0;

        switch (e.key) {
            case 'ArrowUp': dy = -1; break;
            case 'ArrowDown': dy = 1; break;
            case 'ArrowLeft': dx = -1; break;
            case 'ArrowRight': dx = 1; break;
            default: return;
        }

        if (this.player && this.player.move(dx, dy, this.hubworld)) {
            this.lastMoveTime = currentTime;
            if (this.hubworld.isExit(this.player.x, this.player.y)) {
                this.enterCave();
            }
        }
    }

    showNameInput() {
        document.getElementById('main-menu').style.display = 'none';
        document.getElementById('name-input').style.display = 'block';
        this.gameState = 'name-input';
    }

    startGame() {
        const playerName = document.getElementById('player-name').value.trim();
        if (playerName) {
            const [startX, startY] = this.hubworld.playerStartPosition;
            this.player = new Player(startX, startY, playerName);
            document.getElementById('name-input').style.display = 'none';
            this.canvas.style.display = 'block';
            this.gameState = 'hubworld';
            this.gameLoop();
        }
    }

    enterCave() {
        this.gameState = 'cave';
        console.log('Entering the cave!');
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('You have entered the cave!', this.canvas.width / 2, this.canvas.height / 2);
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameState === 'hubworld') {
            this.hubworld.draw(this.ctx);
            if (this.player) {
                this.player.draw(this.ctx, this.hubworld.tileSize);
            }
        }

        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new Game();
});
