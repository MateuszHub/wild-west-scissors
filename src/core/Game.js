class Game {
    constructor(canvas) {
        if (!canvas || !canvas.getContext) {
            throw new Error('Invalid canvas element provided');
        }

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.scenes = {};
        this.currentScene = null;
        this.player = new Player();
        
        this.enemies = [
            new Bandit(),
            new Outlaw(),
            new Gunslinger()
        ];
        
        this.currentEnemyIndex = 0;
        this.previousEnemy = null;
        this.resultText = "";
        this.gameTime = 0;
    }

    get currentEnemy() {
        return this.enemies[this.currentEnemyIndex];
    }

    addScene(name, scene) {
        this.scenes[name] = scene;
        scene.game = this;
    }

    startGame() {
        this.player = new Player();
        this.currentEnemyIndex = 0;
        this.changeScene('battle');
    }

    nextEnemy() {
        this.previousEnemy = this.currentEnemy;
        this.currentEnemyIndex++;
    }

    resetGame() {
        this.player = new Player();
        this.currentEnemyIndex = 0;
        this.enemies.forEach((enemy, i) => {
            enemy.health = [15, 25, 30][i];
        });
    }

    changeScene(name) {
        if (!name || typeof name !== 'string') {
            console.error('Invalid scene name:', name);
            return false;
        }

        if (this.scenes[name]) {
            try {
                this.currentScene = this.scenes[name];
                this.currentScene.enter();
                return true;
            } catch (error) {
                console.error(`Error entering scene '${name}':`, error);
                return false;
            }
        }
        
        console.error(`Scene not found: ${name}`);
        return false;
    }

    update(deltaTime) {
        this.gameTime += deltaTime;
        if (this.currentScene) {
            this.currentScene.update(deltaTime);
        }
    }

    draw() {
        if (this.currentScene) {
            this.currentScene.draw(this.ctx);
        }
    }

    handleClick(x, y) {
        if (this.currentScene) {
            this.currentScene.handleClick(x, y);
        }
    }

    handleKey(key) {
        if (this.currentScene) {
            this.currentScene.handleKey(key);
        }
    }
}

window.Game = Game;
