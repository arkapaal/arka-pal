/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        primary: '#000000',
        secondary: '#0a0a0a',
        tertiary: '#1a1a1a',
        
        // Accent colors
        accent: {
          DEFAULT: '#a3e635',
          light: '#22c55e',
        },
        
        // Text colors
        text: {
          primary: '#ffffff',
          secondary: '#a1a1aa',
          muted: '#71717a',
        },
      },
      fontFamily: {
        sans: ['Inter'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      borderColor: theme => ({
        ...theme('colors'),
        'accent-subtle': 'rgba(163, 230, 53, 0.1)',
      }),
    },
  },
  plugins: [],
}