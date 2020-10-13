<template>
  <v-container>
    <v-row>
      <v-col
        class="mt-8"
        align="center"
        justify="center">
        <v-img
          class="mb-4 mt-8"
          :width="200"
          src="@/assets/images/zones/sanitary.svg"/>
        <span class="text-h4">Urbana</span>
        <p class="mt-4 mb-4">Zonas enfocadas a la detección de especies potencialmente perjudiciales para la salud</p>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col
        align="center"
        justify="center">
        <v-img
          class="mb-4 mt-10"
          :width="200"
          src="@/assets/images/zones/economic.svg"/>
        <span class="text-h4">Rural</span>
        <p class="mt-4">Zonas agrícolas, enfocadas principalmente a la deteccion de plagas que afectan los cultivos</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>
