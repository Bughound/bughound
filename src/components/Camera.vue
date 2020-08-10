<template>
  <input
    type="file"
    accept="image/*"
    capture="environment"
    class="d-none"
    @change="onInputPhotoChange"/>
</template>

<script>
export default {
  methods: {
    openCamera () {
      this.$el.click()
    },
    onInputPhotoChange () {
      if (this.$el.files.length === 0) {
        return
      }
      this.$emit('onPicture', this.$el.files[0])
    }
  }
}
</script>

<style>

</style>
