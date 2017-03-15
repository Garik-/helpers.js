/**
         * Возвращает форму множественного числа в русском языке
         * @link http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms
         * 
         * @param {Number} n число чего-то
         * @returns {Number} 0 один,1 мало, 2 много   
         */

export default function (n) {
    return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
}