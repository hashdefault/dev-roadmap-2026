<script setup lang="ts">
import type { TopicWithProgress } from '~/composables/useTopics'

const { fetchLogs, fetchStats, fetchHeatmap, addEntry } = useLog()
const { fetchTopics } = useTopics()

const { data: logs, refresh: refreshLogs } = await fetchLogs()
const { data: stats, refresh: refreshStats } = await fetchStats()
const { data: heatmap, refresh: refreshHeatmap } = await fetchHeatmap()
const { data: allTopics } = await fetchTopics()

const showForm = ref(false)
const formDate = ref(new Date().toISOString().split('T')[0])
const formDuration = ref(30)
const formTopicId = ref<number | null>(null)
const formSummary = ref('')

const filterTopicId = ref('')
const filterFrom = ref('')
const filterTo = ref('')

const filteredLogs = computed(() => {
  if (!logs.value) return []
  let result = logs.value
  if (filterTopicId.value) {
    result = result.filter(l => l.topicId === Number(filterTopicId.value))
  }
  if (filterFrom.value) {
    result = result.filter(l => l.date >= filterFrom.value)
  }
  if (filterTo.value) {
    result = result.filter(l => l.date <= filterTo.value)
  }
  return result
})

function formatMinutes(m: number): string {
  const h = Math.floor(m / 60)
  const mins = m % 60
  if (h === 0) return `${mins}m`
  return mins > 0 ? `${h}h ${mins}m` : `${h}h`
}

async function submitEntry() {
  await addEntry({
    date: formDate.value,
    durationMinutes: formDuration.value,
    topicId: formTopicId.value,
    summary: formSummary.value || undefined,
  })
  showForm.value = false
  formSummary.value = ''
  formDuration.value = 30
  formTopicId.value = null
  await Promise.all([refreshLogs(), refreshStats(), refreshHeatmap()])
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-lg font-sans font-semibold text-gruvbox-fg">Study Log</h1>
      <button
        class="px-3 py-1.5 text-sm font-mono bg-gruvbox-green/10 text-gruvbox-green border border-gruvbox-green/30 rounded hover:bg-gruvbox-green/20 transition-colors"
        @click="showForm = !showForm"
      >
        {{ showForm ? 'Cancel' : '+ Add Entry' }}
      </button>
    </div>

    <!-- Add entry form -->
    <div v-if="showForm" class="border border-gruvbox-bg2 rounded-lg p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="text-xs font-mono text-gruvbox-fg4 block mb-1">Date</label>
          <input
            v-model="formDate"
            type="date"
            class="w-full bg-gruvbox-bg1 border border-gruvbox-bg3 rounded px-3 py-1.5 text-sm font-mono text-gruvbox-fg focus:outline-none focus:border-gruvbox-yellow"
          >
        </div>
        <div>
          <label class="text-xs font-mono text-gruvbox-fg4 block mb-1">Duration (minutes)</label>
          <input
            v-model.number="formDuration"
            type="number"
            min="1"
            class="w-full bg-gruvbox-bg1 border border-gruvbox-bg3 rounded px-3 py-1.5 text-sm font-mono text-gruvbox-fg focus:outline-none focus:border-gruvbox-yellow"
          >
        </div>
        <div>
          <label class="text-xs font-mono text-gruvbox-fg4 block mb-1">Topic (optional)</label>
          <select
            v-model="formTopicId"
            class="w-full bg-gruvbox-bg1 border border-gruvbox-bg3 rounded px-2 py-1.5 text-sm font-mono text-gruvbox-fg3 focus:outline-none"
          >
            <option :value="null">None</option>
            <option v-for="t in allTopics" :key="t.id" :value="t.id">{{ t.title }}</option>
          </select>
        </div>
      </div>
      <div class="mb-4">
        <label class="text-xs font-mono text-gruvbox-fg4 block mb-1">Summary</label>
        <textarea
          v-model="formSummary"
          class="w-full bg-gruvbox-bg1 border border-gruvbox-bg3 rounded px-3 py-2 text-sm font-mono text-gruvbox-fg placeholder-gruvbox-fg4 focus:outline-none focus:border-gruvbox-yellow resize-y min-h-[80px]"
          placeholder="What did you work on?"
        />
      </div>
      <button
        class="px-4 py-2 text-sm font-mono bg-gruvbox-green/20 text-gruvbox-green border border-gruvbox-green/30 rounded hover:bg-gruvbox-green/30 transition-colors"
        @click="submitEntry"
      >
        Save Entry
      </button>
    </div>

    <!-- Stats -->
    <div v-if="stats" class="grid grid-cols-3 gap-4 mb-6">
      <div class="border border-gruvbox-bg2 rounded-lg p-4 text-center">
        <span class="text-xs font-mono text-gruvbox-fg4 block">This Week</span>
        <span class="text-xl font-mono text-gruvbox-fg">{{ formatMinutes(stats.weekMinutes) }}</span>
      </div>
      <div class="border border-gruvbox-bg2 rounded-lg p-4 text-center">
        <span class="text-xs font-mono text-gruvbox-fg4 block">This Month</span>
        <span class="text-xl font-mono text-gruvbox-fg">{{ formatMinutes(stats.monthMinutes) }}</span>
      </div>
      <div class="border border-gruvbox-bg2 rounded-lg p-4 text-center">
        <span class="text-xs font-mono text-gruvbox-fg4 block">All Time</span>
        <span class="text-xl font-mono text-gruvbox-fg">{{ formatMinutes(stats.allTimeMinutes) }}</span>
      </div>
    </div>

    <!-- Heatmap -->
    <div v-if="heatmap" class="border border-gruvbox-bg2 rounded-lg p-4 mb-6">
      <h2 class="text-sm font-mono text-gruvbox-fg3 mb-3">Activity</h2>
      <Heatmap :data="heatmap" />
    </div>

    <!-- Filters -->
    <div class="flex items-center gap-3 mb-4 text-xs font-mono">
      <select
        v-model="filterTopicId"
        class="bg-gruvbox-bg1 border border-gruvbox-bg3 rounded px-2 py-1 text-gruvbox-fg3 focus:outline-none"
      >
        <option value="">All topics</option>
        <option v-for="t in allTopics" :key="t.id" :value="t.id">{{ t.title }}</option>
      </select>
      <input
        v-model="filterFrom"
        type="date"
        placeholder="From"
        class="bg-gruvbox-bg1 border border-gruvbox-bg3 rounded px-2 py-1 text-gruvbox-fg3 focus:outline-none"
      >
      <input
        v-model="filterTo"
        type="date"
        placeholder="To"
        class="bg-gruvbox-bg1 border border-gruvbox-bg3 rounded px-2 py-1 text-gruvbox-fg3 focus:outline-none"
      >
    </div>

    <!-- Log entries -->
    <div class="space-y-2">
      <div v-if="filteredLogs.length === 0" class="text-sm text-gruvbox-fg4 py-8 text-center">
        No log entries yet. Start tracking your study sessions.
      </div>
      <LogEntryItem
        v-for="entry in filteredLogs"
        :key="entry.id"
        :entry="entry"
      />
    </div>
  </div>
</template>
