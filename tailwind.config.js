// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./src/**/*.ts",
//     "./**/*.html",
//     "./node_modules/flowbite/**/*.js"
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('flowbite/plugin')
//   ],
// }
//
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./node_modules/flowbite-react/**/*.js",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.ts",
        "./**/*.html"
    ],
    plugins: [
        require('flowbite/plugin')
    ],
    theme: {
        extend: {},
    }
}