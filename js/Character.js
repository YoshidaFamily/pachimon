import { CELL_SIZE } from './constants.js';

export class Character {
    constructor(scene, name, hp, strength, defense, speed, x, y, texture) {
        this.scene = scene;
        this.name = name;
        this.hp = hp;
        this.strength = strength;
        this.defense = defense;
        this.speed = speed;
        this.x = x;
        this.y = y;

        this.sprite = scene.add.sprite((0.5 + x) * CELL_SIZE, (0.5 + x) * CELL_SIZE, texture);
        this.sprite.setDisplaySize(CELL_SIZE - 10, CELL_SIZE - 10);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        this.scene.tweens.add({
            targets: this.sprite,
            x: (0.5 + x) * CELL_SIZE,
            y: (0.5 + y) * CELL_SIZE,
            duration: 300,
            ease: 'Linear'
        });
    }
}
