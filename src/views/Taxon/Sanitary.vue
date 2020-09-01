<template>
  <v-container
    fluid>
    <div class="d-flex justify-space-between mb-2">
      <h4 class="text-h6">Venenosa (Neurotixico)</h4>
      <v-chip
        class="mb-2 white--text"
        color="orange"
        rounded
        small
      >
        MEDIA
      </v-chip>
    </div>
    <v-divider/>
    <h5 class="text-h6 mt-2">SINTOMAS</h5>
    <v-row>
      <v-col cols="auto">
        <ul>
          <li>Escalofríos</li>
          <li>Fiebre</li>
          <li>Náuseas</li>
          <li>Vomitos</li>
        </ul>
      </v-col>
      <v-col cols="auto">
        <ul>
          <li>Agitación</li>
          <li>Dolor de cabeza</li>
          <li>Sudoración</li>
          <li>Presión alta</li>
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
export default {

}
</script>

<style>

</style>
