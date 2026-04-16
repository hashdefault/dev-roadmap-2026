<script setup lang="ts">
import { marked } from 'marked'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string
const { t, localized } = useI18n()
const { fetchTopic, updateProgress, toggleResource } = useTopics()

const { data: topic, refresh } = await fetchTopic(slug)

if (!topic.value) {
  throw createError({ statusCode: 404, statusMessage: 'Topic not found' })
}

const editingNotes = ref(false)
const notesText = ref(topic.value?.progressNotes ?? '')
let saveTimeout: ReturnType<typeof setTimeout> | null = null

const localTopic = computed(() => topic.value ? localized(topic.value) : null)

const renderedDescription = computed(() => {
  if (!localTopic.value) return ''
  return marked.parse(localTopic.value.localDescription) as string
})

const renderedNotes = computed(() => {
  if (!notesText.value) return ''
  return marked.parse(notesText.value) as string
})

const statusOptions = ['not_started', 'in_progress', 'completed', 'revisiting'] as const

async function setStatus(status: string) {
  if (!topic.value) return
  await updateProgress(topic.value.id, { status })
  await refresh()
}

async function setConfidence(confidence: number) {
  if (!topic.value) return
  await updateProgress(topic.value.id, { confidence })
  await refresh()
}

function onNotesInput() {
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(async () => {
    if (!topic.value) return
    await updateProgress(topic.value.id, { notes: notesText.value })
  }, 1000)
}

async function onToggleResource(resourceId: number) {
  await toggleResource(resourceId)
  await refresh()
}

watch(() => topic.value?.progressNotes, (val) => {
  if (!editingNotes.value) notesText.value = val ?? ''
})

const consumedCount = computed(() => topic.value?.resources.filter(r => r.consumed).length ?? 0)
</script>

