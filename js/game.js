import { Player } from './player.js';
import { Hubworld } from './hubworld.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;

        this.player = new Player(400, 300);
        this.hubworld = new Hubworld(this.canvas.width, this.canvas.height);

        this.gameState = 'menu'; // 'menu', 'hubworld', or 'cave'

        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('options').addEventListener('click', () => this.showOptions());
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    startGame() {
        this.gameState = 'hubworld';
        document.getElementById('main-menu').style.display = 'none';
        this.canvas.style.display = 'block';
        this.gameLoop();
    }

    showOptions() {
        console.log('Options menu clicked');
    }

    handleKeyDown(e) {
        if (this.gameState !== 'hubworld') return;

        switch (e.key) {
            case 'ArrowUp':
                this.player.move(0, -1);
                break;
            case 'ArrowDown':
                this.player.move(0, 1);
                break;
            case 'ArrowLeft':
                this.player.move(-1, 0);
                break;
            case 'ArrowRight':
                this.player.move(1, 0);
                break;
        }

        if (this.hubworld.isCaveEntrance(this.player.x, this.player.y)) {
            this.enterCave();
        }
    }

    enterCave() {
        this.gameState = 'cave';
        console.log('Entering the cave!');
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameState === 'hubworld') {
            this.hubworld.draw(this.ctx);
            this.player.draw(this.ctx);
        } else if (this.gameState === 'cave') {
            // Draw cave environment (to be implemented)
        }

        requestAnimationFrame(() => this.gameLoop());
    }
}

const game = new Game();
