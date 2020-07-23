<template>
  <div>
    <span v-if="!cameraPermission">Para poder tomar fotos de sus observaciones necesitamos que autorice la utilización de la camara</span>
    <camera-component @onPicture="createObservation"/>
  </div>
</template>

<script>

import CamaraComponent from '@/components/Camera.vue'
import makeRequest from '@/helpers/makeRequest'

export default {
  components: {
    CameraComponent
  },
  data () {
    return {
      cameraPermission: false
    }
  },
  created () {
    navigator.permissions.query({ name: 'camera' }).then(result => {
      this.cameraPermission = result.status === 'granted'
    })
  },
  methods: {
    createObservation () {
      const data = {
        time: new Date().toLocaleString()
      }
      makeRequest('post', '/specimen', data)
    }
  }
}
</script>
