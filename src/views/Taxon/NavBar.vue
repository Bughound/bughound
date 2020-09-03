<template>
  <div class="d-flex flex-row justify-space-around ml-4 mr-4">
    <template v-for="(button, index) in buttons">
      <v-btn
        fab
        dark
        :key="index"
        :width="50"
        :height="50"
        :class="{ selected: isSelected(button) }"
        :style="buttonStyle"
        depressed
        @click="selectView(button)"
        :color="setColor(button)">
        <v-icon dark>{{ button.icon }}</v-icon>
      </v-btn>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    levels: {
      type: Object,
      default: () => {}
    },
    value: {
      type: String,
      default: undefined
    }
  },
  computed: {
    selectedView: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  data () {
    return {
      buttonStyle: {
        border: '4px solid white !important'
      },
      classLevel: ['primary', 'black', 'orange', 'red'],
      buttons: [
        {
          icon: 'fa-bug',
          type: 'Information'
        },
        {
          icon: 'fa-seedling',
          type: 'Economic'
        },
        {
          icon: 'fa-heartbeat',
          type: 'Sanitary'
        },
        {
          icon: 'fa-globe-americas',
          type: 'Habitat'
        },
        {
          icon: 'fa-map-marker-alt',
          type: 'Distribution'
        },
        {
          icon: 'fa-chart-bar',
          type: 'Statistics'
        }
      ]
    }
  },
  methods: {
    setColor (button) {
      return `${button.type ? this.levels[button.type] ? this.classLevel[this.levels[button.type]] : 'primary' : 'primary'} ${button.type === this.value ? 'lighten-2' : ''}`
    },
    isSelected (button) {
      return this.value === button.type
    },
    selectView (button) {
      this.$emit('input', button.type)
    }
  }
}
</script>
<style scoped>
.selected {
  transform: scale(1.3);
}

</style>
