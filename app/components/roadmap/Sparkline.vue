<script setup lang="ts">
const props = defineProps<{
  data: { date: string; minutes: number }[]
  days?: number
}>()

const numDays = computed(() => props.days ?? 7)

const points = computed(() => {
  // Fill in missing days
  const now = new Date()
  const filled: number[] = []
  for (let i = numDays.value - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const entry = props.data.find(e => e.date === dateStr)
    filled.push(entry?.minutes ?? 0)
  }
  return filled
})

const max = computed(() => Math.max(...points.value, 1))
const width = 200
const height = 40
const padding = 2

const pathD = computed(() => {
  const stepX = (width - 2 * padding) / (points.value.length - 1 || 1)
  return points.value
    .map((v, i) => {
      const x = padding + i * stepX
      const y = height - padding - ((v / max.value) * (height - 2 * padding))
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
})
</script>

<template>
  <svg :viewBox="`0 0 ${width} ${height}`" class="w-full h-10" preserveAspectRatio="none">
    <path
      :d="pathD"
      fill="none"
      stroke="#b8bb26"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
