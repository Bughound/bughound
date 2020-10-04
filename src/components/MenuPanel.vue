<template>
  <v-navigation-drawer
    v-model="settings.showMenuPanel"
    app
  >
  <template v-if="user">
    <v-list dense>
      <v-list-item two-line>
        <v-list-item-avatar>
          <v-img :src="imageRoute(user.avatar.formats.thumbnail.url)"/>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.first_name }} {{ user.last_name }}</v-list-item-title>
          <v-list-item-subtitle>Usuario</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        link
        @click="logout">
        <v-list-item-action>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Salir</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </template>
  </v-navigation-drawer>
</template>

<script>

import { ActionNames } from '@/store/actions/actions.js'
import { GetterNames } from '@/store/getters/getters.js'
import { MutationNames } from '@/store/mutations/mutations.js'
import apiRoute from '@/helpers/apiRoute'

export default {
  computed: {
    currentRouteName () {
      return this.$route.name
    },
    user () {
      return this.$store.getters[GetterNames.GetUser]
    },
    settings: {
      get () {
        return this.$store.getters[GetterNames.GetSettings]
      },
      set (value) {
        this.$store.commit(MutationNames.SetSettings, value)
      }
    }
  },
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch(ActionNames.Logout)
      this.$router.push({ name: 'Login' })
    },
    imageRoute: (path) => `${apiRoute}${path}`
  }
}
</script>
<style lang="scss">
  .v-toolbar__content {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
  }
</style>
