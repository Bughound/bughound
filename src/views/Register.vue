<template>
  <div>
    <video
      autoplay
      loop
      muted
      width="100%">
      <source src="../assets/videos/login.mp4" type="video/mp4">
    </video>
    <v-container
      class="pa-8">
      <!--
      <v-row align="center">
        <v-col
          class="pt-0 pb-0"
          align="center">
            <v-img
              position="center"
              class="mb-8"
              center
              height="120px"
              width="120px"
              src="../assets/images/logo.svg"/>
        </v-col>
      </v-row>
      -->
      <h4 class="text-h4 bold">Registrese</h4>
        <v-form
          class="text-center mt-8"
          xs
          ref="form"
          lazy-validation
        >
        <v-row>
          <v-col class="pt-0 pb-0">
            <v-text-field
            v-model="user.last_name"
            label="Nombre"
            required
          ></v-text-field>
          </v-col>

          <v-col class="pt-0 pb-0">
            <v-text-field
            v-model="user.first_name"
            label="Apellido"
            required
          ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-0 pb-0">
            <v-text-field
              v-model="user.identifier"
              label="Correo"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-0">
            <v-text-field
              v-model="user.password"
              label="Contraseña"
              :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="hidePassword ? 'password' : 'text'"
              @click:append="() => (hidePassword = !hidePassword)"
              @keydown.enter="login"
              required
            ></v-text-field>
          </v-col>
        </v-row>

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
          Registrarse
        </v-btn>
      </v-form>
    </v-container>
  </div>
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
        name: '',
        last_name: '',
        password: '',
        email: ''
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
