/** @type {import('tailwindcss').Config} */

module.exports = {
    mode: 'jit',
    purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                brown: {
                    200: '#F0D9B5',
                    600: '#B58863'
                },
                red: {
                    default: '#ef4444'
                },
                blue: {
                    default: '#0369a1'
                }
            },
            borderWidth: {
                6: '6px'
            },
            borderRadius: {
                50: '50%',
            },
            spacing: {
                '1/8': '12.5%',
                '1/6': '16.666667%',
                '1/4': '25%',
                '2/5': '40%',
                '1/2': '50%',
                '3/4': '75%',
                '5/6': '83.333333%',
                '9/10': '90%',
                '3/2': '150%',
            },
            maxWidth: {
                6: '6rem',
            },
            minHeight: {
                '1/4': '25%',
            },
            aspectRatio: {
                square: '1 / 1 !important',
            },
            gridTemplateRows: {
                8: 'repeat(8, minmax(0, 1fr));',
            },
        },
    },
    plugins: [],
}
