import { Player } from './player.js';
import { Hubworld } from './hubworld.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;

        this.player = null;
        this.hubworld = new Hubworld(this.canvas.width, this.canvas.height);

        this.gameState = 'menu'; // 'menu', 'name-input', 'hubworld', or 'cave'

        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('start-game').addEventListener('click', () => this.showNameInput());
        document.getElementById('submit-name').addEventListener('click', () => this.startGame());
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    showNameInput() {
        document.getElementById('main-menu').style.display = 'none';
        document.getElementById('name-input').style.display = 'block';
        this.gameState = 'name-input';
    }

    startGame() {
        const playerName = document.getElementById('player-name').value.trim();
        if (playerName) {
            this.player = new Player(400, 300, playerName);
            document.getElementById('name-input').style.display = 'none';
            this.canvas.style.display = 'block';
            this.gameState = 'hubworld';
            this.fadeIn();
        }
    }

    fadeIn() {
        let opacity = 0;
        const fadeInterval = setInterval(() => {
            opacity += 0.05;
            this.canvas.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(fadeInterval);
                this.gameLoop();
            }
        }, 50);
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

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new Game();
});
