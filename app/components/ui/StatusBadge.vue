<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
  status: string
}>()

const classMap: Record<string, string> = {
  not_started: 'text-gruvbox-fg4 bg-gruvbox-bg2',
  in_progress: 'text-gruvbox-yellow bg-gruvbox-yellow/10',
  completed: 'text-gruvbox-green bg-gruvbox-green/10',
  revisiting: 'text-gruvbox-blue bg-gruvbox-blue/10',
}

const currentClass = computed(() => classMap[props.status] ?? classMap.not_started)
const currentLabel = computed(() => t(`status.${props.status}`) || t('status.not_started'))
</script>

<template>
  <span
    class="inline-flex items-center px-2 py-0.5 text-xs font-mono rounded"
    :class="currentClass"
  >
    {{ currentLabel }}
  </span>
</template>
