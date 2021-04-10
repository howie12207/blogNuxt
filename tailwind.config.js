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
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {},
  },
  plugins: [],
}
