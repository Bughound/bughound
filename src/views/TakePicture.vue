<template>
  <div>
    <span v-if="!cameraPermission">Para poder tomar fotos de sus observaciones necesitamos que autorice la utilización de la camara</span>
  </div>
</template>

<script>

import CamaraComponent from '@/components/Camera.vue'

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
  }
}
</script>
