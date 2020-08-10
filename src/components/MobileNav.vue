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
      :to="{ name: 'Tomar foto' }">
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
