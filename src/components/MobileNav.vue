<template>
<div>
  <v-bottom-navigation
    app
    grow
    dark
    v-model="bottomNav"
  >
    <v-btn
      value="Home">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn
      :to="{ name: 'Observaciones' }"
      value="Recent">
      <v-icon>mdi-file-find</v-icon>
    </v-btn>

    <v-btn
      value="camera"
      @click="openCamera">
      <v-icon>mdi-camera</v-icon>
    </v-btn>

    <v-btn
      :to="{ name: 'Mapa' }"
      value="Map">
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</div>
</template>

<script>

import { ActionNames } from '@/store/actions/actions'

export default {
  methods: {
    openCamera () {
      this.$store.dispatch(ActionNames.ActivateCamera, true)
    }
  },
  data () {
    return {
      buttonNav: undefined
    }
  }
}
</script>

<style>
  .v-item-group.v-bottom-navigation .v-btn.v-size--default {
     height: inherit;
  }
</style>
