let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const GRID_SIZE = 10; // グリッドのサイズ（10x10）
const CELL_SIZE = config.width / GRID_SIZE; // セルのサイズ

let score = 0;
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

    let character = this.add.image(CELL_SIZE / 2, CELL_SIZE / 2, 'pikachu');
    character.row = 0;
    character.col = 0;
    character.move = 3;
    character.setScale(0.1);
    characters.push(character);

    //画面クリック時の処理
    this.input.on('pointerdown', function(pointer) {
        let row = Math.min(Math.floor(pointer.x / CELL_SIZE), GRID_SIZE - 1);
        let col = Math.min(Math.floor(pointer.y / CELL_SIZE), GRID_SIZE - 1);
        console.log(row, col);

        if (selectedCharacter !== null) {
            if (Math.abs(selectedCharacter.row - row) + Math.abs(selectedCharacter.col - col) <= selectedCharacter.move) {
                graphics.clear();
                selectedCharacter = null;

                character.row = row;
                character.col = col;
                this.tweens.add({
                    targets: character,
                    x: character.row * CELL_SIZE + CELL_SIZE / 2,
                    y: character.col * CELL_SIZE + CELL_SIZE / 2,
                    duration: 300,
                    ease: 'Linear'
                });
            }

        } else {
            // キャラクターの選択判定
            graphics.clear();
            for (const character of characters) {
                if (row === character.row && col === character.col) {
                    console.log("Character selected");
                    selectedCharacter = character;

                    // 移動範囲のハイライト
                    for (let dx = -character.move; dx <= character.move; dx++) {
                        for (let dy = -character.move; dy <= character.move; dy++) {
                            if (Math.abs(dx) + Math.abs(dy) <= character.move) {
                                const highlightX = (character.row + dx) * CELL_SIZE;
                                const highlightY = (character.col + dy) * CELL_SIZE;
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