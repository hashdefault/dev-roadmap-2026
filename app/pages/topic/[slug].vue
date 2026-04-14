<script setup lang="ts">
import { marked } from 'marked'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string
const { fetchTopic, updateProgress, toggleResource } = useTopics()

const { data: topic, refresh } = await fetchTopic(slug)

if (!topic.value) {
  throw createError({ statusCode: 404, statusMessage: 'Topic not found' })
}

const editingNotes = ref(false)
const notesText = ref(topic.value?.progressNotes ?? '')
let saveTimeout: ReturnType<typeof setTimeout> | null = null

const renderedDescription = computed(() => {
  if (!topic.value?.description) return ''
  return marked.parse(topic.value.description) as string
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
</script>

<template>
  <div v-if="topic" class="max-w-3xl">
    <button
      class="text-xs font-mono text-gruvbox-fg4 hover:text-gruvbox-fg3 mb-4 flex items-center gap-1"
      @click="router.push('/roadmap')"
    >
      &larr; back to roadmap
    </button>

    <div class="flex items-start justify-between gap-4 mb-2">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span
            v-if="topic.pillar"
            class="w-2.5 h-2.5 rounded-full flex-shrink-0"
            :style="{ backgroundColor: topic.pillar.color }"
          />
          <span v-if="topic.pillar" class="text-xs font-mono text-gruvbox-fg4">
            {{ topic.pillar.title }}
          </span>
        </div>
        <h1 class="text-xl font-sans font-semibold text-gruvbox-fg">
          {{ topic.title }}
        </h1>
      </div>
      <StatusBadge :status="topic.status" />
    </div>

    <div class="flex items-center gap-4 mb-6 text-xs text-gruvbox-fg4">
      <PriorityDots :priority="topic.priority" />
      <DepthTag :depth="topic.depth" />
      <span v-if="topic.estimatedHours" class="font-mono">{{ topic.estimatedHours }}h estimated</span>
    </div>

    <div v-if="topic.description" class="markdown-body mb-8" v-html="renderedDescription" />

    <!-- Status controls -->
    <div class="border border-gruvbox-bg2 rounded-lg p-4 mb-6">
      <h2 class="text-sm font-mono text-gruvbox-fg3 mb-3">Status</h2>
      <div class="flex flex-wrap gap-2 mb-4">
        <button
          v-for="s in statusOptions"
          :key="s"
          class="px-3 py-1.5 text-xs font-mono rounded border transition-colors"
          :class="topic.status === s
            ? 'border-gruvbox-yellow text-gruvbox-yellow bg-gruvbox-yellow/10'
            : 'border-gruvbox-bg3 text-gruvbox-fg4 hover:text-gruvbox-fg3 hover:border-gruvbox-bg4'"
          @click="setStatus(s)"
        >
          {{ s.replace('_', ' ') }}
        </button>
      </div>

      <h2 class="text-sm font-mono text-gruvbox-fg3 mb-2">Confidence</h2>
      <div class="flex items-center gap-2">
        <button
          v-for="i in 5"
          :key="i"
          class="w-8 h-8 rounded border text-xs font-mono transition-colors"
          :class="(topic.confidence ?? 1) >= i
            ? 'border-gruvbox-green text-gruvbox-green bg-gruvbox-green/10'
            : 'border-gruvbox-bg3 text-gruvbox-fg4 hover:border-gruvbox-bg4'"
          @click="setConfidence(i)"
        >
          {{ i }}
        </button>
        <span class="text-xs text-gruvbox-fg4 ml-2 font-mono">/ 5</span>
      </div>
    </div>

    <!-- Resources -->
    <div class="border border-gruvbox-bg2 rounded-lg p-4 mb-6">
      <h2 class="text-sm font-mono text-gruvbox-fg3 mb-3">Resources</h2>
      <div v-if="topic.resources.length === 0" class="text-sm text-gruvbox-fg4">
        No resources yet.
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="res in topic.resources"
          :key="res.id"
          class="flex items-center gap-3 p-2 rounded hover:bg-gruvbox-bg1 group"
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
                class="text-sm text-gruvbox-blue hover:text-gruvbox-aqua truncate"
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

    <!-- Notes -->
    <div class="border border-gruvbox-bg2 rounded-lg p-4 mb-6">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-sm font-mono text-gruvbox-fg3">My Notes</h2>
        <button
          class="text-xs font-mono text-gruvbox-fg4 hover:text-gruvbox-fg3"
          @click="editingNotes = !editingNotes"
        >
          {{ editingNotes ? 'preview' : 'edit' }}
        </button>
      </div>
      <textarea
        v-if="editingNotes"
        v-model="notesText"
        class="w-full min-h-[200px] bg-gruvbox-bg-hard border border-gruvbox-bg3 rounded p-3 text-sm font-mono text-gruvbox-fg placeholder-gruvbox-fg4 focus:outline-none focus:border-gruvbox-yellow resize-y"
        placeholder="Write your notes here (markdown supported)..."
        @input="onNotesInput"
      />
      <div v-else-if="notesText" class="markdown-body" v-html="renderedNotes" />
      <div v-else class="text-sm text-gruvbox-fg4">
        No notes yet. Click edit to start writing.
      </div>
    </div>

    <!-- Related log entries -->
    <div v-if="topic.logEntries.length > 0" class="border border-gruvbox-bg2 rounded-lg p-4">
      <h2 class="text-sm font-mono text-gruvbox-fg3 mb-3">Study Log</h2>
      <div class="space-y-2">
        <div
          v-for="log in topic.logEntries"
          :key="log.id"
          class="flex items-baseline gap-3 text-sm"
        >
          <span class="font-mono text-gruvbox-fg4 flex-shrink-0">{{ log.date }}</span>
          <span class="font-mono text-gruvbox-yellow flex-shrink-0">{{ log.durationMinutes }}m</span>
          <span class="text-gruvbox-fg2 truncate">{{ log.summary }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
