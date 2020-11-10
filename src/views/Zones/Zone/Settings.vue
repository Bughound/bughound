<template>
  <v-container class="pl-6 pr-8">
    <v-row>
      <v-col
        class="pb-0"
        cols="12">
        <v-text-field
          v-model="zoneEdit.name"
          :rules="rules"
          counter="25"
          hint="Escriba un nombre para la zona"
          label="Nombre"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isEconomicZone">
      <v-col
        class="pb-0"
        cols="12">
        <v-autocomplete
          v-model="zoneEdit.plants"
          :items="plants"
          item-text="name"
          item-value="id"
          color="primary"
          chips
          clearable
          deletable-chips
          multiple
          label="Cultivo"
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pt-12">
        <v-slider
          v-model="zoneEdit.distance"
          color="blue"
          thumb-color="blue"
          thumb-label="always"
          track-color="primary"
          persistent-hint
          label="Distancia (km)"
          max="100"
          min="1"
        ></v-slider>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pt-0">
        <v-checkbox
          v-model="zoneEdit.notifications"
          label="Recibir notificaciones"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-col class="pt-0">
        <v-btn
          @click="updateZone"
          color="primary"
          rounded
          width="100%"
          :disabled="!zoneEdit.name"
          large
          depressed
          >
          Guardar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { makeRequest } from '@/helpers/makeRequest.js'
import { ActionNames } from '@/store/actions/actions'

export default {
  props: {
    observations: {
      type: Array,
      required: true
    },
    zone: {
      type: Object,
      required: true
    }
  },
  computed: {
    isEconomicZone () {
      return this.zone.type === 'economic'
    }
  },
  data () {
    return {
      zoneEdit: {
        name: this.zone.name,
        distance: this.zone.distance,
        plants: this.zone.plants,
        notifications: this.zone.notifications
      },
      rules: [v => v.length <= 32 || 'Maximo 32 caracteres'],
      plants: []
    }
  },
  async created () {
    this.plants = (await makeRequest('get', '/plants')).data
  },
  methods: {
    updateZone () {
      this.$store.dispatch(ActionNames.UpdateZone, { id: this.zone.id, zone: this.zoneEdit }).then((response) => {
        this.$emit('onUpdate', response)
      })
    }
  }
}
</script>
