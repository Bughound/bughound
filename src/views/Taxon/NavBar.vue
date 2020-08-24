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
        :color="setColor(button)">
        <v-icon dark>{{ button.icon }}</v-icon>
      </v-btn>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    levels: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      classLevel: ['primary', 'black', 'orange', 'red'],
      buttons: [
        {
          icon: 'fa-bug'
        },
        {
          icon: 'fa-seedling',
          type: 'economica'
        },
        {
          icon: 'fa-heartbeat',
          type: 'sanitaria'
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
  },
  methods: {
    setColor (button) {
      return button.type ? this.levels[button.type] ? this.classLevel[this.levels[button.type]] : 'primary' : 'primary'
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