<template>
  <div v-if="topic">
    <button
      class="text-xs font-mono text-gruvbox-fg4 hover:text-gruvbox-fg3 mb-6 flex items-center gap-1 transition-colors"
      @click="router.push('/roadmap')"
    >
      &larr; {{ t('topic.backToRoadmap') }}
    </button>

    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center gap-2 mb-2">
        <span
          v-if="topic.pillar"
          class="w-2.5 h-2.5 rounded-full flex-shrink-0"
          :style="{ backgroundColor: topic.pillar.color }"
        />
        <span v-if="topic.pillar" class="text-xs font-mono text-gruvbox-fg4">
          {{ localized(topic.pillar).localTitle }}
        </span>
        <span class="text-gruvbox-bg3">/</span>
        <DepthTag :depth="topic.depth" />
      </div>
      <div class="flex items-start justify-between gap-4">
        <h1 class="text-xl font-sans font-semibold text-gruvbox-fg">
          {{ localTopic?.localTitle }}
        </h1>
        <StatusBadge :status="topic.status" />
      </div>
      <div class="flex items-center gap-4 mt-2 text-xs text-gruvbox-fg4">
        <PriorityDots :priority="topic.priority" />
        <span v-if="topic.estimatedHours" class="font-mono">{{ t('topic.estimated', { hours: topic.estimatedHours }) }}</span>
      </div>
    </div>

    <!-- Two-column layout on desktop -->
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
      <!-- Main content -->
      <div class="space-y-6 min-w-0">
        <!-- Description -->
        <div v-if="topic.description" class="markdown-body" v-html="renderedDescription" />

        <!-- Resources -->
        <div class="card">
          <div class="card-header">
            <h2 class="section-label">{{ t('topic.resources') }}</h2>
            <span v-if="topic.resources.length" class="text-[11px] font-mono text-gruvbox-fg4">
              {{ consumedCount }}/{{ topic.resources.length }}
            </span>
          </div>
          <div class="p-4">
            <div v-if="topic.resources.length === 0" class="text-sm text-gruvbox-fg4 py-2">
              {{ t('topic.resources.empty') }}
            </div>
            <div v-else class="space-y-1">
              <div
                v-for="res in topic.resources"
                :key="res.id"
                class="flex items-center gap-3 p-2 rounded hover:bg-gruvbox-bg1/50 group transition-colors"
              >
                <button
                  class="w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors"
                  :class="res.consumed
                    ? 'border-gruvbox-green bg-gruvbox-green/20 text-gruvbox-green'
                    : 'border-gruvbox-bg3 hover:border-gruvbox-fg4'"
                  @click="onToggleResource(res.id)"
                >
                  <span v-if="res.consumed" class="text-xs">&#10003;</span>
                </button>
                <ResourceIcon :type="res.type" />
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <a
                      v-if="res.url"
                      :href="res.url"
                      target="_blank"
                      rel="noopener"
                      class="text-sm text-gruvbox-blue hover:text-gruvbox-aqua truncate transition-colors"
                      :class="{ 'line-through opacity-50': res.consumed }"
                    >
                      {{ res.title }}
                    </a>
                    <span
                      v-else
                      class="text-sm text-gruvbox-fg2 truncate"
                      :class="{ 'line-through opacity-50': res.consumed }"
                    >
                      {{ res.title }}
                    </span>
                  </div>
                  <span v-if="res.author" class="text-xs text-gruvbox-fg4">{{ res.author }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div class="card">
          <div class="card-header">
            <h2 class="section-label">{{ t('topic.notes') }}</h2>
            <button
              class="text-xs font-mono text-gruvbox-fg4 hover:text-gruvbox-fg3 transition-colors"
              @click="editingNotes = !editingNotes"
            >
              {{ editingNotes ? t('topic.notes.preview') : t('topic.notes.edit') }}
            </button>
          </div>
          <div class="p-4">
            <textarea
              v-if="editingNotes"
              v-model="notesText"
              class="w-full min-h-[200px] bg-gruvbox-bg-hard border border-gruvbox-bg3 rounded p-3 text-sm font-mono text-gruvbox-fg placeholder-gruvbox-fg4 focus:outline-none focus:border-gruvbox-yellow resize-y transition-colors"
              :placeholder="t('topic.notes.placeholder')"
              @input="onNotesInput"
              @focus="editingNotes = true"
            />
            <div v-else-if="notesText" class="markdown-body" v-html="renderedNotes" />
            <div v-else class="text-sm text-gruvbox-fg4 py-2">
              {{ t('topic.notes.empty') }}
            </div>
          </div>
        </div>

        <!-- Related log entries -->
        <div v-if="topic.logEntries.length > 0" class="card">
          <div class="card-header">
            <h2 class="section-label">{{ t('topic.studyLog') }}</h2>
            <span class="text-[11px] font-mono text-gruvbox-fg4">{{ topic.logEntries.length }} entries</span>
          </div>
          <div class="p-4 space-y-1.5">
            <div
              v-for="log in topic.logEntries"
              :key="log.id"
              class="flex items-baseline gap-3 text-sm py-1"
            >
              <span class="font-mono text-gruvbox-fg4 flex-shrink-0 text-xs tabular-nums">{{ log.date }}</span>
              <span class="font-mono text-gruvbox-yellow flex-shrink-0 text-xs tabular-nums">{{ log.durationMinutes }}m</span>
              <span class="text-gruvbox-fg2 truncate">{{ log.summary }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-4">
        <!-- Status controls -->
        <div class="card p-4 lg:sticky lg:top-16">
          <h2 class="section-label mb-3">{{ t('topic.status') }}</h2>
          <div class="flex flex-wrap gap-1.5 mb-5">
            <button
              v-for="s in statusOptions"
              :key="s"
              class="px-2.5 py-1 text-xs font-mono rounded border transition-all"
              :class="topic.status === s
                ? 'border-gruvbox-yellow text-gruvbox-yellow bg-gruvbox-yellow/10'
                : 'border-gruvbox-bg3 text-gruvbox-fg4 hover:text-gruvbox-fg3 hover:border-gruvbox-bg4'"
              @click="setStatus(s)"
            >
              {{ t(`status.${s}`) }}
            </button>
          </div>

          <h2 class="section-label mb-2">{{ t('topic.confidence') }}</h2>
          <div class="flex items-center gap-1.5 mb-4">
            <button
              v-for="i in 5"
              :key="i"
              class="w-8 h-8 rounded border text-xs font-mono transition-all"
              :class="(topic.confidence ?? 1) >= i
                ? 'border-gruvbox-green text-gruvbox-green bg-gruvbox-green/10'
                : 'border-gruvbox-bg3 text-gruvbox-fg4 hover:border-gruvbox-bg4'"
              @click="setConfidence(i)"
            >
              {{ i }}
            </button>
            <span class="text-xs text-gruvbox-fg4 ml-1 font-mono">/ 5</span>
          </div>

          <!-- Metadata -->
          <div class="border-t border-gruvbox-bg2 pt-3 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-mono text-gruvbox-fg4">{{ t('topic.depth_label') }}</span>
              <DepthTag :depth="topic.depth" />
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="font-mono text-gruvbox-fg4">{{ t('topic.priority_label') }}</span>
              <PriorityDots :priority="topic.priority" />
            </div>
            <div v-if="topic.estimatedHours" class="flex items-center justify-between text-xs">
              <span class="font-mono text-gruvbox-fg4">{{ t('topic.estimate_label') }}</span>
              <span class="font-mono text-gruvbox-fg3">{{ topic.estimatedHours }}h</span>
            </div>
            <div v-if="topic.startedAt" class="flex items-center justify-between text-xs">
              <span class="font-mono text-gruvbox-fg4">{{ t('topic.started_label') }}</span>
              <span class="font-mono text-gruvbox-fg3">{{ topic.startedAt.split('T')[0] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
