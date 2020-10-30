<template>
  <div
    class="pa-0 ma-0 map-container">
    <map-component
      ref="leaflet"
      :zoom-animation="false"
      :geojson="geojson"/>
  </div>
</template>
<script>

import MapComponent from '@/components/Map.vue'
import ImportanceColor from '@/views/Taxon/const/importanceColor'
import apiRoute from '@/helpers/apiRoute'

export default {
  components: {
    MapComponent
  },
  props: {
    observations: {
      type: Array,
      default: () => []
    },
    zone: {
      type: Object,
      required: true
    }
  },
  computed: {
    geojson () {
      const zonePoint = JSON.parse(JSON.stringify(this.zone.geojson))
      const circleRadius = JSON.parse(JSON.stringify(this.zone.geojson))

      circleRadius.properties.radius = this.zone.distance * 1000
      zonePoint.properties.icon = this.zone.type === 'economic' ? 'fa-seedling' : 'fa-home'
      zonePoint.properties.color = 'blue'
      const geoData = this.observations.filter(obs => obs.geojson).map(obs => {
        const level = obs.taxon.economic || obs.taxon.sanitary
        obs.geojson.features[0].properties.icon = 'fa-bug'
        obs.geojson.features[0].properties.color = ImportanceColor[level]
        obs.geojson.features[0].properties.popupContent = `
        <a href="/taxons/${obs.taxon.id}" class="v-list-item v-list-item--link theme--light pl-0">
          <div class="v-avatar v-list-item__avatar grey" style="height: 40px; min-width: 40px; width: 40px;">
          <div class="v-image v-responsive theme--light">
            <div class="v-responsive__sizer" style="padding-bottom: 55.5102%;"></div>
            <div class="v-image__image v-image__image--cover" style="background-image: url(&quot;${this.imageRoute(obs.taxon.image.formats.thumbnail.url)}&quot;); 
              background-position: center center;"></div><div class="v-responsive__content" style="width: 245px;"></div>
            </div>
          </div>
          <div>
            <div class="v-list-item__title headline">${obs.taxon.common_name}</div>
            <div class="v-list-item__subtitle">${obs.taxon.parent.name} ${obs.taxon.name}</div>
          </div>
        </a>`
        return obs
      }).map(item => item.geojson)
      return [].concat(geoData, [zonePoint, circleRadius])
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.leaflet.zoomToPoints(null)
    })
  },
  methods: {
    imageRoute: (path) => `${apiRoute}${path}`
  }
}
</script>
<style scoped>
.map-container {
  position: relative;
  top: -27px;
  height: calc(100% - 50px)
}
</style>
