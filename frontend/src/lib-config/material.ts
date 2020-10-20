export const LocalConfig = config => ({
    locale: {
        ...config,
        dateFormat: 'yyyy. MM. dd.',
        firstDayOfAWeek: 1,
        days: [
            'Vasárnap',
            'Hétfő',
            'Kedd',
            'Szerda',
            'Csütörtök',
            'Péntek',
            'Szombat'
        ],
        shortDays: ['Vasá', 'Hétf', 'Kedd', 'Szer', 'Csüt', 'Pén', 'Szomb'],
        shorterDays: ['V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz'],
        months: [
            'Január',
            'Február',
            'Március',
            'Április',
            'Május',
            'Június',
            'Július',
            'Agusztus',
            'Szeptember',
            'Október',
            'November',
            'December'
        ],
        shortMonths: [
            'Jan',
            'Feb',
            'Már',
            'Ápr',
            'Máj',
            'Jún',
            'Júl',
            'Aug',
            'Szept',
            'Okt',
            'Nov',
            'Dec'
        ],
        shorterMonths: [
            'J',
            'F',
            'M',
            'Á',
            'M',
            'Jú',
            'Jú',
            'Á',
            'Sze',
            'O',
            'N',
            'D'
        ]
    }
});
