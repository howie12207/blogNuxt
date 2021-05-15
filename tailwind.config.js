module.exports = {
  purge: {
    // enabled: true,
    content: [
      '@/components/**/*.{vue,js,ts}',
      '@/layouts/**/*.vue',
      '@/pages/**/*.vue',
      '@/plugins/**/*.{js,ts}',
      '@/nuxt.config.{js,ts}',
    ],
  },
  darkMode: 'class', // or 'media' or 'class' or false
  theme: {},
  variants: {
    extend: {},
  },
  plugins: [],
}
