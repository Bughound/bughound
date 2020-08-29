<template>
  <v-bottom-navigation
    app
    grow
    color="primary"
  >
    <v-btn
      value="Home">
      <v-icon>fa-home</v-icon>
    </v-btn>

    <v-btn
      :to="{ name: 'Observaciones' }"
      value="Observaciones">
      <v-icon>fa-images</v-icon>
    </v-btn>

    <v-btn
      fab
      depressed
      class="camera-button elevation-4"
      value="camera"
      @click="openCamera">
      <v-icon color="white">fa-camera</v-icon>
    </v-btn>

    <v-btn
      :to="{ name: 'Mapa' }"
      value="Mapa">
      <v-icon>fa-map-marked-alt</v-icon>
    </v-btn>

    <v-btn :to="{ name: 'Zonas' }">
      <v-icon>fa-map-marker-alt</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>

import { ActionNames } from '@/store/actions/actions'

export default {
  methods: {
    openCamera () {
      this.$store.dispatch(ActionNames.ActivateCamera, true)
    },
    routeName () {
      return this.$route.name
    }
  },
  data () {
    return {
      buttonNav: 2
    }
  }
}
</script>

<style>
  .v-item-group.v-bottom-navigation .v-btn.v-size--default {
    height: inherit;
  }
  .camera-button {
    position: absolute;
    top: -50%;
    border-radius: 50% !important;
    border: 4px solid white !important;
    background-color: #219653 !important;
    height: 60px !important;
    width: 60px !important;
    min-width: 70px !important;
    max-width: 70px !important;
    min-height: 70px !important;
    max-height: 70px !important;
    color: white !important;
  }
</style>
