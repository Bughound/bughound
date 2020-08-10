<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <app-bar
      v-if="getUser"
      app>
    </app-bar>
    <v-main>
      <router-view :key="$route.fullPath"/>
    </v-main>
    <mobile-nav
      v-if="getUser"
      app/>
    <v-footer/>
  </v-app>
</template>

<script>

import MobileNav from '@/components/MobileNav.vue'
import AppBar from '@/components/AppBar.vue'
import { GetterNames } from '@/store/getters/getters'
import { ActionNames } from '@/store/actions/actions'
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
    getUser () {
      return this.$store.getters[GetterNames.GetUser]
    }
  },
  data: () => ({
    //
  }),
  beforeCreate () {
    if (isAuthenticated()) {
      this.$store.dispatch(ActionNames.LoadUser)
    }
  }
}
</script>
<style lang="scss">
  .p-fixed {
    position: fixed;
  }
</style>
