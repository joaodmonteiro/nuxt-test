import { isAxiosError } from 'axios'
import { isArray, isInteger, isNonEmptyArray, isNonEmptyString } from '@yesstudio/yes-utils'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'

export const state = () => {
  return {
    ARTISTS: [],
  }
}

export const getters = {
  HAS_ARTISTS: ({ ARTISTS }) => {
    return isNonEmptyArray(ARTISTS)
  },
}

export const mutations = {
  SET_ARTISTS(state, { artists }) {
    state.ARTISTS = artists
  },
}

export const actions = {
  async FETCH_ARTISTS({ commit, dispatch }) {
    try {
      const response = await this.$axios.$get('/types/artist?related=false&view=false')
      const { data } = Object(response)
      const artists = isArray(data) ? data : []
      commit('SET_ARTISTS', { artists })
    } catch (error) {
      dispatch('HANDLE_ERROR', { action: 'api/FETCH_ARTISTS', error })
    }
  },
  HANDLE_ERROR(_context, { action, error }) {
    let message, statusCode

    if (isAxiosError(error)) {
      const { response } = error
      ;({ status: statusCode } = Object(response))
    } else {
      ;({ message } = Object(error))
    }

    if (!Object.values(StatusCodes).filter(isInteger).includes(statusCode)) {
      statusCode = 500
    }

    const { error: nuxtError, isDev } = this.app.context

    if (!isDev) {
      return nuxtError({
        message: getReasonPhrase(statusCode),
        statusCode,
      })
    }

    // eslint-disable-next-line no-console
    console.error(`[${action}]:`, isNonEmptyString(message) ? message : getReasonPhrase(statusCode))
  },
}
