import { debounce, isArray } from '@yesstudio/yes-utils'

export default ({ app, store: { commit } }) => {
  let activeBreakpoint
  let isObserving = false
  let mediaQueryList

  function getBreakpoint() {
    const computedStyle = window.getComputedStyle(document.documentElement)
    const propertyValue = computedStyle.getPropertyValue('--breakpoint')
    return propertyValue.trim().replace(/"/g, '') || 'medium'
  }

  function setBreakpoint() {
    const newBreakpoint = getBreakpoint()
    if (newBreakpoint !== activeBreakpoint) commit('breakpoints/SET_BREAKPOINT', newBreakpoint)
    activeBreakpoint = newBreakpoint
  }

  function setHasHover({ matches: hasHover }) {
    commit('breakpoints/SET_HAS_HOVER', hasHover)
  }

  const onResize = debounce(setBreakpoint, 99)
  const onChange = debounce(setHasHover, 99)

  function observe() {
    if (isObserving) return
    window.addEventListener('resize', onResize)
    setBreakpoint()
    mediaQueryList = window.matchMedia('(hover: hover) and (pointer: fine)')
    mediaQueryList.addEventListener('change', onChange)
    setHasHover(mediaQueryList)
    isObserving = true
  }

  function unobserve() {
    if (!isObserving) return
    window.removeEventListener('resize', onResize)
    mediaQueryList.removeEventListener('change', onChange)
    mediaQueryList = undefined
    isObserving = false
  }

  const mixin = {
    mounted() {
      observe()
    },
    beforeDestroy() {
      unobserve()
    },
  }

  if (isArray(app.mixins)) {
    app.mixins.push(mixin)
  } else {
    app.mixins = [mixin]
  }
}
