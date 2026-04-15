<script setup lang="ts">
import type { TopicWithProgress } from '~/composables/useTopics'

const { localized } = useI18n()

defineProps<{
  topic: TopicWithProgress
  pillarColor: string
}>()

defineEmits<{
  click: []
}>()

const statusBorder: Record<string, string> = {
  not_started: 'border-gruvbox-bg2',
  in_progress: 'border-gruvbox-yellow/40',
  completed: 'border-gruvbox-green/40',
  revisiting: 'border-gruvbox-blue/40',
}
</script>

<template>
  <div
    class="group p-3 border rounded cursor-pointer transition-colors hover:bg-gruvbox-bg1 topic-card"
    :class="statusBorder[topic.status] ?? 'border-gruvbox-bg2'"
    @click="$emit('click')"
  >
    <div class="flex items-start justify-between gap-2 mb-1">
      <h3 class="text-sm font-sans text-gruvbox-fg leading-tight">
        {{ localized(topic).localTitle }}
      </h3>
      <StatusBadge :status="topic.status" />
    </div>
    <div class="flex items-center gap-3 text-xs text-gruvbox-fg4">
      <PriorityDots :priority="topic.priority" />
      <DepthTag :depth="topic.depth" />
      <span v-if="topic.estimatedHours" class="font-mono">
        {{ topic.estimatedHours }}h
      </span>
    </div>
  </div>
</template>
