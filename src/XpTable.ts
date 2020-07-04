import XpTableRow from './XpTableRow';

export default class XpTable {
    ROW_TITLE_LEVEL = 'Level';
    ROW_TITLE_XP_GAINED = 'XP Gained So Far';
    ROW_TITLE_XP_NEEDED = 'XP Needed For Next Level';

    generate() : string {
        let tableString = "";
        tableString += `| ${this.ROW_TITLE_LEVEL} | ${this.ROW_TITLE_XP_GAINED} | ${this.ROW_TITLE_XP_NEEDED} |\n`;
        for (let i : number = 0; i <=50; i++) {
            const levelTableRow = new XpTableRow(i);
            tableString += levelTableRow.generate();
        }
        return tableString;
    }
}
