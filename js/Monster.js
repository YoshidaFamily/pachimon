import { Character } from './Character.js';

export class Monster extends Character {
    constructor(scene, name, hp, strength, defense, speed, x, y, texture) {
        super(scene, name, hp, strength, defense, speed, x, y, texture);
    }

    attack() {
    }
}
