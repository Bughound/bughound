<template>
  <v-app :style="{background: 'transparent'}">
    <app-bar
      v-show="!cameraActive"
      v-if="false"
      app>
    </app-bar>
    <menu-panel
      v-show="!cameraActive"
    />
    <v-main v-show="!cameraActive">
      <router-view :key="$route.fullPath"/>
    </v-main>
    <mobile-nav
      v-if="getUser && !cameraActive"
      app/>
    <v-footer v-show="!cameraActive"/>
    <camera-component v-if="cameraActive"/>
  </v-app>
</template>

<script>

import MobileNav from '@/components/MobileNav.vue'
import AppBar from '@/components/AppBar.vue'
import { GetterNames } from '@/store/getters/getters'
import { ActionNames } from '@/store/actions/actions'
import isAuthenticated from '@/helpers/isAuthenticated.js'
import CameraComponent from '@/components/Camera.vue'
import MenuPanel from '@/components/MenuPanel.vue'

export default {
  components: {
    MenuPanel,
    MobileNav,
    AppBar,
    CameraComponent
  },
  name: 'App',
  computed: {
    theme () {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
    getUser () {
      return this.$store.getters[GetterNames.GetUser]
    },
    cameraActive () {
      return this.$store.getters[GetterNames.GetSettings].cameraActive
    }
  },
  beforeCreate () {
    if (isAuthenticated()) {
      this.$store.dispatch(ActionNames.LoadUser).then(() => {
        this.$store.dispatch(ActionNames.LoadZones)
      }).catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem('authtoken')
          this.$router.push({ name: 'Login' })
        }
      })
    } else {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
<style lang="scss">
  .p-fixed {
    position: fixed;
  }
</style>
