<script setup lang="ts">
import PillarColumn from './../components/roadmap/PillarColumn.vue'
const router = useRouter()
const { t } = useI18n()
const { fetchPillars, fetchTopics, updateProgress } = useTopics()

const { data: pillars, refresh: refreshPillars } = await fetchPillars()
const { data: topics, refresh: refreshTopics } = await fetchTopics()

const collapsed = ref<Record<number, boolean>>({})

const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const showSearch = ref(false)

const filterStatus = ref('')
const filterDepth = ref('')
const filterPillar = ref('')

const topicsByPillar = computed(() => {
  const map = new Map<number, typeof topics.value>()
  if (!topics.value) return map

  let filtered = topics.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.description?.toLowerCase().includes(q) ?? false)
    )
  }
  if (filterStatus.value) {
    filtered = filtered.filter(t => t.status === filterStatus.value)
  }
  if (filterDepth.value) {
    filtered = filtered.filter(t => t.depth === filterDepth.value)
  }

  for (const t of filtered) {
    if (!map.has(t.pillarId)) map.set(t.pillarId, [])
    map.get(t.pillarId)!.push(t)
  }
  return map
})

const filteredPillars = computed(() => {
  if (!pillars.value) return []
  let result = pillars.value
  if (filterPillar.value) {
    result = result.filter(p => p.slug === filterPillar.value)
  }
  return result
})

const flatTopics = computed(() => {
  const result: { slug: string; id: number }[] = []
  for (const p of filteredPillars.value) {
    const pTopics = topicsByPillar.value.get(p.id) ?? []
    for (const t of pTopics) {
      result.push({ slug: t.slug, id: t.id })
    }
  }
  return result
})

const { activeIndex } = useKeyboardNav({
  items: () => Array.from(document.querySelectorAll('.topic-card')) as HTMLElement[],
  onSelect: (index) => {
    const t = flatTopics.value[index]
    if (t) router.push(`/topic/${t.slug}`)
  },
  onToggle: async (index) => {
    const t = flatTopics.value[index]
    if (!t) return
    const topic = topics.value?.find(tp => tp.id === t.id)
    if (!topic) return
    const newStatus = topic.status === 'completed' ? 'not_started' : 'completed'
    await updateProgress(t.id, { status: newStatus })
    await refreshTopics()
    await refreshPillars()
  },
  onSearch: () => {
    showSearch.value = true
    nextTick(() => searchInput.value?.focus())
  },
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-lg font-sans font-semibold text-gruvbox-fg">{{ t('roadmap.title') }}</h1>
      <div class="flex items-center gap-2">
        <div v-if="showSearch" class="relative">
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            :placeholder="t('roadmap.searchPlaceholder')"
            class="bg-gruvbox-bg1 border border-gruvbox-bg3 rounded px-3 py-1.5 text-sm font-mono text-gruvbox-fg placeholder-gruvbox-fg4 focus:outline-none focus:border-gruvbox-yellow w-64"
            @keydown.escape="showSearch = false; searchQuery = ''"
          >
        </div>
        <button
          v-else
          class="text-xs font-mono text-gruvbox-fg4 hover:text-gruvbox-fg3 flex items-center gap-1"
          @click="showSearch = true; nextTick(() => searchInput?.focus())"
        >
          <kbd class="kbd">/</kbd> {{ t('roadmap.search') }}
        </button>
      </div>
    </div>

    <div class="flex items-center gap-3 mb-6 text-xs font-mono">
      <select
        v-model="filterPillar"
        class="bg-gruvbox-bg1 border border-gruvbox-bg3 rounded px-2 py-1 text-gruvbox-fg3 focus:outline-none"
      >
        <option value="">{{ t('roadmap.allPillars') }}</option>
        <option v-for="p in pillars" :key="p.id" :value="p.slug">{{ p.title }}</option>
      </select>
      <select
        v-model="filterStatus"
        class="bg-gruvbox-bg1 border border-gruvbox-bg3 rounded px-2 py-1 text-gruvbox-fg3 focus:outline-none"
      >
        <option value="">{{ t('roadmap.allStatuses') }}</option>
        <option value="not_started">{{ t('status.not_started') }}</option>
        <option value="in_progress">{{ t('status.in_progress') }}</option>
        <option value="completed">{{ t('status.completed') }}</option>
        <option value="revisiting">{{ t('status.revisiting') }}</option>
      </select>
      <select
        v-model="filterDepth"
        class="bg-gruvbox-bg1 border border-gruvbox-bg3 rounded px-2 py-1 text-gruvbox-fg3 focus:outline-none"
      >
        <option value="">{{ t('roadmap.allDepths') }}</option>
        <option value="broad">{{ t('depth.broad') }}</option>
        <option value="deep">{{ t('depth.deep') }}</option>
        <option value="optional">{{ t('depth.optional') }}</option>
      </select>
      <div class="ml-auto text-gruvbox-fg4">
        <kbd class="kbd">j</kbd>/<kbd class="kbd">k</kbd> {{ t('roadmap.navigate') }}
        <kbd class="kbd ml-2">Enter</kbd> {{ t('roadmap.open') }}
        <kbd class="kbd ml-2">x</kbd> {{ t('roadmap.toggle') }}
      </div>
    </div>

    <div class="space-y-4">
      <PillarColumn
        v-for="pillar in filteredPillars"
        :key="pillar.id"
        :pillar="pillar"
        :topics="topicsByPillar.get(pillar.id) ?? []"
        :collapsed="collapsed[pillar.id]"
        @topic-click="(slug: string) => router.push(`/topic/${slug}`)"
        @toggle-collapse="collapsed[pillar.id] = !collapsed[pillar.id]"
      />
    </div>
  </div>
</template>
