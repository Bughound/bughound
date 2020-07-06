<template>
  <v-bottom-navigation
    app
    grow
    v-model="bottomNav"
  >
    <v-btn value="recent">
      <span>Observaciones</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn
      value="camera"
      @click="openCamera">
      <span>Foto</span>
      <v-icon>mdi-camera</v-icon>
      <camera-component ref="camera"/>
    </v-btn>

    <v-btn value="nearby">
      <span>Zonas</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
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
