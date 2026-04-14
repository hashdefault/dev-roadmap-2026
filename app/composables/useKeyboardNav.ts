import { ref, onMounted, onUnmounted } from 'vue'

export function useKeyboardNav(options: {
  items: () => HTMLElement[]
  onSelect?: (index: number) => void
  onToggle?: (index: number) => void
  onSearch?: () => void
  enabled?: () => boolean
}) {
  const activeIndex = ref(-1)

  function getItems() {
    return options.items()
  }

  function updateHighlight(newIndex: number) {
    const items = getItems()
    items.forEach(el => el.classList.remove('keyboard-active'))

    if (newIndex >= 0 && newIndex < items.length) {
      activeIndex.value = newIndex
      items[newIndex].classList.add('keyboard-active')
      items[newIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (options.enabled && !options.enabled()) return

    const target = e.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      if (e.key === 'Escape') {
        target.blur()
        e.preventDefault()
      }
      return
    }

    const items = getItems()
    if (!items.length) return

    switch (e.key) {
      case 'j':
        e.preventDefault()
        updateHighlight(Math.min(activeIndex.value + 1, items.length - 1))
        break
      case 'k':
        e.preventDefault()
        updateHighlight(Math.max(activeIndex.value - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (activeIndex.value >= 0) {
          options.onSelect?.(activeIndex.value)
        }
        break
      case 'x':
        e.preventDefault()
        if (activeIndex.value >= 0) {
          options.onToggle?.(activeIndex.value)
        }
        break
      case '/':
        e.preventDefault()
        options.onSearch?.()
        break
      case 'g':
        e.preventDefault()
        updateHighlight(0)
        break
      case 'G':
        e.preventDefault()
        updateHighlight(items.length - 1)
        break
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })

  return {
    activeIndex,
    updateHighlight,
  }
}
