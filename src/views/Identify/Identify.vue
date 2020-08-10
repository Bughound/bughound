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
        src="@/assets/images/elongatus.jpg"/>
      </v-avatar>
    </div>
    <v-row class="mt-15 no-gutters">
      <v-col align="center">
        <h3 class="text-h5 font-weight-bold primary--text mt-8">IDENTIFICASTE</h3>
        <h4 class="text-h4 font-weight-light font-italic mt-8">Dichroplus elongatus</h4>
        <h4 class="text-h5 font-weight-light">(Tucura)</h4>
        <span class="text-caption">98% de coincidencia</span>
      </v-col>
    </v-row>
    <v-row class="mt-15 no-gutters">
      <v-col align="center">
        <v-btn
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
export default {

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
</style>
