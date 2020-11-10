<template>
  <div class="d-flex flex-row justify-space-between navbar-zone-view pl-6 pr-2">
    <div
      v-for="(column, index) in buttons"
      class="justify-space-around"
      :key="index">
      <template v-for="(button, index) in column">
        <v-btn
          class="mr-4"
          fab
          dark
          :key="index"
          :width="50"
          :height="50"
          :disabled="needRecords(button)"
          :class="{ 'selected lighten-2': isSelected(button) }"
          :style="buttonStyle(needRecords(button))"
          @click="selectView(button)"
          color="primary">
          <v-icon dark>{{ button.icon }}</v-icon>
        </v-btn>
      </template>
    </div>
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
    },
    observations: {
      type: Array,
      required: true
    },
    alerts: {
      type: Array,
      required: true
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
      buttons: [[
        {
          icon: 'fa-history',
          type: 'Timeline',
          needRecords: 'observations'
        },
        {
          icon: 'fa-bug',
          type: 'Species',
          needRecords: 'observations'
        },
        {
          icon: 'fa-map-marker-alt',
          type: 'Distribution'
        }
      ],
      [{
        icon: 'fa-bell',
        type: 'Notifications',
        needRecords: 'alerts'
      },
      {
        icon: 'fa-cog',
        type: 'Settings'
      }]
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
    },
    needRecords (button) {
      return button.needRecords ? this[button.needRecords].length === 0 : false
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
