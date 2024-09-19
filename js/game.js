import { Player } from './player.js';
import { Hubworld } from './hubworld.js';

class Game {
    constructor() {
        this.landingPage = document.getElementById('landing-page');
        this.nameInput = document.getElementById('name-input');
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.gameState = 'landing';
        this.player = null;
        this.hubworld = null;

        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.getElementById('submit-name').addEventListener('click', () => this.startGame());
    }

    handleKeyDown(e) {
        if (this.gameState === 'landing' && e.key === 'Enter') {
            this.showNameInput();
        }
    }

    showNameInput() {
        this.landingPage.style.display = 'none';
        this.nameInput.style.display = 'flex';
        this.gameState = 'name-input';
    }

    startGame() {
        const playerName = document.getElementById('player-name').value.trim();
        if (playerName) {
            this.nameInput.style.display = 'none';
            this.canvas.style.display = 'block';
            this.initializeGame(playerName);
        }
    }

    initializeGame(playerName) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.hubworld = new Hubworld(this.canvas.width, this.canvas.height);
        const [startX, startY] = this.hubworld.playerStartPosition;
        this.player = new Player(startX, startY, playerName);
        this.gameState = 'hubworld';
        this.gameLoop();
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameState === 'hubworld') {
            this.hubworld.draw(this.ctx);
            this.player.draw(this.ctx, this.hubworld.tileSize);
        }

        requestAnimationFrame(() => this.gameLoop());
    }
}

new Game();
