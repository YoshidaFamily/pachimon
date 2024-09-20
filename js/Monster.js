import { Character } from './Character.js';

export class Monster extends Character {
    constructor(scene, name, x, y, texture) {
        super(scene, name, null, null, null, null, x, y, texture);

        this.getStats(name).then(stats => {
            this.hp = stats[0];
            this.strength = stats[1];
            this.defense = stats[2];            
            this.speed = Math.floor(stats[5] / 20);  // 移動力は種族値そのままだと値が大きすぎるので20で割る
        });
    }

    getStats(name) {
        return fetch("https://pokeapi.co/api/v2/pokemon/" + name, {
        }).then(response => {
            return response.json();
        }).then(response => {
            let stats = []
            for (let stat of response.stats) {
                stats.push(stat.base_stat)
            }
            return stats;
        })
    }

    attack() {
    }
}
