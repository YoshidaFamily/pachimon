import { Character } from './Character.js';

export class Trainer extends Character {
    constructor(scene, name, x, y, texture) {
        super(scene, name, 200, 100, 100, 3, x, y, texture);
    }

    releaseMonster() {
    }
}
