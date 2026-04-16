<script setup lang="ts">
import ProgressRing from './../components/roadmap/ProgressRing.vue'
import Sparkline from './../components/roadmap/Sparkline.vue'
import PriorityDots from './../components/ui/PriorityDots.vue'
import DepthTag from './../components/ui/DepthTag.vue'

const router = useRouter()
const { t, localized } = useI18n()

interface DashboardData {
  overallProgress: number
  totalTopics: number
  completedTopics: number
  inProgressTopics: number
  currentFocus: Array<{
    id: number
    slug: string
    title: string
    pillarId: number
    priority: number
    depth: string
    estimatedHours: number | null
    confidence: number
    startedAt: string | null
    order: number
    description: string | null
  }>
  nextUp: Array<{
    id: number
    slug: string
    title: string
    pillarId: number
    priority: number
    depth: string
    estimatedHours: number | null
    order: number
    description: string | null
  }>
  recentLogs: Array<{
    id: number
    date: string
    durationMinutes: number
    summary: string | null
  }>
  dailyMinutes: Array<{
    date: string
    minutes: number
  }>
  pillarProgress: Array<{
    id: number
    slug: string
    title: string
    color: string
    total: number
    completed: number
    percentage: number
  }>
}

const { data } = await useFetch<DashboardData>('/api/dashboard')

const totalHoursStudied = computed(() => {
  if (!data.value) return 0
  return Math.round(data.value.recentLogs.reduce((acc, l) => acc + l.durationMinutes, 0) / 60)
})

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return t('dashboard.greeting.morning')
  if (hour < 18) return t('dashboard.greeting.afternoon')
  return t('dashboard.greeting.evening')
})
</script>

