import en from '~/i18n/en'
import ptBR from '~/i18n/pt-BR'

export type Locale = 'en' | 'pt-BR'

const messages: Record<Locale, Record<string, string>> = {
  'en': en,
  'pt-BR': ptBR,
}

const currentLocale = ref<Locale>('en')

export function useI18n() {
  function t(key: string, params?: Record<string, string | number>): string {
    let message = messages[currentLocale.value]?.[key] ?? messages['en']?.[key] ?? key
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        message = message.replace(`{${k}}`, String(v))
      }
    }
    return message
  }

  function setLocale(locale: Locale) {
    currentLocale.value = locale
    if (import.meta.client) {
      localStorage.setItem('locale', locale)
    }
  }

  function initLocale() {
    if (import.meta.client) {
      const saved = localStorage.getItem('locale') as Locale | null
      if (saved && messages[saved]) {
        currentLocale.value = saved
      }
    }
  }

  function localized<T extends { title: string; titlePt?: string | null; description?: string | null; descriptionPt?: string | null }>(
    item: T,
  ): T & { localTitle: string; localDescription: string } {
    const isPt = currentLocale.value === 'pt-BR'
    return {
      ...item,
      localTitle: (isPt && item.titlePt) ? item.titlePt : item.title,
      localDescription: (isPt && item.descriptionPt) ? item.descriptionPt : (item.description ?? ''),
    }
  }

  return {
    t,
    locale: currentLocale,
    setLocale,
    initLocale,
    localized,
  }
}
