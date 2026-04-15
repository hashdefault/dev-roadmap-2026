<script setup lang="ts">
const { t } = useI18n()

const resetStep = ref(0)
const importFile = ref<File | null>(null)
const statusMessage = ref('')
const statusType = ref<'success' | 'error'>('success')

function showStatus(message: string, type: 'success' | 'error' = 'success') {
  statusMessage.value = message
  statusType.value = type
  setTimeout(() => { statusMessage.value = '' }, 3000)
}

async function exportData() {
  try {
    const data = await $fetch('/api/export')
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `roadmap-export-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    showStatus(t('settings.exportSuccess'))
  } catch {
    showStatus(t('settings.exportError'), 'error')
  }
}

function onFileSelect(e: Event) {
  const input = e.target as HTMLInputElement
  importFile.value = input.files?.[0] ?? null
}

async function importData() {
  if (!importFile.value) return

  try {
    const text = await importFile.value.text()
    const data = JSON.parse(text)
    await $fetch('/api/import', { method: 'POST', body: data })
    showStatus(t('settings.importSuccess'))
    importFile.value = null
  } catch {
    showStatus(t('settings.importError'), 'error')
  }
}

async function resetProgress() {
  if (resetStep.value === 0) {
    resetStep.value = 1
    return
  }
  if (resetStep.value === 1) {
    resetStep.value = 2
    return
  }

  try {
    await $fetch('/api/progress/reset', {
      method: 'POST',
      body: { confirm: 'RESET' },
    })
    resetStep.value = 0
    showStatus(t('settings.resetSuccess'))
  } catch {
    showStatus(t('settings.resetError'), 'error')
    resetStep.value = 0
  }
}

function cancelReset() {
  resetStep.value = 0
}
</script>

<template>
  <div class="max-w-xl">
    <h1 class="text-lg font-sans font-semibold text-gruvbox-fg mb-6">{{ t('settings.title') }}</h1>

    <!-- Status message -->
    <div
      v-if="statusMessage"
      class="mb-6 px-4 py-2 rounded text-sm font-mono"
      :class="statusType === 'success' ? 'bg-gruvbox-green/10 text-gruvbox-green border border-gruvbox-green/30' : 'bg-gruvbox-red/10 text-gruvbox-red border border-gruvbox-red/30'"
    >
      {{ statusMessage }}
    </div>

    <!-- Export -->
    <div class="border border-gruvbox-bg2 rounded-lg p-6 mb-6">
      <h2 class="text-sm font-mono text-gruvbox-fg3 mb-2">{{ t('settings.export') }}</h2>
      <p class="text-sm text-gruvbox-fg4 mb-4">{{ t('settings.exportDesc') }}</p>
      <button
        class="px-4 py-2 text-sm font-mono bg-gruvbox-blue/10 text-gruvbox-blue border border-gruvbox-blue/30 rounded hover:bg-gruvbox-blue/20 transition-colors"
        @click="exportData"
      >
        {{ t('settings.exportBtn') }}
      </button>
    </div>

    <!-- Import -->
    <div class="border border-gruvbox-bg2 rounded-lg p-6 mb-6">
      <h2 class="text-sm font-mono text-gruvbox-fg3 mb-2">{{ t('settings.import') }}</h2>
      <p class="text-sm text-gruvbox-fg4 mb-4">
        {{ t('settings.importDesc') }}
      </p>
      <div class="flex items-center gap-3">
        <input
          type="file"
          accept=".json"
          class="text-sm text-gruvbox-fg4 font-mono file:mr-3 file:px-3 file:py-1.5 file:rounded file:border file:border-gruvbox-bg3 file:bg-gruvbox-bg1 file:text-gruvbox-fg3 file:text-sm file:font-mono file:cursor-pointer"
          @change="onFileSelect"
        >
        <button
          v-if="importFile"
          class="px-4 py-2 text-sm font-mono bg-gruvbox-yellow/10 text-gruvbox-yellow border border-gruvbox-yellow/30 rounded hover:bg-gruvbox-yellow/20 transition-colors"
          @click="importData"
        >
          {{ t('settings.importBtn') }}
        </button>
      </div>
    </div>

    <!-- Reset -->
    <div class="border border-gruvbox-red/20 rounded-lg p-6">
      <h2 class="text-sm font-mono text-gruvbox-red mb-2">{{ t('settings.danger') }}</h2>
      <p class="text-sm text-gruvbox-fg4 mb-4">
        {{ t('settings.resetDesc') }}
      </p>
      <div class="flex items-center gap-3">
        <button
          class="px-4 py-2 text-sm font-mono rounded border transition-colors"
          :class="resetStep === 0
            ? 'bg-gruvbox-red/10 text-gruvbox-red border-gruvbox-red/30 hover:bg-gruvbox-red/20'
            : 'bg-gruvbox-red text-gruvbox-bg border-gruvbox-red animate-pulse'"
          @click="resetProgress"
        >
          {{ resetStep === 0 ? t('settings.reset') : resetStep === 1 ? t('settings.resetConfirm1') : t('settings.resetConfirm2') }}
        </button>
        <button
          v-if="resetStep > 0"
          class="px-3 py-2 text-sm font-mono text-gruvbox-fg4 hover:text-gruvbox-fg3"
          @click="cancelReset"
        >
          {{ t('settings.resetCancel') }}
        </button>
      </div>
    </div>
  </div>
</template>
