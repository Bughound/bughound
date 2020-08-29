<template>
  <div>
    <div class="overlay">
        <div id="cameraPreview" class="cameraPreview">
          <div
            class="close-button"
            @click="closeCamera">
            <i class="fas fa-chevron-left"></i>
          </div>
          <span class="text-information">Posicione el insecto dentro del recuadro</span>
          <div
            @click="takePicture"
            class="shutter-button">
            <i class="fas fa-camera"></i>
          </div>
        </div>
    </div>

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

import ParseDMS from '@/helpers/parseDMS.js'
import makeGeoJSONFeature from '@/helpers/makeGeoJSONFeature.js'
import { Plugins } from '@capacitor/core'
import { ActionNames } from '@/store/actions/actions'

const { Geolocation } = Plugins
const { CameraPreview } = Plugins

function dataURItoBlob (dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString
  if (dataURI.split(',')[0].indexOf('base64') >= 0) { byteString = atob(dataURI.split(',')[1]) } else { byteString = unescape(dataURI.split(',')[1]) }

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ia], { type: mimeString })
}

export default {
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
  mounted () {
    this.openCamera()
  },
  methods: {
    openCamera () {
      CameraPreview.start()
    },
    closeCamera () {
      this.$store.dispatch(ActionNames.ActivateCamera, false)
    },
    async takePicture () {
      const result = await CameraPreview.capture()
      const base64PictureData = result.value
      const dataUrlPictureData = `data:text/plain;base64,${base64PictureData}`
      CameraPreview.stop()
      this.processImage(dataURItoBlob(dataUrlPictureData))
    },
    async processImage (cameraImage) {
      const formData = new FormData()
      const data = { count: 1, date: new Date(), geojson: await this.createGeoJSON(cameraImage) }
      formData.append('files.image', cameraImage, 'species')
      formData.append('data', JSON.stringify(data))
      this.isSaving = true
      this.$store.dispatch(ActionNames.CreateObservation, formData).then(() => {
        this.isSaving = false
        this.$store.dispatch(ActionNames.ActivateCamera, false)
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
    async createGeoJSON (exif) {
      // const coordinates = this.getGPSCoordinates(exif)
      const coordinates = {}
      if (!(isNaN(coordinates.latitude) && isNaN(coordinates.longitude))) {
        return makeGeoJSONFeature(coordinates.latitude, coordinates.longitude)
      } else {
        const coordinates = await Geolocation.getCurrentPosition(this.options)
        return makeGeoJSONFeature(coordinates.coords.latitude, coordinates.coords.longitude)
      }
    }
  },
  destroyed () {
    CameraPreview.stop()
  }
}
</script>
<style lang="scss">
.overlay {
  position: absolute;
  width: 100vw;
  height: 100vh;
}

.cameraPreview {
  display: flex;
  width: 100%;
  height: 100%;
}

.close-button {
  text-align: center;
  color: white;
  border-radius: 50%;
  font-size: 44px;
  line-height: 55px;
  top: 20px;
  left: 20px;
  position: absolute; /*it can be fixed too*/
  margin: auto;
  z-index:2;
  i {
    text-shadow: 0px 3px 2px rgba(0, 0, 0, 0.4);
  }
}

.text-information {
  position: absolute; /*it can be fixed too*/
  margin: 0 auto;
  bottom: 100px;
  color: white;
  width: 100%;
  text-align: center;
  font-size: 20px;
  text-shadow: 0px 3px 2px rgba(0, 0, 0, 0.4);
}

.shutter-button {
  background-color: #219653;
  border: 4px solid white;
  vertical-align: middle;
  text-align: center;
  color: white;
  font-size: 28px;
  line-height: 55px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  bottom: 20px;
  left: 0px;  right: 0px;
  position: absolute; /*it can be fixed too*/
  margin: auto;
  z-index:2;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)
}
html, body, .ion-app, .ion-content {
  background-color: transparent;
}
</style>
