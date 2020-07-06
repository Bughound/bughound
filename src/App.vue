<template>
  <v-app>
    <v-main>
      <router-view :key="$route.fullPath"/>
    </v-main>
    <mobile-nav app/>
  </v-app>
</template>

<script>

import MobileNav from '@/components/MobileNav.vue'
export default {
  components: {
    MobileNav
  },
  name: 'App',

  data: () => ({
    //
  })
}
</script>
