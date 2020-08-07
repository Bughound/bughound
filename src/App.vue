<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <app-bar
      v-if="isAuthenticated"
      app>
    </app-bar>
    <v-main>
        <router-view :key="$route.fullPath"/>
    </v-main>
    <mobile-nav
      v-if="isAuthenticated"
      app/>
  </v-app>
</template>

<script>

import MobileNav from '@/components/MobileNav.vue'
import AppBar from '@/components/AppBar.vue'
import isAuthenticated from '@/helpers/isAuthenticated.js'

export default {
  components: {
    MobileNav,
    AppBar
  },
  name: 'App',
  computed: {
    theme () {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
    isAuthenticated () {
      return !isAuthenticated()
    }
  },
  data: () => ({
    //
  })
}
</script>
