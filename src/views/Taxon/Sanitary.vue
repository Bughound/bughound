<template>
  <v-container
    fluid>
    <div class="d-flex justify-space-between mb-2">
      <h4 class="text-h6">{{ pathogen.type }} ({{ pathogen.name }})</h4>
      <v-chip
        class="mb-2 white--text"
        :color="importanceColor()"
        rounded
        small
      >
        MEDIA
      </v-chip>
    </div>
    <v-divider/>
    <h5 class="text-h6 mt-2">SINTOMAS</h5>
    <v-row>
      <v-col
        v-for="(chunk, index) in symptoms"
        :key="index"
        cols="auto">
        <ul>
          <li
            v-for="(symptom, index) in chunk"
            :key="index"
            class="text-body-1">
            {{ symptom }}
          </li>
        </ul>
      </v-col>
    </v-row>
    <h5 class="text-h6">RECOMENDACIONES</h5>
    <v-row>
      <v-col>
        <span>Mantenga la calma. Alterarse demasiado o moverse mucho aumentarán la circulación del veneno en la sangre</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        align="center"
        justify="center">
        <v-btn
          color="red lighten-1"
          depressed
          rounded
          large
          dark>
          Buscar ayuda
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { GetPathogen } from '@/request/resources.js'
import { arrayChunk } from '@/helpers/arrays.js'
import importanceColors from './const/importanceColor'

export default {
  props: {
    taxon: {
      type: Object,
      required: true
    },
    importance: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    symptoms () {
      return this.pathogen ? arrayChunk(this.pathogen.symptoms.map(item => item.description).sort(), 4) : []
    }
  },
  data () {
    return {
      pathogen: undefined
    }
  },
  async mounted () {
    if (this.taxon.pathogen) {
      const response = await (GetPathogen(this.taxon.pathogen.id))
      this.pathogen = response.data
    }
  },
  methods: {
    importanceColor () {
      return this.importance.Sanitary ? importanceColors[this.importance.Sanitary] : 'primary'
    }
  }
}
</script>

<style>

</style>
