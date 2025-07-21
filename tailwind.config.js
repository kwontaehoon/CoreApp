/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./**/*.{ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        spacing: {
        },
        colors: {
        }
      }
    },
    plugins: [],
  }