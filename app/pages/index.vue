<script setup lang="ts">
const router = useRouter()

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
    <h1 class="text-lg font-sans font-semibold text-gruvbox-fg mb-6">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Overall progress -->
      <div class="border border-gruvbox-bg2 rounded-lg p-6 flex flex-col items-center">
        <ProgressRing :percentage="data.overallProgress" />
        <p class="text-xs font-mono text-gruvbox-fg4 mt-3">
          {{ data.completedTopics }}/{{ data.totalTopics }} topics completed
        </p>
      </div>

      <!-- Stats -->
      <div class="border border-gruvbox-bg2 rounded-lg p-6 space-y-4">
        <div>
          <span class="text-xs font-mono text-gruvbox-fg4 block">In Progress</span>
          <span class="text-2xl font-mono text-gruvbox-yellow">{{ data.inProgressTopics }}</span>
        </div>
        <div>
          <span class="text-xs font-mono text-gruvbox-fg4 block">Completed</span>
          <span class="text-2xl font-mono text-gruvbox-green">{{ data.completedTopics }}</span>
        </div>
        <div>
          <span class="text-xs font-mono text-gruvbox-fg4 block">Remaining</span>
          <span class="text-2xl font-mono text-gruvbox-fg3">
            {{ data.totalTopics - data.completedTopics - data.inProgressTopics }}
          </span>
        </div>
      </div>

      <!-- Last 7 days sparkline -->
      <div class="border border-gruvbox-bg2 rounded-lg p-6">
        <span class="text-xs font-mono text-gruvbox-fg4 block mb-3">Last 7 days</span>
        <Sparkline :data="data.dailyMinutes" />
        <div class="flex justify-between mt-2 text-xs font-mono text-gruvbox-fg4">
          <span>7d ago</span>
          <span>today</span>
        </div>
      </div>
    </div>

    <!-- Pillar progress bars -->
    <div class="border border-gruvbox-bg2 rounded-lg p-6 mb-8">
      <h2 class="text-sm font-mono text-gruvbox-fg3 mb-4">Progress by Pillar</h2>
      <div class="space-y-3">
        <div v-for="p in data.pillarProgress" :key="p.id" class="flex items-center gap-3">
          <span
            class="w-2.5 h-2.5 rounded-full flex-shrink-0"
            :style="{ backgroundColor: p.color }"
          />
          <span class="text-sm font-sans text-gruvbox-fg2 w-48 truncate">{{ p.title }}</span>
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
        <h2 class="text-sm font-mono text-gruvbox-fg3 mb-4">Current Focus</h2>
        <div v-if="data.currentFocus.length === 0" class="text-sm text-gruvbox-fg4">
          No topics in progress. Pick something from the roadmap.
        </div>
        <div v-else class="space-y-3">
          <button
            v-for="t in data.currentFocus"
            :key="t.id"
            class="w-full text-left p-3 rounded border border-gruvbox-bg2 hover:bg-gruvbox-bg1 transition-colors"
            @click="router.push(`/topic/${t.slug}`)"
          >
            <span class="text-sm text-gruvbox-fg block">{{ t.title }}</span>
            <div class="flex items-center gap-2 mt-1">
              <PriorityDots :priority="t.priority" />
              <span class="text-xs font-mono text-gruvbox-fg4">
                confidence {{ t.confidence }}/5
              </span>
            </div>
          </button>
        </div>
      </div>

      <!-- Next up -->
      <div class="border border-gruvbox-bg2 rounded-lg p-6">
        <h2 class="text-sm font-mono text-gruvbox-fg3 mb-4">Next Up</h2>
        <div v-if="data.nextUp.length === 0" class="text-sm text-gruvbox-fg4">
          All topics are either in progress or completed.
        </div>
        <div v-else class="space-y-3">
          <button
            v-for="t in data.nextUp"
            :key="t.id"
            class="w-full text-left p-3 rounded border border-gruvbox-bg2 hover:bg-gruvbox-bg1 transition-colors"
            @click="router.push(`/topic/${t.slug}`)"
          >
            <span class="text-sm text-gruvbox-fg block">{{ t.title }}</span>
            <div class="flex items-center gap-2 mt-1">
              <PriorityDots :priority="t.priority" />
              <DepthTag :depth="t.depth" />
              <span v-if="t.estimatedHours" class="text-xs font-mono text-gruvbox-fg4">
                {{ t.estimatedHours }}h
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Recent log entries -->
    <div v-if="data.recentLogs.length > 0" class="border border-gruvbox-bg2 rounded-lg p-6 mt-6">
      <h2 class="text-sm font-mono text-gruvbox-fg3 mb-4">Recent Study Sessions</h2>
      <div class="space-y-2">
        <div
          v-for="log in data.recentLogs.slice(0, 10)"
          :key="log.id"
          class="flex items-baseline gap-3 text-sm"
        >
          <span class="font-mono text-gruvbox-fg4 flex-shrink-0">{{ log.date }}</span>
          <span class="font-mono text-gruvbox-yellow flex-shrink-0">{{ log.durationMinutes }}m</span>
          <span class="text-gruvbox-fg2 truncate">{{ log.summary ?? '(no summary)' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
