/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: '#caf0f8',
        skyBlue: '#ade8f4',
        babyBlue: '#90e0ef',
        aquaBlue: '#48cae4',
        blue: '#00b4d8',
        deepBlue: '#0096c7',
        navyBlue: '#0077b6',
        darkBlue: '#023e8a',
        midnightBlue: '#03045e',
      },
    },
  },
  plugins: [],
}

