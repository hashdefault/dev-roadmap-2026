import type { LogEntry } from '../../server/db/schema'

export interface LogEntryWithTopic extends LogEntry {
  topicTitle: string | null
  topicSlug: string | null
}

export interface LogStats {
  allTimeMinutes: number
  weekMinutes: number
  monthMinutes: number
  daily: { date: string; minutes: number }[]
}

export interface HeatmapDay {
  date: string
  minutes: number
  count: number
}

export function useLog() {
  const fetchLogs = (params?: Record<string, string>) =>
    useFetch<LogEntryWithTopic[]>('/api/log', { params })

  const fetchStats = () => useFetch<LogStats>('/api/log/stats')

  const fetchHeatmap = () => useFetch<HeatmapDay[]>('/api/log/heatmap')

  const addEntry = async (data: {
    date: string
    durationMinutes: number
    topicId?: number | null
    summary?: string
  }) => {
    return $fetch<LogEntry>('/api/log', {
      method: 'POST',
      body: data,
    })
  }

  return {
    fetchLogs,
    fetchStats,
    fetchHeatmap,
    addEntry,
  }
}
