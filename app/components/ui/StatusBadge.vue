<script setup lang="ts">
const props = defineProps<{
  status: string
}>()

const config: Record<string, { label: string; class: string }> = {
  not_started: { label: 'not started', class: 'text-gruvbox-fg4 bg-gruvbox-bg2' },
  in_progress: { label: 'in progress', class: 'text-gruvbox-yellow bg-gruvbox-yellow/10' },
  completed: { label: 'completed', class: 'text-gruvbox-green bg-gruvbox-green/10' },
  revisiting: { label: 'revisiting', class: 'text-gruvbox-blue bg-gruvbox-blue/10' },
}

const current = computed(() => config[props.status] ?? config.not_started)
</script>

<template>
  <span
    class="inline-flex items-center px-2 py-0.5 text-xs font-mono rounded"
    :class="current.class"
  >
    {{ current.label }}
  </span>
</template>
