<script setup lang="ts">
import type { TopicWithProgress, PillarWithStats } from '~/composables/useTopics'
import TopicCard from './TopicCard.vue'

const { localized } = useI18n()

const props = defineProps<{
  pillar: PillarWithStats
  topics: TopicWithProgress[]
  collapsed?: boolean
}>()

const emit = defineEmits<{
  topicClick: [slug: string]
  toggleCollapse: []
}>()

const progress = computed(() => {
  if (props.pillar.topicCount === 0) return 0
  return Math.round((props.pillar.completedCount / props.pillar.topicCount) * 100)
})
</script>

<template>
  <div
    class="card overflow-hidden accent-line pl-[3px]"
    :style="{ '--accent-color': pillar.color }"
  >
    <button
      class="w-full px-4 py-3 flex items-center justify-between bg-gruvbox-bg-hard/50 hover:bg-gruvbox-bg1/50 transition-colors text-left"
      @click="$emit('toggleCollapse')"
    >
      <div class="flex items-center gap-3 min-w-0">
        <span
          class="w-3 h-3 rounded-full flex-shrink-0 ring-2 ring-offset-1 ring-offset-gruvbox-bg"
          :style="{ backgroundColor: pillar.color, ringColor: `${pillar.color}40` }"
        />
        <span class="font-sans font-medium text-sm text-gruvbox-fg truncate">
          {{ localized(pillar).localTitle }}
        </span>
        <span class="text-xs font-mono text-gruvbox-fg4 flex-shrink-0">
          {{ pillar.completedCount }}/{{ pillar.topicCount }}
        </span>
      </div>
      <div class="flex items-center gap-3 flex-shrink-0 ml-3">
        <div class="w-28 h-2 bg-gruvbox-bg2 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-700 ease-out"
            :style="{ width: `${progress}%`, backgroundColor: pillar.color }"
          />
        </div>
        <span class="text-xs font-mono text-gruvbox-fg4 w-10 text-right tabular-nums">
          {{ progress }}%
        </span>
        <svg
          class="w-4 h-4 text-gruvbox-fg4 transition-transform duration-200"
          :class="{ '-rotate-90': collapsed }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
    <div v-show="!collapsed" class="p-3 space-y-2 bg-gruvbox-bg/30">
      <TopicCard
        v-for="topic in topics"
        :key="topic.id"
        :topic="topic"
        :pillar-color="pillar.color"
        @click="$emit('topicClick', topic.slug)"
      />
    </div>
  </div>
</template>
