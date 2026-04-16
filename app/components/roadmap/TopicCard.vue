<script setup lang="ts">
import type { TopicWithProgress } from '~/composables/useTopics'
import StatusBadge from './../ui/StatusBadge.vue'
import PriorityDots from './../ui/PriorityDots.vue'
import DepthTag from './../ui/DepthTag.vue'

const { localized } = useI18n()

defineProps<{
  topic: TopicWithProgress
  pillarColor: string
}>()

defineEmits<{
  click: []
}>()

const statusStyles: Record<string, string> = {
  not_started: 'border-gruvbox-bg2 hover:border-gruvbox-bg3',
  in_progress: 'border-gruvbox-yellow/30 bg-gruvbox-yellow/[0.02]',
  completed: 'border-gruvbox-green/30 bg-gruvbox-green/[0.02]',
  revisiting: 'border-gruvbox-blue/30 bg-gruvbox-blue/[0.02]',
}
</script>

<template>
  <div
    class="group p-3 border rounded cursor-pointer transition-all hover:bg-gruvbox-bg1/70 topic-card"
    :class="statusStyles[topic.status] ?? 'border-gruvbox-bg2'"
    @click="$emit('click')"
  >
    <div class="flex items-start justify-between gap-2 mb-1.5">
      <div class="flex items-center gap-2 min-w-0">
        <span
          class="w-1 h-4 rounded-full flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
          :style="{ backgroundColor: pillarColor }"
        />
        <h3 class="text-sm font-sans text-gruvbox-fg leading-tight truncate group-hover:text-gruvbox-fg0 transition-colors">
          {{ localized(topic).localTitle }}
        </h3>
      </div>
      <StatusBadge :status="topic.status" />
    </div>
    <div class="flex items-center gap-3 text-xs text-gruvbox-fg4 ml-3">
      <PriorityDots :priority="topic.priority" />
      <DepthTag :depth="topic.depth" />
      <span v-if="topic.estimatedHours" class="font-mono tabular-nums">
        {{ topic.estimatedHours }}h
      </span>
    </div>
  </div>
</template>
