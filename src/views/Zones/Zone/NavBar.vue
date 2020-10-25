<template>
  <div class="d-flex flex-row justify-space-between navbar-zone-view pl-6 pr-6">
    <div class="justify-space-around">
      <template v-for="(button, index) in buttons">
        <v-btn
          class="mr-4"
          fab
          dark
          :key="index"
          :width="50"
          :height="50"
          :class="{ 'selected lighten-2': isSelected(button) }"
          :style="buttonStyle()"
          @click="selectView(button)"
          color="primary">
          <v-icon dark>{{ button.icon }}</v-icon>
        </v-btn>
      </template>
    </div>
    <v-btn
      fab
      dark
      :width="50"
      :height="50"
      :class="{ 'selected lighten-2': isSelected('Alert') }"
      :style="buttonStyle()"
      @click="selectView('Alert')"
      color="primary">
      <v-icon dark>fa-bell</v-icon>
    </v-btn>
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
      classLevel: ['black', 'yellow', 'orange', 'red'],
      buttons: [
        {
          icon: 'fa-history',
          type: 'Timeline'
        },
        {
          icon: 'fa-bug',
          type: 'Species'
        },
        {
          icon: 'fa-map-marker-alt',
          type: 'Distribution'
        }
      ]
    }
  },
  methods: {
    isSelected (button) {
      return this.value === button.type
    },
    selectView (button) {
      this.$emit('input', button.type)
    },
    buttonStyle (disabled) {
      return {
        border: '4px solid white !important',
        backgroundColor: disabled ? 'rgba(0, 0, 0, 1) !important' : undefined
      }
    }
  }
}
</script>
<style lang="scss">
.navbar-zone-view {
  z-index: 3;

  .selected {
    transform: scale(1.3);
  }
}

</style>
