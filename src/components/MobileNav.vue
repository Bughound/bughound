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

    <v-btn value="favorites">
      <span>Foto</span>
      <v-icon>mdi-camera</v-icon>
    </v-btn>

    <v-btn value="nearby">
      <span>Zonas</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data () {
    return {
      bottomNav: 'recent'
    }
  }
}
</script>

<style>
  .v-item-group.v-bottom-navigation .v-btn.v-size--default {
    height: inherit;
  }
</style>
