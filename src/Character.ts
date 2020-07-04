import Level from './Level';

export default class Character {
    xp : number;

    constructor(xp : number) {
        this.xp = xp;
    }

    gainXp(amountOfXpGained : number) {
        this.xp += amountOfXpGained;
    }

    getLevel() : number {
        return Level.calculateLevelFromTotalXp(this.xp);
    }

    getXp() : number {
        return this.xp;
    }
}
