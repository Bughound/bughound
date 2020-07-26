<template>
    <div v-if="observation">
      <v-img :src="imageRoute(observation.image.formats.medium.url)"></v-img>
      <v-alert
        class="mb-0"
        text
        prominent
        type="error"
        icon="mdi-alert"
      >
      Especie de gran peligrosidad, afecta gran parte de los cultivos
    </v-alert>
    <map-component
      height="300px"
      :geojson="[observation.geojson]"
      :zoom-animation="false"
      :max-zoom="12"/>
    </div>
</template>

<script>

import { makeRequest } from '@/helpers/makeRequest'
import apiRoute from '@/helpers/apiRoute'
import MapComponent from '../components/Map.vue'

export default {
  components: {
    MapComponent
  },
  data () {
    return {
      isLoading: false,
      observation: undefined
    }
  },
  mounted () {
    makeRequest('get', `/observations/${this.$route.params.id}`).then(response => {
      this.observation = response.data
      this.isLoading = false
    })
  },
  methods: {
    imageRoute: (path) => `${apiRoute}${path}`
  }
}
</script>
