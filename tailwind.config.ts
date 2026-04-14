import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.ts',
    './app/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        gruvbox: {
          bg: '#282828',
          'bg-hard': '#1d2021',
          'bg-soft': '#32302f',
          bg1: '#3c3836',
          bg2: '#504945',
          bg3: '#665c54',
          bg4: '#7c6f64',
          fg: '#ebdbb2',
          fg0: '#fbf1c7',
          fg1: '#ebdbb2',
          fg2: '#d5c4a1',
          fg3: '#bdae93',
          fg4: '#a89984',
          red: '#fb4934',
          'red-dim': '#cc241d',
          green: '#b8bb26',
          'green-dim': '#98971a',
          yellow: '#fabd2f',
          'yellow-dim': '#d79921',
          blue: '#83a598',
          'blue-dim': '#458588',
          purple: '#d3869b',
          'purple-dim': '#b16286',
          aqua: '#8ec07c',
          'aqua-dim': '#689d6a',
          orange: '#fe8019',
          'orange-dim': '#d65d0e',
          gray: '#928374',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
