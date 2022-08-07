import { isNonEmptyString } from '@yesstudio/yes-utils'

export const state = () => ({
  BREAKPOINT: undefined,
  BREAKPOINTS: ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'],
  HAS_HOVER: false,
})

export const getters = {
  HAS_BREAKPOINT({ BREAKPOINT }) {
    return isNonEmptyString(BREAKPOINT)
  },
  IS_BREAKPOINT({ BREAKPOINT, BREAKPOINTS, HAS_HOVER }) {
    return (breakpoint, hover) => {
      const modifier = /(\+|-)$/.exec(breakpoint)?.[0]
      if (modifier) breakpoint = breakpoint.slice(0, -1)
      const index = BREAKPOINTS.indexOf(breakpoint)
      if (index === -1) return false
      const activeIndex = BREAKPOINTS.indexOf(BREAKPOINT)
      return (
        ((!modifier && BREAKPOINT === breakpoint) ||
          (modifier === '-' && activeIndex <= index) ||
          (modifier === '+' && activeIndex >= index)) &&
        (!hover || (hover === 'hover' && HAS_HOVER) || (hover === 'none' && !HAS_HOVER))
      )
    }
  },
}

export const mutations = {
  SET_BREAKPOINT(state, value) {
    state.BREAKPOINT = value
  },
  SET_HAS_HOVER(state, value) {
    state.HAS_HOVER = value
  },
}
