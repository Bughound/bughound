<template>
  <v-simple-table
    fixed-header
    height="51vh">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Datos
          </th>
          <th class="text-left">
            Valores
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(value, key) in tableData"
          :key="key"
          class="text-capitalize"
        >
          <td>{{ key }}</td>
          <td v-html="value"/>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    observation: {
      type: Object,
      required: true
    }
  },
  computed: {
    geojson () {
      return this.observation.geojson ? {
        latitud: this.observation.geojson.features[0].geometry.coordinates[1],
        longitud: this.observation.geojson.features[0].geometry.coordinates[0]
      } : {}
    },
    weatherData () {
      const weather = this.observation.weather
      return weather ? {
        zona: weather.name,
        temp: `${weather.main.temp} &deg;C`,
        presión: `${weather.main.pressure} hPa`,
        humedad: `${weather.main.humidity}%`
      } : {}
    },
    tableData () {
      const observationDate = new Date(this.observation.date)
      return Object.assign({
        fecha: observationDate.toISOString().slice(0, 10),
        hora: `${observationDate.toISOString().slice(11, 16)}`
      }, this.weatherData, this.geojson)
    }
  }
}
</script>
