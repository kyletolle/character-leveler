var numeral = require('numeral');
import Level from './Level';

export default class XpTable {
    generate() : string {
        let tableString = "";
        tableString += "| Level | XP Gained So Far | XP Needed For Next Level |\n";
        for (let i : number = 0; i <=50; i++) {
            const level = new Level(i)
            const paddedI = i.toString().padStart(5, ' ')

            const xpGainedSoFar = level.getXpGainedSoFar()
            const paddedXpGainedSoFar = numeral(xpGainedSoFar).format('0,0')
            const formattedXpGainedSoFar = (typeof xpGainedSoFar === 'number' ? paddedXpGainedSoFar : xpGainedSoFar).padStart(16, ' ')

            const xpNeededForNextLevel = level.getXpNeededForNextLevel()
            const paddedXpNeeded = numeral(xpNeededForNextLevel).format('0,0')
            let formattedXpNeeded = '';
            if (level.level === level.maxLevel) {
                formattedXpNeeded = '---'.padStart(24, ' ');
            } else {
                formattedXpNeeded = (typeof xpNeededForNextLevel === 'number' ? paddedXpNeeded : xpNeededForNextLevel).padStart(24, ' ')
            }

            tableString += `| ${paddedI} | ${formattedXpGainedSoFar} | ${formattedXpNeeded} |\n`
            
        }
        return tableString;
    }
}