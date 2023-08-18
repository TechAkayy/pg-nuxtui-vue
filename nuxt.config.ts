// import { fileURLToPath, URL } from 'node:url'
import AutoImportComponents from 'unplugin-vue-components/vite'
import { NuxtLabsUIComponentResolver } from 'nuxtlabs-ui-vue'
import presetIcons from '@unocss/preset-icons'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      title: `Vue Designer`,
      description:
        'Vue Designer Nuxt Tailwind CSS / Nuxt UI - Quick start template',
      author: 'Pinegrow',
      nav: [
        { text: 'Home', link: '/' },
        { text: `Store`, link: '/store' },
        { text: `Quick Start`, link: '/quick-start' },
        { text: 'Subscribe', link: '/subscribe' },
      ],
    },
    app: {
      baseURL: '/',
    },
  },
  modules: [
    '@pinegrow/nuxt-module',
    //@unocss/nuxt & @unocss/preset-icons is not required, as Nuxt UI already includes an UIcon component that uses egoist/tailwindcss-icons which also uses the same unocss format for icon names, for example, i-mdi-home.
    // '@nuxthq/ui',
    '@unocss/nuxt',
    '@nuxt/devtools',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxtjs/html-validator',
  ],
  pinegrow: {
    liveDesigner: {
      iconPreferredCase: 'unocss', // default value (can be removed), Nuxt UI uses the unocss format for icon names
      devtoolsKey: 'devtools', // see plugins/devtools.client.ts
      tailwindcss: {
        configPath: 'tailwind.config.ts',
        cssPath: '@/assets/css/tailwind.css',
        // TODO: restartOnThemeUpdate is required at the moment to automatically restart nuxt dev server whenever theme is changed in Vue Designer's design panel (which is very slow at the moment)
        // restartOnThemeUpdate might not be required if the HMR issue with nuxt tailwind module is fixed - https://github.com/nuxt-modules/tailwindcss/issues/682
        // restartOnThemeUpdate: true,
      },
      // plugins: [
      //   {
      //     name: 'My Awesome Lib 3.0',
      //     key: 'my-awesome-lib',
      //     pluginPath: fileURLToPath(
      //       new URL('./my-awesome-lib/web-types.json', import.meta.url),
      //     ),
      //   },
      // ],
    },
  },
  // ui: {
  //   icons: 'all',
  //   // safelistColors: [
  //   //   'primary',
  //   //   'secondary',
  //   //   'tertiary',
  //   //   'success',
  //   //   'warning',
  //   //   'error',
  //   //   'info',
  //   // ],
  // },

  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  content: {
    markdown: {
      anchorLinks: false,
      rehypePlugins: [
        [
          'rehype-external-links',
          {
            target: '_blank',
            rel: ['noopener'],
            test: (node: any) => /^https?:\/\//.test(node.properties.href),
          },
        ],
      ],
    },
    highlight: {
      theme: 'dracula-soft',
    },
  },
  unocss: {
    presets: [
      presetIcons({
        prefix: 'i-', // default prefix, do not change
      }),
    ],
  },

  vite: {
    optimizeDeps: { exclude: ['fsevents'] },
    plugins: [
      AutoImportComponents({
        extensions: ['vue', 'md'],
        // allow auto load markdown components under `./src/content/`
        dirs: ['components', 'content', 'layouts', 'pages'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [NuxtLabsUIComponentResolver()], // Auto-import using resolvers
        dts: 'components.d.ts',
      }),
    ],
  },
})
