<template>
  <div class="d-flex flex-row justify-space-around ml-4 mr-4 navbar-taxon-view">
    <template v-for="(button, index) in buttons">
      <v-btn
        fab
        dark
        :key="index"
        :width="50"
        :height="50"
        :class="{ selected: isSelected(button) }"
        :style="buttonStyle(noImportance(button))"
        :disabled="noImportance(button)"
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
      classLevel: ['primary', 'black', 'orange', 'red'],
      buttons: [
        {
          icon: 'fa-bug',
          type: 'Information'
        },
        {
          icon: 'fa-seedling',
          type: 'Economic',
          importance_group: 'Economic'
        },
        {
          icon: 'fa-heartbeat',
          type: 'Sanitary',
          importance_group: 'Sanitary'
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
    },
    buttonStyle (disabled) {
      return {
        border: '4px solid white !important',
        backgroundColor: disabled ? 'rgba(0,0,0,0.7) !important' : undefined
      }
    },
    noImportance (button) {
      return button.importance_group ? this.levels[button.type] === undefined : false
    }
  }
}
</script>
<style lang="scss">
.navbar-taxon-view {
  z-index: 3;

  .selected {
    transform: scale(1.3);
  }
  .theme--dark {
    .v-btn--disabled {
      background-color: gray !important;
    }
  }
}

</style>
