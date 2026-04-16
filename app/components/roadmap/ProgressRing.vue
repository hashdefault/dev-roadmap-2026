<script setup lang="ts">
const props = defineProps<{
  percentage: number
  size?: number
  strokeWidth?: number
  color?: string
}>()

const size = computed(() => props.size ?? 120)
const strokeWidth = computed(() => props.strokeWidth ?? 8)
const radius = computed(() => (size.value - strokeWidth.value) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const offset = computed(() => circumference.value - (props.percentage / 100) * circumference.value)
const ringColor = computed(() => props.color ?? '#b8bb26')
</script>

<template>
  <div class="relative inline-flex items-center justify-center">
    <svg :width="size" :height="size" class="-rotate-90">
      <!-- Track -->
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
        class="stroke-gruvbox-bg2"
      />
      <!-- Glow layer (subtle) -->
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth + 4"
        :stroke="ringColor"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        class="transition-all duration-1000 ease-out"
        opacity="0.15"
      />
      <!-- Progress arc -->
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
        :stroke="ringColor"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        class="transition-all duration-1000 ease-out"
      />
    </svg>
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <span class="text-2xl font-mono text-gruvbox-fg leading-none">{{ percentage }}<span class="text-base text-gruvbox-fg3">%</span></span>
    </div>
  </div>
</template>
