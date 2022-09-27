/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mybg': "url('https://colorlib.com/etc/lf/Login_v4/images/bg-01.jpg')",
      
      }
    },
  },
  plugins: [],
}
