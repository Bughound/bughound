<template>
  <v-card>
  <v-app-bar
    color="primary"
    dark
    scroll-target="#scrolling-techniques-6"
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>{{ currentRouteName }}</v-toolbar-title>

    <v-spacer/>

    </v-app-bar>
  </v-card>
</template>

<script>
export default {
  computed: {
    currentRouteName () {
      return this.$route.name
    }
  }
}
</script>
