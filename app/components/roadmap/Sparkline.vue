<script setup lang="ts">
const props = defineProps<{
  data: { date: string; minutes: number }[]
  days?: number
}>()

const numDays = computed(() => props.days ?? 7)

const points = computed(() => {
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
const height = 48
const padding = 4

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

const areaD = computed(() => {
  if (!pathD.value) return ''
  const stepX = (width - 2 * padding) / (points.value.length - 1 || 1)
  const lastX = padding + (points.value.length - 1) * stepX
  return `${pathD.value} L ${lastX} ${height - padding} L ${padding} ${height - padding} Z`
})

const lastPoint = computed(() => {
  const stepX = (width - 2 * padding) / (points.value.length - 1 || 1)
  const lastVal = points.value[points.value.length - 1] ?? 0
  return {
    x: padding + (points.value.length - 1) * stepX,
    y: height - padding - ((lastVal / max.value) * (height - 2 * padding)),
  }
})
</script>

<template>
  <svg :viewBox="`0 0 ${width} ${height}`" class="w-full h-12" preserveAspectRatio="none">
    <defs>
      <linearGradient id="sparkline-fill" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#b8bb26" stop-opacity="0.2" />
        <stop offset="100%" stop-color="#b8bb26" stop-opacity="0" />
      </linearGradient>
    </defs>
    <!-- Area fill -->
    <path
      :d="areaD"
      fill="url(#sparkline-fill)"
    />
    <!-- Line -->
    <path
      :d="pathD"
      fill="none"
      stroke="#b8bb26"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Current value dot -->
    <circle
      :cx="lastPoint.x"
      :cy="lastPoint.y"
      r="3"
      fill="#b8bb26"
      class="opacity-80"
    />
  </svg>
</template>
