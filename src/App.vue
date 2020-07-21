<template>
  <v-app>
    <app-bar app>
    </app-bar>
    <v-main>
        <router-view :key="$route.fullPath"/>
    </v-main>
    <mobile-nav app/>
  </v-app>
</template>

<script>

import MobileNav from '@/components/MobileNav.vue'
import AppBar from '@/components/AppBar.vue'

export default {
  components: {
    MobileNav,
    AppBar
  },
  name: 'App',

  data: () => ({
    //
  })
}
</script>
