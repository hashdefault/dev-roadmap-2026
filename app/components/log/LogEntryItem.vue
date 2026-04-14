<script setup lang="ts">
import type { LogEntryWithTopic } from '~/composables/useLog'

defineProps<{
  entry: LogEntryWithTopic
}>()
</script>

<template>
  <div class="flex items-start gap-4 p-3 rounded hover:bg-gruvbox-bg1 border border-gruvbox-bg2">
    <div class="flex-shrink-0 text-right">
      <span class="text-sm font-mono text-gruvbox-fg4 block">{{ entry.date }}</span>
      <span class="text-sm font-mono text-gruvbox-yellow">{{ entry.durationMinutes }}m</span>
    </div>
    <div class="flex-1 min-w-0">
      <NuxtLink
        v-if="entry.topicSlug"
        :to="`/topic/${entry.topicSlug}`"
        class="text-xs font-mono text-gruvbox-blue hover:text-gruvbox-aqua block mb-1"
      >
        {{ entry.topicTitle }}
      </NuxtLink>
      <p v-if="entry.summary" class="text-sm text-gruvbox-fg2">{{ entry.summary }}</p>
    </div>
  </div>
</template>
