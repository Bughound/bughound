<template>
  <v-container
    :fluid="true"
    style="background-color: white; height: 100%"
    class="pa-8">
    <v-row align="center">
      <v-img
        position="center"
        center
        height="100px"
        width="66px"
        max-width="66px"
        src="../assets/images/logo rect.svg"/>
      PlagueFinder
    </v-row>
    <h3 class="text-h4 mt-10 bold">Bienvenido!</h3>
      <span class="subtitle-1">Inicie session para continuar</span>
      <v-form
        class="text-center mt-8"
        xs
        ref="form"
        lazy-validation
      >

      <v-text-field
        v-model="user.identifier"
        label="Correo"
        required
        append-icon="mdi-account"
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        label="Contraseña"
        :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="hidePassword ? 'password' : 'text'"
        @click:append="() => (hidePassword = !hidePassword)"
        @keydown.enter="login"
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
        @click="login"
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

import { ActionNames } from '@/store/actions/actions'

export default {
  computed: {
    validateFields () {
      return this.user.password.length && this.user.identifier.length
    }
  },
  data () {
    return {
      user: {
        password: '',
        identifier: ''
      },
      hidePassword: true
    }
  },
  methods: {
    login () {
      if (this.validateFields) {
        this.$store.dispatch(ActionNames.LoginUser, this.user).then(() => {
          this.$router.push({ name: 'Index' })
        })
      }
    }
  }
}
</script>
