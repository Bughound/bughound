<template>
  <v-container
    fluid>
    <div class="d-flex justify-space-between mb-2">
      <h4 class="text-h6">Peligrosidad - {{ pathogenType }}</h4>
         <v-chip
            dark
            :color="importanceColor()"
            rounded
            small
          >
            {{ importanceLevel() }}
          </v-chip>
    </div>
    <v-divider/>
    <v-row>
      <v-col
        cols="auto">
        <h4 class="text-h6">{{ pathogen.type }} ({{ pathogen.name }})</h4>
      </v-col>
    </v-row>
    <h5 class="text-h6">Sintomas</h5>
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
    <h5 class="text-h6">Recomendaciones</h5>
    <v-row>
      <v-col>
        <span v-html="pathogen.recomendation"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { GetPathogen } from '@/request/resources.js'
import { arrayChunk } from '@/helpers/arrays.js'
import importanceColors from './const/importanceColor'
import importanceLevel from './const/importanceLevel'

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
      return this.pathogen ? arrayChunk(this.pathogen.symptoms.map(item => item.description).sort(), 6) : []
    },
    pathogenType () {
      return this.pathogen ? this.pathogen.type === 'Enfermedad' ? 'Vector' : 'Toxica' : ''
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
    },
    importanceLevel () {
      return importanceLevel[this.importance.Sanitary].toUpperCase()
    }
  }
}
</script>

<style>

</style>
