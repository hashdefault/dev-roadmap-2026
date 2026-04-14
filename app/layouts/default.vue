<script setup lang="ts">
const navItems = [
  { to: '/', label: 'Dashboard', key: 'd' },
  { to: '/roadmap', label: 'Roadmap', key: 'r' },
  { to: '/log', label: 'Log', key: 'l' },
  { to: '/settings', label: 'Settings', key: 's' },
]

const route = useRoute()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-gruvbox-bg1 bg-gruvbox-bg-hard">
      <div class="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
        <NuxtLink to="/" class="font-mono text-sm text-gruvbox-fg3 hover:text-gruvbox-fg transition-colors">
          <span class="text-gruvbox-green">~/</span>dev-roadmap-2026
        </NuxtLink>
        <nav class="flex items-center gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="px-3 py-1.5 text-sm font-mono rounded transition-colors"
            :class="route.path === item.to || (item.to !== '/' && route.path.startsWith(item.to))
              ? 'text-gruvbox-fg bg-gruvbox-bg1'
              : 'text-gruvbox-fg4 hover:text-gruvbox-fg3'"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
    </header>
    <main class="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
      <slot />
    </main>
  </div>
</template>
