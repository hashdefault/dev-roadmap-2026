<script setup lang="ts">
defineProps<{
  priority: number
  max?: number
}>()
</script>

<template>
  <div class="flex items-center gap-0.5" :title="`Priority ${priority}/${max ?? 5}`">
    <span
      v-for="i in (max ?? 5)"
      :key="i"
      class="w-1.5 h-1.5 rounded-full"
      :class="i <= priority ? 'bg-gruvbox-yellow' : 'bg-gruvbox-bg3'"
    />
  </div>
</template>
