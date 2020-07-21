<template>
  <v-container class="pa-10">
    <v-row align="center" justify="center">
      <v-img
        class="mb-2"
        position="center"
        center
        height="80px"
        width="80px"
        max-width="80px"
        src="../assets/images/logo.svg"/>
      <span class="text-h3 font-weight-bold color-primary">BugTracker</span>
    </v-row>
    <div class="text-h5 mt-12">Bienvenido</div>
      <span class="subtitle-1">Inicie session para continuar</span>
      <v-form
        class="text-center mt-8"
        xs
        ref="form"
        lazy-validation
      >

      <v-text-field
        v-model="email"
        label="Correo"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Contraseña"
        type="password"
        required
      ></v-text-field>
      <div class="text-right">
        <span class="caption">Olvidó la contraseña?</span>
      </div>

      <v-btn
        class="mt-12 text-center"
        color="success"
        max-width="344"
        rounded
        width="100%"
        large
        depressed
      >
        Iniciar
      </v-btn>
    </v-form>
    <p class="subtitle-1 text-center mt-12">
      Nuevo usuario? <router-link to="/registrarse">Registrate</router-link>
    </p>
  </v-container>
</template>
<script>

export default {
  data () {
    return {
      password: '',
      email: ''
    }
  }
}
</script>
