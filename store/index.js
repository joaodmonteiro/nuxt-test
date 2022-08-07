export const state = () => ({
  IS_ADMIN: false,
})

export const mutations = {
  SET_IS_ADMIN(state, value) {
    state.IS_ADMIN = value
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('api/FETCH_ARTISTS')
  },
}
