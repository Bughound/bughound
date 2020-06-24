<template>
  <v-app>
    <v-content background-color="red">
      <router-view :key="$route.fullPath"/>
    </v-content>
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
