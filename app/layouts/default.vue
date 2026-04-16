<script setup lang="ts">
const { t, locale, setLocale, initLocale } = useI18n()

const navItems = computed(() => [
  { to: '/', label: t('nav.dashboard'), key: 'd', icon: '~' },
  { to: '/roadmap', label: t('nav.roadmap'), key: 'r', icon: '#' },
  { to: '/log', label: t('nav.log'), key: 'l', icon: '>' },
  { to: '/settings', label: t('nav.settings'), key: 's', icon: '*' },
])

const route = useRoute()

function isActive(item: { to: string }) {
  if (item.to === '/') return route.path === '/'
  return route.path.startsWith(item.to)
}

onMounted(() => {
  initLocale()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-gruvbox-bg1 bg-gruvbox-bg-hard sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
        <NuxtLink to="/" class="font-mono text-sm text-gruvbox-fg3 hover:text-gruvbox-fg transition-colors flex items-center gap-1">
          <span class="text-gruvbox-green">$</span>
          <span class="text-gruvbox-fg4">~/</span><span class="text-gruvbox-fg2">dev-roadmap-2026</span>
          <span class="terminal-cursor hidden sm:inline-block" />
        </NuxtLink>
        <div class="flex items-center gap-1">
          <nav class="flex items-center">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="relative px-3 py-1.5 text-sm font-mono rounded-t transition-colors group"
              :class="isActive(item)
                ? 'text-gruvbox-fg'
                : 'text-gruvbox-fg4 hover:text-gruvbox-fg3'"
            >
              <span class="hidden sm:inline text-gruvbox-fg4 group-hover:text-gruvbox-green mr-1">{{ item.icon }}</span>
              {{ item.label }}
              <span
                v-if="isActive(item)"
                class="absolute bottom-0 left-2 right-2 h-[2px] bg-gruvbox-green rounded-full"
              />
            </NuxtLink>
          </nav>
          <div class="ml-3 flex items-center border-l border-gruvbox-bg2 pl-3 gap-0.5">
            <button
              class="px-1.5 py-0.5 text-xs font-mono rounded transition-colors"
              :class="locale === 'en' ? 'text-gruvbox-fg bg-gruvbox-bg1' : 'text-gruvbox-fg4 hover:text-gruvbox-fg3'"
              @click="setLocale('en')"
            >
              EN
            </button>
            <button
              class="px-1.5 py-0.5 text-xs font-mono rounded transition-colors"
              :class="locale === 'pt-BR' ? 'text-gruvbox-fg bg-gruvbox-bg1' : 'text-gruvbox-fg4 hover:text-gruvbox-fg3'"
              @click="setLocale('pt-BR')"
            >
              PT
            </button>
          </div>
        </div>
      </div>
    </header>
    <main class="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
      <slot />
    </main>
    <footer class="border-t border-gruvbox-bg1 py-3">
      <div class="max-w-7xl mx-auto px-4 flex items-center justify-between text-[11px] font-mono text-gruvbox-fg4">
        <span>dev-roadmap-2026 v1.0</span>
        <span><kbd class="kbd">j</kbd>/<kbd class="kbd">k</kbd> nav &middot; <kbd class="kbd">/</kbd> search &middot; <kbd class="kbd">x</kbd> toggle</span>
      </div>
    </footer>
  </div>
</template>
