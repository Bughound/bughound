<template>
  <v-container
    style="height: 80vh; min-height: 80vh">
    <v-row
      class="mt-4 mb-8"
      align="center"
      justify="center">
      <v-col cols="4">
        <v-img :src="zoneTypes[zone.type].image"/>
      </v-col>
      <v-col cols="8">
        <span class="text-h5">Zona de interés</span><br>
        <span class="text-h5 font-weight-bold">{{ zoneTypes[zone.type].label }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="pb-0"
        cols="12">
        <v-text-field
          v-model="zone.name"
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
          v-model="zone.plants"
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
      <v-col class="pt-0">
        <v-checkbox
          v-model="zone.notifications"
          label="Recibir notificaciones"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-col class="pt-0">
        <v-btn
          @click="$emit('next')"
          color="primary"
          rounded
          width="100%"
          large
          depressed
          >
          Continuar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { makeRequest } from '@/helpers/makeRequest'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    zoneTypes: {
      type: Object,
      required: true
    }
  },
  computed: {
    zone: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    isEconomicZone () {
      return this.zone.type === 'economic'
    }
  },
  data () {
    return {
      rules: [v => v.length <= 32 || 'Maximo 32 caracteres'],
      plants: []
    }
  },
  async created () {
    this.plants = (await makeRequest('get', '/plants')).data
  }
}
</script>
