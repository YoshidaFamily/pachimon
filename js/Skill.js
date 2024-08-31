import { Character } from './Character.js';

export class Skill {
    constructor(name, pp, power, length, type) {
        this.name = name;
        this.type = type;
        this.pp = pp;
        this.power = power;
        this.length = length;
    }
}
