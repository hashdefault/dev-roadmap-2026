<script setup lang="ts">
import type { HeatmapDay } from '~/composables/useLog'

const props = defineProps<{
  data: HeatmapDay[]
}>()

const weeks = computed(() => {
  const now = new Date()
  const yearAgo = new Date(now)
  yearAgo.setFullYear(yearAgo.getFullYear() - 1)
  // Start from the nearest Sunday
  yearAgo.setDate(yearAgo.getDate() - yearAgo.getDay())

  const dataMap = new Map<string, number>()
  for (const d of props.data) {
    dataMap.set(d.date, d.minutes)
  }

  const result: { date: string; minutes: number; level: number }[][] = []
  let currentWeek: typeof result[0] = []
  const cursor = new Date(yearAgo)

  while (cursor <= now) {
    const dateStr = cursor.toISOString().split('T')[0]
    const minutes = dataMap.get(dateStr) ?? 0
    currentWeek.push({ date: dateStr, minutes, level: getLevel(minutes) })

    if (cursor.getDay() === 6) {
      result.push(currentWeek)
      currentWeek = []
    }
    cursor.setDate(cursor.getDate() + 1)
  }
  if (currentWeek.length > 0) result.push(currentWeek)

  return result
})

function getLevel(minutes: number): number {
  if (minutes === 0) return 0
  if (minutes < 30) return 1
  if (minutes < 60) return 2
  if (minutes < 120) return 3
  return 4
}

const levelColors = [
  'bg-gruvbox-bg2',
  'bg-gruvbox-green/20',
  'bg-gruvbox-green/40',
  'bg-gruvbox-green/70',
  'bg-gruvbox-green',
]

const monthLabels = computed(() => {
  const labels: { text: string; col: number }[] = []
  let lastMonth = -1
  for (let i = 0; i < weeks.value.length; i++) {
    const firstDay = weeks.value[i][0]
    if (!firstDay) continue
    const month = new Date(firstDay.date).getMonth()
    if (month !== lastMonth) {
      labels.push({
        text: new Date(firstDay.date).toLocaleString('en', { month: 'short' }),
        col: i,
      })
      lastMonth = month
    }
  }
  return labels
})
</script>

<template>
  <div class="overflow-x-auto">
    <div class="inline-block">
      <div class="flex gap-0.5 mb-1 ml-8 text-[10px] font-mono text-gruvbox-fg4">
        <span
          v-for="label in monthLabels"
          :key="label.col"
          class="absolute"
          :style="{ left: `${label.col * 14 + 32}px` }"
        >
          {{ label.text }}
        </span>
      </div>
      <div class="flex gap-[3px] relative mt-5">
        <div
          v-for="(week, wi) in weeks"
          :key="wi"
          class="flex flex-col gap-[3px]"
        >
          <div
            v-for="(day, di) in week"
            :key="di"
            class="w-[11px] h-[11px] rounded-sm transition-colors"
            :class="levelColors[day.level]"
            :title="`${day.date}: ${day.minutes}m`"
          />
        </div>
      </div>
      <div class="flex items-center gap-1 mt-3 text-[10px] font-mono text-gruvbox-fg4">
        <span>Less</span>
        <div
          v-for="(color, i) in levelColors"
          :key="i"
          class="w-[11px] h-[11px] rounded-sm"
          :class="color"
        />
        <span>More</span>
      </div>
    </div>
  </div>
</template>
