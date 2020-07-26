<template>
<div>
  <v-bottom-navigation
    app
    grow
    shift
    dark
    v-model="bottomNav"
  >
    <v-btn
      value="Home">
      <span>Inicio</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn
      :to="{ name: 'Observaciones' }"
      value="Recent">
      <span>Observaciones</span>
      <v-icon>mdi-file-find</v-icon>
    </v-btn>

    <v-btn
      value="camera"
      @click="openCamera">
      <span>Foto</span>
      <v-icon>mdi-camera</v-icon>
      <camera-component ref="camera"/>
    </v-btn>

    <v-btn
      :to="{ name: 'Mapa' }"
      value="Map">
      <span>Mapa</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</div>
</template>

<script>

import CameraComponent from './Camera'

export default {
  components: {
    CameraComponent
  },
  data () {
    return {
      bottomNav: 'recent'
    }
  },
  methods: {
    openCamera () {
      this.$refs.camera.openCamera()
    }
  }
}
</script>

<style>
  .v-item-group.v-bottom-navigation .v-btn.v-size--default {
     height: inherit;
  }
</style>
