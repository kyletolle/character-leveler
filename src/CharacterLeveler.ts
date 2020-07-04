import Character from './Character';

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
        for(let i = 0; i <= 100; i++) {
            const xpJustGained = this._randomXpGained();
            this.character.gainXp(xpJustGained);
            const characterLevel = this.character.getLevel()
            const totalXp = this.character.getXp();
            creaturesKilledSinceLastLevel++;
            console.log(`Character killed a creature for ${xpJustGained} XP. Has total of ${totalXp} XP. Is Level ${characterLevel}.`);
            if(previousLevel != characterLevel) {
                console.log("LEVELED UP!");
                console.log(`Character killed ${creaturesKilledSinceLastLevel} creatures since last leveling up.`);
                previousLevel = characterLevel;
                creaturesKilledSinceLastLevel = 0;
            }
        }
    }

    _randomXpGained() : number {
        return Math.floor(Math.random() * 100) + 1
    }
}
