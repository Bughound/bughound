<template>
  <div class="d-flex flex-row justify-space-around ml-4 mr-4">
    <template v-for="(button, index) in buttons">
      <div
        class="taxon-button-nav"
        :key="index">
      <v-btn
        fab
        dark
        small
        depressed
        color="primary">
        <v-icon dark>{{ button.icon }}</v-icon>
      </v-btn>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      buttons: [
        {
          icon: 'fa-bug'
        },
        {
          icon: 'fa-seedling'
        },
        {
          icon: 'fa-heartbeat'
        },
        {
          icon: 'fa-globe-americas'
        },
        {
          icon: 'fa-map-marker-alt'
        },
        {
          icon: 'fa-chart-bar'
        }
      ]
    }
  }
}
</script>

<style>
.taxon-button-nav {
  border: 4px solid white !important;
  border-radius: 50%;
}
</style>
