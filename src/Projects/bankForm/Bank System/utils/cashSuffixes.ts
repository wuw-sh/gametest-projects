import {config, Player} from "../index.js";

export function cashSuffixes(pl: Player, value: number): number | string {
    try {
        if (pl.hasTag(config.tagsUI.setting.toggleOff)) return numberWithCommas(value);
        const types = ['', 'k', 'M', 'B'];
        const selectType = Math.log10(Math.abs(value)) / 3 | 0;
        if (selectType === 0) return value
        let scaled = (value / Math.pow(10, selectType * 3)).toString(), number: number | string
        const split = scaled.split('.'), int = split[0], decimal = split[1]
        if (decimal === undefined) {
            number = int
        } else if (decimal.charAt(1) === '0') {
            number = int + '.' + decimal.slice(0, 1)
        } else {
            number = int + '.' + decimal.slice(0, 2)
        }
        return number + types[selectType];

        function numberWithCommas(value: number): string {
            let x = value.toString()
            const pattern = /(-?\d+)(\d{3})/;
            while (pattern.test(x))
                x = x.replace(pattern, "$1,$2");
            return x;
        }
    } catch (e) {
        return value
    }
}

