export class Player {
    constructor(x, y, name, className = "Warrior") {
        this.x = x;
        this.y = y;
        this.name = name;
        this.className = className;
        this.level = 1;
        this.exp = 0;
        this.maxExp = 100;
        this.health = 50;
        this.maxHealth = 50;
        this.mana = 20;
        this.maxMana = 20;
        this.strength = 8;
        this.defense = 6;
        this.dexterity = 5;
        this.intelligence = 3;
        this.luck = 5;
        this.gold = 0;
        this.inventory = [];
        this.equippedItems = {
            Weapon: null,
            Head: null,
            Chest: null,
            Back: null,
            Ring: null,
            Neck: null
        };
        this.skillPoints = 0;
    }

    move(dx, dy, hubworld) {
        const newX = this.x + dx;
        const newY = this.y + dy;

        if (hubworld.isValidMove(newX, newY)) {
            this.x = newX;
            this.y = newY;
            return true;
        }
        return false;
    }

    draw(ctx, tileSize) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
        
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, (this.x + 0.5) * tileSize, this.y * tileSize - 5);
    }

    gainExp(amount) {
        this.exp += amount;
        while (this.exp >= this.maxExp) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level += 1;
        this.exp -= this.maxExp;
        this.maxExp = Math.floor(this.maxExp * 1.2);
        this.maxHealth += 8;
        this.maxMana += 2;
        this.strength += 2;
        this.defense += 1;
        this.dexterity += 1;
        this.intelligence += 1;
        this.luck += 1;
        this.skillPoints += 2;
        this.health = this.maxHealth;
        this.mana = this.maxMana;
    }

    addGold(amount) {
        this.gold += amount;
        return `You gained ${amount} gold!`;
    }
}
