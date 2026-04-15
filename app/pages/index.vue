<script setup lang="ts">
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
</script>

<template>
  <div v-if="data">
    <h1 class="text-lg font-sans font-semibold text-gruvbox-fg mb-6">{{ t('dashboard.title') }}</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Overall progress -->
      <div class="border border-gruvbox-bg2 rounded-lg p-6 flex flex-col items-center">
        <ProgressRing :percentage="data.overallProgress" />
        <p class="text-xs font-mono text-gruvbox-fg4 mt-3">
          {{ t('dashboard.topicsCompleted', { completed: data.completedTopics, total: data.totalTopics }) }}
        </p>
      </div>

      <!-- Stats -->
      <div class="border border-gruvbox-bg2 rounded-lg p-6 space-y-4">
        <div>
          <span class="text-xs font-mono text-gruvbox-fg4 block">{{ t('dashboard.inProgress') }}</span>
          <span class="text-2xl font-mono text-gruvbox-yellow">{{ data.inProgressTopics }}</span>
        </div>
        <div>
          <span class="text-xs font-mono text-gruvbox-fg4 block">{{ t('dashboard.completed') }}</span>
          <span class="text-2xl font-mono text-gruvbox-green">{{ data.completedTopics }}</span>
        </div>
        <div>
          <span class="text-xs font-mono text-gruvbox-fg4 block">{{ t('dashboard.remaining') }}</span>
          <span class="text-2xl font-mono text-gruvbox-fg3">
            {{ data.totalTopics - data.completedTopics - data.inProgressTopics }}
          </span>
        </div>
      </div>

      <!-- Last 7 days sparkline -->
      <div class="border border-gruvbox-bg2 rounded-lg p-6">
        <span class="text-xs font-mono text-gruvbox-fg4 block mb-3">{{ t('dashboard.last7days') }}</span>
        <Sparkline :data="data.dailyMinutes" />
        <div class="flex justify-between mt-2 text-xs font-mono text-gruvbox-fg4">
          <span>{{ t('dashboard.7dAgo') }}</span>
          <span>{{ t('dashboard.today') }}</span>
        </div>
      </div>
    </div>

    <!-- Pillar progress bars -->
    <div class="border border-gruvbox-bg2 rounded-lg p-6 mb-8">
      <h2 class="text-sm font-mono text-gruvbox-fg3 mb-4">{{ t('dashboard.progressByPillar') }}</h2>
      <div class="space-y-3">
        <div v-for="p in data.pillarProgress" :key="p.id" class="flex items-center gap-3">
          <span
            class="w-2.5 h-2.5 rounded-full flex-shrink-0"
            :style="{ backgroundColor: p.color }"
          />
          <span class="text-sm font-sans text-gruvbox-fg2 w-48 truncate">{{ localized(p).localTitle }}</span>
          <div class="flex-1 h-2 bg-gruvbox-bg2 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-500"
              :style="{ width: `${p.percentage}%`, backgroundColor: p.color }"
            />
          </div>
          <span class="text-xs font-mono text-gruvbox-fg4 w-16 text-right">
            {{ p.completed }}/{{ p.total }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Current focus -->
      <div class="border border-gruvbox-bg2 rounded-lg p-6">
        <h2 class="text-sm font-mono text-gruvbox-fg3 mb-4">{{ t('dashboard.currentFocus') }}</h2>
        <div v-if="data.currentFocus.length === 0" class="text-sm text-gruvbox-fg4">
          {{ t('dashboard.currentFocus.empty') }}
        </div>
        <div v-else class="space-y-3">
          <button
            v-for="t_ in data.currentFocus"
            :key="t_.id"
            class="w-full text-left p-3 rounded border border-gruvbox-bg2 hover:bg-gruvbox-bg1 transition-colors"
            @click="router.push(`/topic/${t_.slug}`)"
          >
            <span class="text-sm text-gruvbox-fg block">{{ localized(t_).localTitle }}</span>
            <div class="flex items-center gap-2 mt-1">
              <PriorityDots :priority="t_.priority" />
              <span class="text-xs font-mono text-gruvbox-fg4">
                {{ t('dashboard.confidence', { value: t_.confidence }) }}
              </span>
            </div>
          </button>
        </div>
      </div>

      <!-- Next up -->
      <div class="border border-gruvbox-bg2 rounded-lg p-6">
        <h2 class="text-sm font-mono text-gruvbox-fg3 mb-4">{{ t('dashboard.nextUp') }}</h2>
        <div v-if="data.nextUp.length === 0" class="text-sm text-gruvbox-fg4">
          {{ t('dashboard.nextUp.empty') }}
        </div>
        <div v-else class="space-y-3">
          <button
            v-for="t_ in data.nextUp"
            :key="t_.id"
            class="w-full text-left p-3 rounded border border-gruvbox-bg2 hover:bg-gruvbox-bg1 transition-colors"
            @click="router.push(`/topic/${t_.slug}`)"
          >
            <span class="text-sm text-gruvbox-fg block">{{ localized(t_).localTitle }}</span>
            <div class="flex items-center gap-2 mt-1">
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

    <!-- Recent log entries -->
    <div v-if="data.recentLogs.length > 0" class="border border-gruvbox-bg2 rounded-lg p-6 mt-6">
      <h2 class="text-sm font-mono text-gruvbox-fg3 mb-4">{{ t('dashboard.recentSessions') }}</h2>
      <div class="space-y-2">
        <div
          v-for="log in data.recentLogs.slice(0, 10)"
          :key="log.id"
          class="flex items-baseline gap-3 text-sm"
        >
          <span class="font-mono text-gruvbox-fg4 flex-shrink-0">{{ log.date }}</span>
          <span class="font-mono text-gruvbox-yellow flex-shrink-0">{{ log.durationMinutes }}m</span>
          <span class="text-gruvbox-fg2 truncate">{{ log.summary ?? t('dashboard.noSummary') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
