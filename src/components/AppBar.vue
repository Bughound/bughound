<template>
  <v-app-bar
    :collapse="!collapseOnScroll"
    :collapse-on-scroll="collapseOnScroll"
    color="primary"
    dark
    scroll-target="#scrolling-techniques-6"
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>{{ currentRouteName }}</v-toolbar-title>

    <v-spacer/>

    <v-checkbox
      v-model="collapseOnScroll"
      color="white"
      hide-details
    />
    </v-app-bar>
</template>

<script>
export default {
  computed: {
    currentRouteName () {
      return this.$route.name
    }
  },
  data () {
    return {
      collapseOnScroll: false
    }
  }
}
</script>
