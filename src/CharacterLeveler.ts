import Character from './Character';
import Level from './Level';

export default class CharacterLeveler {
    startingXp : number;
    character : Character;

    constructor() {
        this.startingXp = 0;
        this.character = new Character('Zaglamir', this.startingXp);
    }

    simulateXpGain() {
        let previousLevel : number = 0;
        let creaturesKilledSinceLastLevel = 0;
        let totalCreaturesKilled = 0;
        console.log(`${this.character.name} is starting out with ${this.character.getXp()} XP.`);
        while(this.character.getLevel() < Level.maxLevel) {
            const xpJustGained = this._creatureSlainXpGained();
            this.character.gainXp(xpJustGained);
            const characterLevel = this.character.getLevel()
            const totalXp = this.character.getXp();
            totalCreaturesKilled++;
            creaturesKilledSinceLastLevel++;
            console.log(`${this.character.name} killed a creature for ${xpJustGained} XP. Has total of ${totalXp} XP. Is Level ${characterLevel}.`);
            if(previousLevel != characterLevel) {
                console.log("LEVELED UP!");
                console.log(`Killed ${creaturesKilledSinceLastLevel} creatures since last leveling up.`);
                console.log(`Killed ${totalCreaturesKilled} creatures total.`);
                previousLevel = characterLevel;
                creaturesKilledSinceLastLevel = 0;
            }
        }
        console.log(`${this.character.name} hit max level of ${Level.maxLevel} by slaying ${totalCreaturesKilled} creatures!`)
    }

    // const SLAYING_LEVELING_MODIFIER = 1.05; // Results in about 20k creatures to Level 50.
    const SLAYING_LEVELING_MODIFIER = 1.09077; // Results in just about 5k creatures to Level 50.
    // const SLAYING_LEVELING_MODIFIER = 1.1; // Results in about 3.6k creatures to Level 50.
    // const SLAYING_LEVELING_MODIFIER = Level.levelModifier; // Results in about 550 creatures to Level 50.
    _creatureSlainXpGained() : number {
        const levelXpModifier = this.SLAYING_LEVELING_MODIFIER; 
        const baseSlainXp = 10;
        const randomBonusXp = Math.floor(Math.random() * 10) + 1
        return Math.ceil(
            (baseSlainXp * (levelXpModifier ** this.character.getLevel())) + randomBonusXp
        );
    }
}
