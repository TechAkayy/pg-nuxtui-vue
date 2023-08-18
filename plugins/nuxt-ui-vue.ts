import { createNuxtLabsUI } from 'nuxtlabs-ui-vue'
import nuxtLabsTheme from 'nuxtlabs-ui-vue/dist/theme/nuxtlabsTheme'

export default defineNuxtPlugin((nuxtApp) => {
  const UI = createNuxtLabsUI({
    registerComponents: false,
  })

  nuxtApp.vueApp.use(UI, nuxtLabsTheme)
})
