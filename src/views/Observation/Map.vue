<template>
  <map-component
    v-if="observation.geojson"
    height="500px"
    ref="leaflet"
    :geojson="[feature]"
    :zoom-animation="true"
    :max-zoom="12"/>
</template>

<script>

import ImportanceColor from '@/views/Taxon/const/importanceColor'
import MapComponent from '@/components/Map.vue'

export default {
  components: {
    MapComponent
  },
  props: {
    observation: {
      type: Object,
      required: true
    }
  },
  computed: {
    feature () {
      const geojson = this.observation.geojson
      const obs = this.observation
      const level = obs.taxon.economic || obs.taxon.sanitary

      geojson.features[0].properties.icon = obs.taxon.economic === obs.taxon.sanitary ? 'fa-bug' : obs.taxon.economic > obs.taxon.sanitary ? 'fa-seedling' : 'fa-bug'
      geojson.features[0].properties.color = ImportanceColor[level]

      return geojson
    }
  },
  mounted () {
    this.$refs.leaflet.zoomToPoints()
  }
}
</script>
