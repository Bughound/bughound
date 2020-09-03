<template>
  <v-container
    class="p-fixed"
    background="white"
    fluid
    fill-height>
    <v-row>
      <v-col
        align="center"
        justify="center">
        <v-img
          class="mt-10"
          :max-width="344"
          :height="344"
          :src="image"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        align="center"
        justify="center">
        <h4
          class="text-h4"
          v-html="title"/>
        <p
          class="text-body-1 mt-4"
          v-html="text"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        align="center"
        justify="center">
        <v-btn
          @click="accept"
          color="primary"
          max-width="344"
          rounded
          width="100%"
          large
          depressed>
          Entendido
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: '@/assets/images/identify/economic.svg'
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    accept () {
      this.$emit('accept', true)
    }
  }
}
</script>

<style>

</style>
