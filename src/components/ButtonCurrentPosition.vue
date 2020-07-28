<template>
  <v-btn
    @click="pointMe()"
    color="primary"
    style="bottom: 80px"
    dark
    fixed
    bottom
    right
    fab
   >
    <v-icon>mdi-crosshairs-gps</v-icon>
  </v-btn>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    pointMe () {
      if (!('geolocation' in navigator)) {
        console.log('Geolocation is not available.')
      } else {
        console.log('Available')
      }
      console.log('entra')
      navigator.geolocation.getCurrentPosition(pos => {
        alert(pos.coords.latitude)
      }, error => {
        console.log(error)
        // alert(JSON.stringify(error))
      })
    }
  }
}
</script>

<style>

</style>