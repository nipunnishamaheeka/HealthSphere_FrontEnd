// /** @type {import('tailwindcss').Config} */
// module.exports = {
//     content: [
//         './index.html',
//         './src/**/*.{js,ts,jsx,tsx}', // Include src folder for Tailwind scanning
//         './node_modules/flowbite/**/*.js', // Include Flowbite components
//     ],
//     theme: {
//         extend: {},
//     },
//     plugins: [require('flowbite/plugin')],
// };
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                // Light mode colors
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
                // Dark mode specific colors
                dark: {
                    background: '#1a1b1e',
                    paper: '#2c2d31',
                    border: '#2e2e35',
                }
            },
            spacing: {
                'navbar': '64px', // For fixed navbar height
                'sidebar': '256px', // For sidebar width
            },
            screens: {
                'xs': '475px',
            },
            animation: {
                'fade-in': 'fadeIn 0.2s ease-in-out',
                'slide-in': 'slideIn 0.2s ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideIn: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
        },
    },
    plugins: [
        require('flowbite/plugin'),
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ],
};