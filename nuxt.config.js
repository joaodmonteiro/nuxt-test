import { join, resolve } from 'path'
import { writeFileSync } from 'fs'
import { fromFile } from '@capsizecss/unpack'
import { toKebabCase, toUrl } from '@yesstudio/yes-utils'
import { validateEnv } from './utils/validateEnv'

const {
  apiURL,
  assetBucketURL,
  assetServiceURL,
  baseURL,
  cmsURL,
  isDevelopment,
  isLocalhost,
  isProduction,
  projectSlug,
  sessionCookie,
} = validateEnv(process.env)

export default {
  alias: {
    fonts: resolve(__dirname, './assets/fonts'),
    scss: resolve(__dirname, './assets/scss'),
  },
  axios: {
    baseURL: apiURL,
  },
  build: {
    html: {
      minify: {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        preserveLineBreaks: false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
    },
    loaders: {
      scss: {
        additionalData: [
          '@use "scss/abstracts/accessibility" as *;',
          '@use "scss/abstracts/breakpoints" as *;',
          '@use "scss/abstracts/math" as *;',
          '@use "scss/abstracts/typography" as *;',
        ].join('\n'),
      },
    },
    postcss: {
      plugins: {
        'postcss-combine-duplicated-selectors': {
          removeDuplicatedProperties: true,
        },
        'postcss-sort-media-queries': {
          sort: 'mobile-first',
        },
      },
    },
    transpile: ['@yesstudio/yes-utils'],
  },
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/postcss8',
    '@nuxtjs/style-resources',
    '@nuxtjs/stylelint-module',
    'cookie-universal-nuxt',
  ],
  components: true,
  css: ['@yesstudio/yes-sanitise', 'assets/scss/app.scss'],
  head: {
    ...(!isProduction && {
      meta: [
        {
          hid: 'robots',
          name: 'robots',
          content: 'noindex',
        },
      ],
    }),
    link: [
      {
        rel: 'dns-prefetch',
        href: `//${toUrl(assetBucketURL).hostname}`,
      },
      {
        rel: 'preconnect',
        href: toUrl(assetBucketURL).origin,
      },
    ],
  },
  hooks: {
    build: {
      async before({
        nuxt: {
          options: {
            alias: { fonts: fontsDir, scss: scssDir },
          },
        },
      }) {
        const fontPath = join(fontsDir, 'CircularXXWeb-Book.woff2')
        const { unitsPerEm, capHeight, ascent, descent, xHeight } = await fromFile(fontPath)
        const filePath = join(scssDir, 'abstracts/_font-metrics.scss')
        const fileData = `${Object.entries({ capHeight, ascent, descent, xHeight })
          .map(([key, value]) => `$${toKebabCase(key)}: ${value / unitsPerEm};`)
          .join('\n')}\n`
        writeFileSync(filePath, fileData)
      },
    },
  },
  loading: false,
  modern: !isDevelopment && 'client',
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],
  plugins: ['~/plugins/axios.js', '~/plugins/breakpoints.client.js'],
  publicRuntimeConfig: {
    apiURL,
    assetServiceURL,
    baseURL,
    cmsURL,
    projectSlug,
    sessionCookie,
  },
  pwa: {
    meta: {
      name: 'Nuxt 2 Template',
      author: 'YES Studio',
      description: '',
    },
    manifest: {
      name: 'Nuxt 2 Template',
      short_name: 'Nuxt 2',
      description: '',
    },
  },
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style'].includes(type) || (type === 'font' && /\.woff2$/.test(file))
      },
    },
  },
  router: {
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-exact-active',
    trailingSlash: false,
  },
  styleResources: {
    hoistUseStatements: true,
  },
  vue: {
    config: {
      devtools: isLocalhost,
    },
  },
}
