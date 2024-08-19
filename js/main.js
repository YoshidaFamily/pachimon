import { GRID_SIZE, CELL_SIZE } from './constants.js';
import { Trainer } from './Trainer.js';
import { Monster } from './Monster.js';

let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let characters = [];
let selectedCharacter = null;

let game = new Phaser.Game(config);
let graphics = null;

function preload() {
    graphics = this.add.graphics();

    this.load.image('satoshi', './assets/satoshi.png');
    this.load.image('shigeru', './assets/shigeru.png');
    this.load.image('pikachu', './assets/pikachu.png');
    this.load.image('eevee', './assets/eevee.png');
}

function create() {
    this.cameras.main.setBackgroundColor('#228855'); // 背景

    const lines = this.add.graphics();
    lines.lineStyle(10, 0xff0000, 1); // 線の太さ、色、透明度
    for (let x = 0; x <= config.width; x += CELL_SIZE) {
        lines.beginPath();
        lines.moveTo(x, 0);
        lines.lineTo(x, config.height);
        lines.strokePath();
    }
    for (let y = 0; y <= config.height; y += CELL_SIZE) {
        lines.beginPath();
        lines.moveTo(0, y);
        lines.lineTo(config.width, y);
        lines.strokePath();
    }

    characters.push(new Trainer(this, "satoshi", 100, 10, 10, 3, 0, GRID_SIZE - 1, 'satoshi'));
    characters.push(new Monster(this, "pikachu", 100, 10, 10, 3, 1, GRID_SIZE - 2, 'pikachu'));

    characters.push(new Trainer(this, "shigeru", 100, 10, 10, 3, GRID_SIZE - 1, 0, 'shigeru'));
    characters.push(new Monster(this, "eevee", 100, 10, 10, 3, GRID_SIZE - 2, 1, 'eevee'));

    //画面クリック時の処理
    this.input.on('pointerdown', function(pointer) {
        let x = Math.min(Math.floor(pointer.x / CELL_SIZE), GRID_SIZE - 1);
        let y = Math.min(Math.floor(pointer.y / CELL_SIZE), GRID_SIZE - 1);
        console.log(x, y);

        if (selectedCharacter !== null) {
            if (Math.abs(selectedCharacter.x - x) + Math.abs(selectedCharacter.y - y) <= selectedCharacter.speed) {
                graphics.clear();
                selectedCharacter.move(x, y);
                selectedCharacter = null;
            }

        } else {
            // キャラクターの選択判定
            graphics.clear();
            for (const character of characters) {
                if (x === character.x && y === character.y) {
                    console.log("Character selected");
                    selectedCharacter = character;

                    // 移動範囲のハイライト
                    for (let dx = -character.speed; dx <= character.speed; dx++) {
                        for (let dy = -character.speed; dy <= character.speed; dy++) {
                            if (Math.abs(dx) + Math.abs(dy) <= character.speed) {
                                const highlightX = (character.x + dx) * CELL_SIZE;
                                const highlightY = (character.y + dy) * CELL_SIZE;
                                graphics.fillStyle(0x0000ff, 0.5);
                                graphics.fillRect(highlightX, highlightY, CELL_SIZE, CELL_SIZE);
                            }
                        }
                    }
                }
            }
        }
    }, this);
}

function update() {}
