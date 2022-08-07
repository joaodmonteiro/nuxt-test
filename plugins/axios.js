import { isNonEmptyString } from '@yesstudio/yes-utils'

export default async function ({
  $axios: {
    defaults: {
      headers: { common },
    },
  },
  $config: { projectSlug, sessionCookie },
  $cookies,
  isDev,
  store,
}) {
  const isAdmin = isNonEmptyString($cookies.get(sessionCookie))

  Object.assign(common, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(isAdmin ? { 'Yes-Draft': true } : !isDev && { 'Yes-Cache': true }),
    'Yes-Project-Slug': projectSlug,
  })

  await store.commit('SET_IS_ADMIN', isAdmin || isDev)
}
