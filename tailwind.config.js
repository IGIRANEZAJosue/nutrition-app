/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        geistLight: ['Geist-Light', 'sans-serif'],
        geistThin: ['Geist-Thin', 'sans-serif'],
        geistRegular: ['Geist-Regular', 'sans-serif'],
        geistMeduim: ['Geist-Meduim', 'sans-serif'],
        geistSemiBold: ['Geist-SemiBold', 'sans-serif'],
        geistBold: ['Geist-Bold', 'sans-serif'],
        geistBlack: ['Geist-Black', 'sans-serif'],
      },
      colors: {
        primary: '#10C875',
        primaryDark: '#064431',
        primaryLight: '#D5FF88',
      },
    },
  },
  plugins: [],
};
