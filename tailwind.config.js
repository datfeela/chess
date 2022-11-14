/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '50': '50%'
      },
      width: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      maxWidth: {
        '6': '6rem'
      },
      height: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      aspectRatio: {
        'square': '1 / 1 !important'
      },
      gridTemplateRows: {
        '8': 'repeat(8, minmax(0, 1fr));'
      }
    },
  },
  plugins: [],
}
