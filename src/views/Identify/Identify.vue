<template>
  <v-container
    fluid
    class="ma-0 pa-0">
    <div class="header-identify primary">
      <v-avatar
        color="white"
        class="species-circle rounded-circle"
        size="280px"
      >
      <v-img
        :src="imageRoute(predictions[0].taxon.image.formats.medium.url)"/>
      </v-avatar>
    </div>
    <v-row class="mt-15 no-gutters">
      <transition name="fade">
      <v-col
        v-if="show"
        align="center">
        <h3 class="text-h5 font-weight-bold primary--text mt-8">IDENTIFICASTE</h3>
        <h4 class="text-h4 font-weight-light font-italic mt-8">{{ predictions[0].taxon.parent.name }} {{ predictions[0].taxon.name }}</h4>
        <h4 class="text-h5 font-weight-light">({{ predictions[0].taxon.common_name }})</h4>
        <span class="text-caption">{{ predictions[0].confidence }}% de coincidencia</span>
      </v-col>
      </transition>
    </v-row>
    <v-row class="mt-15 no-gutters">
      <v-col align="center">
        <v-btn
          v-if="show"
          :to="{ name: 'Taxon', params: { id: predictions[0].taxon.id } }"
          color="primary"
          rounded
          depressed
          large>
          VER ESPECIE
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { GetterNames } from '@/store/getters/getters'
import apiRoute from '@/helpers/apiRoute'

export default {
  computed: {
    predictions () {
      return this.$store.getters[GetterNames.GetPredictions]
    }
  },
  data () {
    return {
      show: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.show = true
    })
  },
  methods: {
    imageRoute: (path) => `${apiRoute}${path}`
  }
}
</script>

<style>

.species-circle {
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  bottom: -25%;
  border: 10px solid white;
}

.header-identify {
  height: 250px;
  position: relative;
}

.fade-enter-active, .fade-leave-active {
  transition: transform 0.5s;
}

.fade-enter {
  transform: scale(0)
}

.fade-leave-to {
  transform: scale(1.5);
}
</style>
