import { UIManager } from './ui_manager.js';
import { GameState } from './game_state.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.uiManager = new UIManager();
        this.gameState = new GameState();

        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('options').addEventListener('click', () => this.showOptions());
    }

    startGame() {
        document.getElementById('main-menu').style.display = 'none';
        this.canvas.style.display = 'block';
        // Initialize game logic
    }

    showOptions() {
        // Options menu
        console.log('Options menu clicked');
    }
}

const game = new Game();
