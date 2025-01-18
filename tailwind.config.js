/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}', // Include src folder for Tailwind scanning
        './node_modules/flowbite/**/*.js', // Include Flowbite components
    ],
    theme: {
        extend: {},
    },
    plugins: [require('flowbite/plugin')],
};
