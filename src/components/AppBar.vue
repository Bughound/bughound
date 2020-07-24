<template>
  <v-card
  flat="false"
  rounded="false">
  <v-app-bar
    rounded="false"
    tile="true"
    color="white"
    scroll-target="#scrolling-techniques-6"
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>{{ currentRouteName }}</v-toolbar-title>

    <v-spacer/>
    <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
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
