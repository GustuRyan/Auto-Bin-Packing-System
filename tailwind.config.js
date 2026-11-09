/** @type {import('tailwindcss').Config} */
export default {
  // Scan every location that can contain Tailwind utility classes.
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      // Shared typography and brand colors used by the dashboard UI.
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#B88E2F',
        secondary: '#FFF3E3',
        sec_light: '#FFFBF6',
      },
    },
  },
  plugins: [],
}

