import Character from './Character';
import Level from './Level';
import LevelingDataForSimulationRun from './LevelingDataForSimulation';


export default class CharacterLeveler {
    startingXp : number;
    character : Character;
    totalCreaturesKilled: number;

    constructor() {
        this.startingXp = 0;
        this.character = new Character('Zaglamir', this.startingXp);
        this.totalCreaturesKilled = 0;
    }

    simulateXpGain() {
        let previousLevel : number = 0;
        let creaturesKilledSinceLastLevel = 0;
        // console.log(`${this.character.name} is starting out with ${this.character.getXp()} XP.`);
        while(this.character.getLevel() < Level.maxLevel) {
            const xpJustGained = this.creatureSlainXpGainedWithNarrowXpRange();
            // const xpJustGained = this.creatureSlainXpGainedWithWideXpRange();
            this.character.gainXp(xpJustGained);
            const characterLevel = this.character.getLevel()
            const totalXp = this.character.getXp();
            this.totalCreaturesKilled++;
            creaturesKilledSinceLastLevel++;
            // console.log(`${this.character.name} killed a creature for ${xpJustGained} XP. Has total of ${totalXp} XP. Is Level ${characterLevel}.`);
            if(previousLevel != characterLevel) {
                // console.log("LEVELED UP!");
                // console.log(`Killed ${creaturesKilledSinceLastLevel} creatures since last leveling up.`);
                // console.log(`Killed ${this.totalCreaturesKilled} creatures total.`);
                previousLevel = characterLevel;
                creaturesKilledSinceLastLevel = 0;
            }
        }
        console.log(`${this.character.name} hit max level of ${Level.maxLevel} by slaying ${this.totalCreaturesKilled} creatures!`)
    }

    get simulationData(): LevelingDataForSimulationRun {
        return new LevelingDataForSimulationRun(
            this.totalCreaturesKilled,
        )
    }

    // const SLAYING_LEVELING_MODIFIER = 1.05; // Results in about 20k creatures to Level 50.

    SLAYING_LEVELING_MODIFIER_FOR_NARROW_XP_RANGE = 1.09077; // Results in just about 5k creatures to Level 50, when bonus XP is added end.

    // const SLAYING_LEVELING_MODIFIER = 1.1; // Results in about 3.6k creatures to Level 50.
    // const SLAYING_LEVELING_MODIFIER = Level.levelModifier; // Results in about 550 creatures to Level 50.

    // This gives you a more predictable amount of XP per kill. There's less
    // variety in how much XP you get per kill, but sometimes the consistency is nice.
    private creatureSlainXpGainedWithNarrowXpRange() : number {
        const levelXpModifier = this.SLAYING_LEVELING_MODIFIER_FOR_NARROW_XP_RANGE; 
        const baseSlainXp = 10;
        const randomBonusXp = Math.floor(Math.random() * 10) + 1
        return Math.ceil(
            // (baseSlainXp + randomBonusXp) * (levelXpModifier ** this.character.getLevel())
            (baseSlainXp * (levelXpModifier ** this.character.getLevel())) + randomBonusXp
        );
    }

    SLAYING_LEVELING_MODIFIER_FOR_WIDE_XP_RANGE = 1.07915; // Results in just about 5k creatures to Level 50, when bonus XP is added in beginning.

    // This gives you a less certain amount of XP per kill, but it does mean
    // you can sometimes get a ton of XP per kill. That can be rewarding.
    private creatureSlainXpGainedWithWideXpRange() : number {
        const levelXpModifier = this.SLAYING_LEVELING_MODIFIER_FOR_WIDE_XP_RANGE; 
        const baseSlainXp = 10;
        const randomBonusXp = Math.floor(Math.random() * 10) + 1
        return Math.ceil(
            (baseSlainXp + randomBonusXp) * (levelXpModifier ** this.character.getLevel())
        );
    }
}