<template>
  <div v-if="data">
    <!-- Hero: Terminal greeting + Progress overview -->
    <div class="mb-8 fade-in-up">
      <div class="flex items-center gap-2 mb-1">
        <span class="text-gruvbox-green font-mono text-sm">$</span>
        <span class="text-sm font-mono text-gruvbox-fg3">{{ greeting }}</span>
      </div>
      <h1 class="text-xl font-sans font-semibold text-gruvbox-fg mb-1">{{ t('dashboard.title') }}</h1>
      <p class="text-sm text-gruvbox-fg4 font-mono">
        {{ t('dashboard.topicsCompleted', { completed: data.completedTopics, total: data.totalTopics }) }}
      </p>
    </div>

    <!-- Primary metrics row -->
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 mb-8">
      <!-- Progress ring (hero element) -->
      <div class="card flex flex-col items-center justify-center p-8 fade-in-up stagger-1">
        <ProgressRing :percentage="data.overallProgress" :size="140" :stroke-width="10" />
        <div class="flex items-center gap-6 mt-5 text-center">
          <div>
            <span class="text-2xl font-mono text-gruvbox-yellow block">{{ data.inProgressTopics }}</span>
            <span class="text-[11px] font-mono text-gruvbox-fg4">{{ t('dashboard.inProgress') }}</span>
          </div>
          <div class="w-px h-8 bg-gruvbox-bg2" />
          <div>
            <span class="text-2xl font-mono text-gruvbox-green block">{{ data.completedTopics }}</span>
            <span class="text-[11px] font-mono text-gruvbox-fg4">{{ t('dashboard.completed') }}</span>
          </div>
          <div class="w-px h-8 bg-gruvbox-bg2" />
          <div>
            <span class="text-2xl font-mono text-gruvbox-fg3 block">{{ data.totalTopics - data.completedTopics - data.inProgressTopics }}</span>
            <span class="text-[11px] font-mono text-gruvbox-fg4">{{ t('dashboard.remaining') }}</span>
          </div>
        </div>
      </div>

      <!-- Pillar progress bars -->
      <div class="card p-6 fade-in-up stagger-2">
        <div class="flex items-center justify-between mb-4">
          <h2 class="section-label">{{ t('dashboard.progressByPillar') }}</h2>
        </div>
        <div class="space-y-3">
          <div v-for="p in data.pillarProgress" :key="p.id" class="group">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-2">
                <span
                  class="w-2 h-2 rounded-full flex-shrink-0"
                  :style="{ backgroundColor: p.color }"
                />
                <span class="text-sm font-sans text-gruvbox-fg2 group-hover:text-gruvbox-fg transition-colors">
                  {{ localized(p).localTitle }}
                </span>
              </div>
              <span class="text-xs font-mono text-gruvbox-fg4">
                {{ p.completed }}/{{ p.total }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-1 h-1.5 bg-gruvbox-bg2 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-700 ease-out"
                  :style="{ width: `${p.percentage}%`, backgroundColor: p.color }"
                />
              </div>
              <span class="text-[11px] font-mono text-gruvbox-fg4 w-10 text-right tabular-nums">
                {{ p.percentage }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity sparkline -->
    <div class="card p-5 mb-8 fade-in-up stagger-3">
      <div class="flex items-center justify-between mb-3">
        <h2 class="section-label">{{ t('dashboard.last7days') }}</h2>
        <div class="flex items-center gap-4 text-xs font-mono text-gruvbox-fg4">
          <span>{{ t('dashboard.7dAgo') }}</span>
          <span>{{ t('dashboard.today') }}</span>
        </div>
      </div>
      <Sparkline :data="data.dailyMinutes" />
    </div>

    <!-- Two-column: Focus + Next Up -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Current focus -->
      <div class="card fade-in-up stagger-3">
        <div class="card-header">
          <h2 class="section-label">{{ t('dashboard.currentFocus') }}</h2>
          <span v-if="data.currentFocus.length" class="text-[11px] font-mono text-gruvbox-yellow">{{ data.currentFocus.length }} active</span>
        </div>
        <div class="p-4">
          <div v-if="data.currentFocus.length === 0" class="text-sm text-gruvbox-fg4 py-4 text-center">
            {{ t('dashboard.currentFocus.empty') }}
          </div>
          <div v-else class="space-y-2">
            <button
              v-for="t_ in data.currentFocus"
              :key="t_.id"
              class="w-full text-left p-3 rounded border border-gruvbox-bg2 hover:border-gruvbox-bg3 hover:bg-gruvbox-bg1 transition-all group"
              @click="router.push(`/topic/${t_.slug}`)"
            >
              <span class="text-sm text-gruvbox-fg group-hover:text-gruvbox-fg0 block transition-colors">{{ localized(t_).localTitle }}</span>
              <div class="flex items-center gap-3 mt-1.5">
                <PriorityDots :priority="t_.priority" />
                <span class="text-xs font-mono text-gruvbox-fg4">
                  {{ t('dashboard.confidence', { value: t_.confidence }) }}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Next up -->
      <div class="card fade-in-up stagger-4">
        <div class="card-header">
          <h2 class="section-label">{{ t('dashboard.nextUp') }}</h2>
          <span v-if="data.nextUp.length" class="text-[11px] font-mono text-gruvbox-fg4">{{ t('dashboard.suggested') }}</span>
        </div>
        <div class="p-4">
          <div v-if="data.nextUp.length === 0" class="text-sm text-gruvbox-fg4 py-4 text-center">
            {{ t('dashboard.nextUp.empty') }}
          </div>
          <div v-else class="space-y-2">
            <button
              v-for="t_ in data.nextUp"
              :key="t_.id"
              class="w-full text-left p-3 rounded border border-gruvbox-bg2 hover:border-gruvbox-bg3 hover:bg-gruvbox-bg1 transition-all group"
              @click="router.push(`/topic/${t_.slug}`)"
            >
              <span class="text-sm text-gruvbox-fg group-hover:text-gruvbox-fg0 block transition-colors">{{ localized(t_).localTitle }}</span>
              <div class="flex items-center gap-3 mt-1.5">
                <PriorityDots :priority="t_.priority" />
                <DepthTag :depth="t_.depth" />
                <span v-if="t_.estimatedHours" class="text-xs font-mono text-gruvbox-fg4">
                  {{ t_.estimatedHours }}h
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent log entries -->
    <div v-if="data.recentLogs.length > 0" class="card fade-in-up stagger-4">
      <div class="card-header">
        <h2 class="section-label">{{ t('dashboard.recentSessions') }}</h2>
        <NuxtLink to="/log" class="text-[11px] font-mono text-gruvbox-fg4 hover:text-gruvbox-fg3 transition-colors">
          {{ t('dashboard.viewAll') }} &rarr;
        </NuxtLink>
      </div>
      <div class="p-4 space-y-1.5">
        <div
          v-for="log in data.recentLogs.slice(0, 8)"
          :key="log.id"
          class="flex items-baseline gap-3 text-sm py-1 px-1 rounded hover:bg-gruvbox-bg1/50 transition-colors"
        >
          <span class="font-mono text-gruvbox-fg4 flex-shrink-0 text-xs tabular-nums">{{ log.date }}</span>
          <span class="font-mono text-gruvbox-yellow flex-shrink-0 text-xs tabular-nums w-10 text-right">{{ log.durationMinutes }}m</span>
          <span class="text-gruvbox-fg2 truncate text-sm">{{ log.summary ?? t('dashboard.noSummary') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
