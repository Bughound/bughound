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
      @click="openCamera">
      <v-icon>mdi-camera</v-icon>
      <camera-component
        ref="camera"
        @onPicture="processImage"/>
    </v-btn>

    <v-btn
      :to="{ name: 'Mapa' }"
      value="Map">
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
  <v-dialog
    color="white"
    v-model="isSaving" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-container
    class="white"
      fill-height
      fluid>
      <v-row align="center"
        justify="center">
        <v-col align="center">
          <v-progress-circular
            :width="7"
            :size="100"
            color="primary mb-15"
            indeterminate
          ></v-progress-circular>
          <h3 class="text-h4 mt-15 font-weight-light">Identificando especie</h3>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</div>
</template>

<script>

import CameraComponent from '@/components/Camera.vue'
import ParseDMS from '@/helpers/parseDMS.js'
import ActionNames from '@/store/actions/actionNames'
import makeGeoJSONFeature from '@/helpers/makeGeoJSONFeature.js'

export default {
  components: {
    CameraComponent
  },
  data () {
    return {
      bottomNav: 'recent',
      isSaving: false,
      options: {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    }
  },
  methods: {
    openCamera () {
      this.$refs.camera.openCamera()
    },
    async processImage (cameraImage) {
      const formData = new FormData()
      this.isSaving = true

      const data = { count: 1, date: new Date(), geojson: await this.createGeoJSON(cameraImage.exif) }
      formData.append('files.image', cameraImage.image, cameraImage.image.name)
      formData.append('data', JSON.stringify(data))
      this.isSaving = true
      this.$store.dispatch(ActionNames.CreateObservation, formData).then(() => {
        this.isSaving = false
        this.$router.push({ name: 'Identificacion' })
      })

      console.log(data)
    },
    parseEXIFCoordinate (GPSCoordinate) {
      return GPSCoordinate ? `${GPSCoordinate[0]}° ${GPSCoordinate[1]}' ${GPSCoordinate[2]}"` : undefined
    },
    getGPSCoordinates (exif) {
      return {
        latitude: ParseDMS(this.parseEXIFCoordinate(exif.GPSLatitude) + exif.GPSLatitudeRef),
        longitude: ParseDMS(this.parseEXIFCoordinate(exif.GPSLongitude) + exif.GPSLongitudeRef)
      }
    },
    createGeoJSON (exif) {
      return new Promise((resolve, reject) => {
        const coordinates = this.getGPSCoordinates(exif)

        if (!(isNaN(coordinates.latitude) && isNaN(coordinates.longitude))) {
          resolve(makeGeoJSONFeature(coordinates.latitude, coordinates.longitude))
        } else {
          navigator.geolocation.getCurrentPosition(pos => {
            resolve(makeGeoJSONFeature(pos.coords.latitude, pos.coords.longitude))
          }, error => {
            reject(error)
          }, this.options)
        }
      })
    }
  }
}
</script>

<style>
  .v-item-group.v-bottom-navigation .v-btn.v-size--default {
     height: inherit;
  }
</style>
