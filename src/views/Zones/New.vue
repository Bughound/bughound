<template>
  <v-container
    class="map-container pa-0">
    <v-stepper
      class="elevation-0 pa-0"
      :value="step">
      <v-stepper-header class="elevation-0">
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="step > n"
            :step="n"
          >
            Paso {{ n }}
          </v-stepper-step>

          <v-divider
            v-if="n !== steps"
            :key="n"
          ></v-divider>
        </template>
      </v-stepper-header>
      <v-divider></v-divider>
      <v-stepper-items class="pa-0">

        <v-stepper-content
          class="pt-2"
          step="1">
          <zone-type
            v-model="zone"
            :zone-types="zoneType"
            @onSelect="step++"/>
        </v-stepper-content>

        <v-stepper-content
          class="pt-0"
          step="2">
          <zone-data
            v-if="step === 2"
            :zone-types="zoneType"
            @next="step++"
            v-model="zone"/>
        </v-stepper-content>

        <v-stepper-content
          class="pa-0 pt-0"
          step="3">
          <zone-map
            v-if="step === 3"
            v-model="zone"
            @onAccept="createZone"/>
        </v-stepper-content>

      </v-stepper-items>
    </v-stepper>

    <v-dialog
      color="white"
      v-model="isSaving"
      fullscreen
      hide-overlay>
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
            <h3 class="text-h4 mt-15 font-weight-light">Creando zona</h3>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </v-container>
</template>

<script>

import ZoneData from './New/ZoneData'
import ZoneMap from './New/ZoneMap'
import ZoneType from './New/ZoneType'
import SanitaryImage from '@/assets/images/zones/sanitary.svg'
import EconomicImage from '@/assets/images/zones/economic.svg'

import { ActionNames } from '@/store/actions/actions'

export default {
  components: {
    ZoneData,
    ZoneMap,
    ZoneType
  },
  data () {
    return {
      step: 1,
      steps: 3,
      isSaving: false,
      zone: {
        name: '',
        type: undefined,
        geojson: undefined,
        notifications: true,
        plants: []
      },
      zoneType: {
        sanitary: {
          label: 'Urbana',
          description: 'Zonas enfocadas a la detección de especies potencialmente perjudiciales para la salud',
          image: SanitaryImage
        },
        economic: {
          label: 'Rural',
          description: 'Zonas agrícolas, enfocadas principalmente a la deteccion de plagas que afectan los cultivos',
          image: EconomicImage
        }
      }
    }
  },
  methods: {
    setZone (value) {
      this.zone.type = value
      this.step++
    },
    nextStep () {
      this.step++
    },
    createZone () {
      this.step = 0
      this.isSaving = true
      this.$store.dispatch(ActionNames.CreateZone, this.zone).then((zoneCreated) => {
        this.isSaving = false
        this.$router.push({ name: 'Zona', params: { id: zoneCreated.id } })
      })
    }
  }
}
</script>
