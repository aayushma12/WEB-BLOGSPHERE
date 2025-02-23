/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🔵 Blue Shades
        lightBlue: '#caf0f8',
        skyBlue: '#ade8f4',
        babyBlue: '#90e0ef',
        aquaBlue: '#48cae4',
        blue: '#00b4d8',
        deepBlue: '#0096c7',
        navyBlue: '#0077b6',
        darkBlue: '#023e8a',
        midnightBlue: '#03045e',

        // 🩷 Pink Shades
        lightPink: '#fde2e4',
        softPink: '#f9c0c0',
        pink: '#ff99ac',
        hotPink: '#ff6b81',
        deepPink: '#ff477e',
        rose: '#f43f5e',
        blushPink: '#fcd1d1',

        // 💜 Purple Shades
        lavender: '#e6e6fa',
        lilac: '#dcd0ff',
        softPurple: '#cdb4db',
        amethyst: '#9d4edd',
        violet: '#7b2cbf',
        darkPurple: '#5a189a',
        plum: '#6a0572',

        // 💚 Green Shades
        mintGreen: '#caffbf',
        seaGreen: '#80ed99',
        forestGreen: '#2d6a4f',
        limeGreen: '#b7e4c7',
        emerald: '#50c878',
        olive: '#556b2f',
        jade: '#00a86b',

        // 💛 Yellow & Orange Shades
        lemonYellow: '#fef9c3',
        pastelYellow: '#fdfd96',
        amber: '#ffbf00',
        gold: '#ffd700',
        peach: '#ffdab9',
        coral: '#ff7f50',
        orange: '#ff9e00',
        burntOrange: '#cc5500',

        // 🩶 Gray & Neutral Shades
        lightGray: '#f5f5f5',
        ashGray: '#b2beb5',
        coolGray: '#d1d5db',
        silver: '#c0c0c0',
        slateGray: '#708090',
        charcoal: '#36454f',
        jetBlack: '#343434',

        // 🖤 Black & White
        pureWhite: '#ffffff',
        offWhite: '#f8f9fa',
        pureBlack: '#000000',

        // 🩵 Aqua & Cyan Shades
        paleCyan: '#c0fdfb',
        cyan: '#00ffff',
        teal: '#008080',
        darkCyan: '#008b8b',

        // 🍂 Brown & Earthy Shades
        beige: '#f5f5dc',
        tan: '#d2b48c',
        coffee: '#6f4e37',
        chestnut: '#964b00',
        sienna: '#a0522d',
        darkBrown: '#4e342e',

        // 🌿 Earth Tones
        mossGreen: '#8a9a5b',
        khaki: '#f0e68c',
        sand: '#c2b280',

        // 🌸 Additional Pastel Shades
        pastelBlue: '#aec6cf',
        pastelGreen: '#77dd77',
        pastelPurple: '#b39eb5',
        pastelOrange: '#ffb347',
        pastelPink: '#ffb6c1',

        // 🪄 Miscellaneous
        salmon: '#fa8072',
        rubyRed: '#9b111e',
        bloodRed: '#8a0303',
        neonGreen: '#39ff14',
        royalBlue: '#4169e1',
      },
    },
  },
  plugins: [],
}
