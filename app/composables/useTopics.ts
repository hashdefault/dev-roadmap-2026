import type { Topic, Pillar, Resource, LogEntry } from '../../server/db/schema'

export interface TopicWithProgress extends Topic {
  status: string
  confidence: number
  startedAt: string | null
  completedAt: string | null
  progressNotes: string | null
}

export interface TopicDetail extends TopicWithProgress {
  pillar: Pillar | null
  progressUpdatedAt: string | null
  resources: Resource[]
  logEntries: LogEntry[]
}

export interface PillarWithStats extends Pillar {
  topicCount: number
  completedCount: number
}

export function useTopics() {
  const fetchPillars = () => useFetch<PillarWithStats[]>('/api/pillars')

  const fetchTopics = (params?: Record<string, string>) =>
    useFetch<TopicWithProgress[]>('/api/topics', { params })

  const fetchTopic = (slug: string) =>
    useFetch<TopicDetail>(`/api/topics/${slug}`)

  const updateProgress = async (topicId: number, data: {
    status?: string
    confidence?: number
    notes?: string
  }) => {
    return $fetch(`/api/topics/${topicId}/progress`, {
      method: 'PATCH',
      body: data,
    })
  }

  const toggleResource = async (resourceId: number) => {
    return $fetch(`/api/resources/${resourceId}/toggle`, {
      method: 'POST',
    })
  }

  return {
    fetchPillars,
    fetchTopics,
    fetchTopic,
    updateProgress,
    toggleResource,
  }
}
