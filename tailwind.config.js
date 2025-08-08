module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'gedo-green': '#1C4D32',
        'gedo-cream': '#F7F3E8',
        'gedo-brown': '#6B4D33',
        'gedo-gold': '#D4B96A',
        'gedo-red': '#C25B56',
      },
      fontFamily: {
        playfair: ['\"Playfair Display\"', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'arabic-pattern': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMzAgMzBNMTUgMzBBMTUgMTUgMCAwIDEgMzAgMTVNNDUgMzBBMTUgMTUgMCAwIDEgMzAgNDVNMzAgMTVBMTUgMTUgMCAwIDEgNDUgMzBNMzAgNDVBMTUgMTUgMCAwIDEgMTUgMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFDNEQzMiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+')",
      },
    },
  },
  plugins: [],
};
