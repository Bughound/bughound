<template>
  <v-card
  :flat="false"
  rounded="false">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Usuario</v-list-item-title>
            <v-list-item-subtitle>Usuario</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      rounded="false"
      :tile="true"
      color="white"
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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
  },
  data () {
    return {
      drawer: false
    }
  }
}
</script>
