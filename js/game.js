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

        this.gameState = 'menu';
        this.keys = {};

        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('start-game').addEventListener('click', () => this.showNameInput());
        document.getElementById('submit-name').addEventListener('click', () => this.startGame());
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    handleKeyDown(e) {
        this.keys[e.key] = true;
    }

    handleKeyUp(e) {
        this.keys[e.key] = false;
    }

    showNameInput() {
        document.getElementById('main-menu').style.display = 'none';
        document.getElementById('name-input').style.display = 'block';
        this.gameState = 'name-input';
    }

    startGame() {
        const playerName = document.getElementById('player-name').value.trim();
        if (playerName) {
            this.player = new Player(1, 1, playerName);
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

    updatePlayerPosition() {
        if (this.gameState !== 'hubworld') return;

        let dx = 0;
        let dy = 0;

        if (this.keys['ArrowUp']) dy -= 1;
        if (this.keys['ArrowDown']) dy += 1;
        if (this.keys['ArrowLeft']) dx -= 1;
        if (this.keys['ArrowRight']) dx += 1;

        if (dx !== 0 || dy !== 0) {
            this.player.move(dx, dy, this.hubworld);

            if (this.hubworld.isExit(this.player.x * this.hubworld.tileSize, this.player.y * this.hubworld.tileSize)) {
                this.enterCave();
            }
        }
    }

    enterCave() {
        this.gameState = 'cave';
        console.log('Entering the cave!');
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.updatePlayerPosition();

        if (this.gameState === 'hubworld') {
            this.hubworld.draw(this.ctx);
            this.player.draw(this.ctx, this.hubworld.tileSize);
        } else if (this.gameState === 'cave') {
        }

        requestAnimationFrame(() => this.gameLoop());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Game();
});
