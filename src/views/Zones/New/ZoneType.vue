<template>
  <v-container>
    <template v-for="(zoneType, key, index) in zoneTypes">
      <v-row
        :key="key">
        <v-col
          align="center"
          justify="center"
          @click="setZone(key)">
          <v-img
            class="mb-4 mt-6"
            :width="200"
            :src="zoneType.image"/>
          <span class="text-h4">{{ zoneType.label }}</span>
          <p class="mt-4 mb-4">{{ zoneType.description }}</p>
        </v-col>
      </v-row>
      <v-divider
        v-if="index < (Object.keys(zoneType).length - 2)"
        :key="key"/>
    </template>
  </v-container>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    zoneTypes: {
      type: Object,
      required: true
    }
  },
  computed: {
    zone: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    setZone (value) {
      this.zone.type = value
      this.$emit('onSelect')
    }
  }
}
</script>
