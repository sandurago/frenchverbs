/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "light-orange": "#ffbe76",
        "juicy-orange": "#f0932b",
        "grass-green": "#badc58",
        "forest-green": "#6ab04c",
        "turqoise": "#7ed6df",
        "dark-turqoise": "#22a6b3",
        "dark-blue": "#686de0",
        "purple-blue": "#4834d4",
        "deep-purple": "#30336b",
        "purple-black": "#130f40",
        "light-gray": "#dfe6e9",
        "gray": "#b2bec3",
        "dark-gray": "#636e72",
        "grafite": "#2d3436",
      }
    },
  },
  plugins: [],
}
