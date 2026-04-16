<script setup lang="ts">
defineProps<{
  type: string
}>()

const config: Record<string, { label: string; color: string }> = {
  book: { label: 'B', color: 'text-gruvbox-orange' },
  course: { label: 'C', color: 'text-gruvbox-blue' },
  article: { label: 'A', color: 'text-gruvbox-aqua' },
  video: { label: 'V', color: 'text-gruvbox-red' },
  project: { label: 'P', color: 'text-gruvbox-green' },
  docs: { label: 'D', color: 'text-gruvbox-yellow' },
  paper: { label: 'R', color: 'text-gruvbox-purple' },
}
</script>

<template>
  <span
    class="inline-flex items-center justify-center w-5 h-5 text-[10px] font-mono font-bold rounded bg-gruvbox-bg2/70"
    :class="config[type]?.color ?? 'text-gruvbox-fg3'"
    :title="type"
  >
    {{ config[type]?.label ?? '?' }}
  </span>
</template>
