<template>
  <div>
    <camara-component
      ref="camera"
      @onPicture="createObservation"/>
  </div>
</template>

<script>

import CamaraComponent from '@/components/Camera.vue'
import { makeRequest } from '@/helpers/makeRequest'

export default {
  components: {
    CamaraComponent
  },
  data () {
    return {
      cameraPermission: false
    }
  },
  mounted () {
    this.$refs.camera.openCamera()
  },
  methods: {
    createObservation (cameraImage) {
      const formData = new FormData()
      const data = {
        taxon: 1,
        count: 1,
        date: new Date()
      }

      formData.append('taxon', 1)
      formData.append('files.image', cameraImage, cameraImage.name)
      formData.append('data', JSON.stringify(data))

      makeRequest('post', '/observations', formData)
    }
  }
}
</script>
