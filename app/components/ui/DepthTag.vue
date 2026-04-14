<script setup lang="ts">
const props = defineProps<{
  depth: string
}>()

const config: Record<string, string> = {
  broad: 'text-gruvbox-blue',
  deep: 'text-gruvbox-purple',
  optional: 'text-gruvbox-fg4',
}
</script>

<template>
  <span class="text-xs font-mono" :class="config[props.depth] ?? 'text-gruvbox-fg4'">
    {{ depth }}
  </span>
</template>
