<script setup lang="ts">
defineProps<{
  type: string
}>()

const icons: Record<string, string> = {
  book: 'B',
  course: 'C',
  article: 'A',
  video: 'V',
  project: 'P',
  docs: 'D',
  paper: 'R',
}
</script>

<template>
  <span
    class="inline-flex items-center justify-center w-5 h-5 text-[10px] font-mono font-bold rounded bg-gruvbox-bg2 text-gruvbox-fg3"
    :title="type"
  >
    {{ icons[type] ?? '?' }}
  </span>
</template>
