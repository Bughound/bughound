<template>
  <v-container>
    <template v-if="observation">
      <v-img :src="imageRoute(observation.image.formats.medium.url)"></v-img>
    </template>
  </v-container>
</template>

<script>

import { makeRequest } from '@/helpers/makeRequest'
import apiRoute from '@/helpers/apiRoute'

export default {
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
