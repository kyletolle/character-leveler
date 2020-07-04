import Character from './Character';
import Level from './Level';

export default class CharacterLeveler {
    startingXp : number;
    character : Character;

    constructor() {
        this.startingXp = 0;
        this.character = new Character(this.startingXp);
    }

    simulateXpGain() {
        let previousLevel : number = 0;
        let creaturesKilledSinceLastLevel = 0;
        let totalCreaturesKilled = 0;
        console.log(`Character is starting out with ${this.character.getXp()} XP.`);
        while(this.character.getLevel() < Level.maxLevel) {
            const xpJustGained = this._randomXpGained();
            this.character.gainXp(xpJustGained);
            const characterLevel = this.character.getLevel()
            const totalXp = this.character.getXp();
            totalCreaturesKilled++;
            creaturesKilledSinceLastLevel++;
            console.log(`Character killed a creature for ${xpJustGained} XP. Has total of ${totalXp} XP. Is Level ${characterLevel}.`);
            if(previousLevel != characterLevel) {
                console.log("LEVELED UP!");
                console.log(`Killed ${creaturesKilledSinceLastLevel} creatures since last leveling up.`);
                console.log(`Killed ${totalCreaturesKilled} creatures total.`);
                previousLevel = characterLevel;
                creaturesKilledSinceLastLevel = 0;
            }
        }
        console.log(`Character hit max level of ${Level.maxLevel} by slaying ${totalCreaturesKilled} creatures!`)
    }

    _randomXpGained() : number {
        return Math.floor(Math.random() * 100) + 1
    }
}
