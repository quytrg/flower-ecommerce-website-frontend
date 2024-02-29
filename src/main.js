// import './assets/styles/client/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.router'

// vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

createApp(App).use(router).use(vuetify).use(pinia).mount('#app')
