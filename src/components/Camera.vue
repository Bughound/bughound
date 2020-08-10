<template>
  <input
    type="file"
    accept="image/*"
    capture="environment"
    @change="onInputPhotoChange"/>
</template>

<script>
export default {
  methods: {
    openCamera () {
      this.$el.click()
    },
    onInputPhotoChange () {
      const that = this

      if (this.$el.files.length === 0) {
        return
      }

      var reader = new window.FileReader()
      reader.onloadend = function (event) {
        // that.$emit('onPicture', event.target.result)
      }

      // Read the file into memory as dataurl
      var blob = this.$el.files[0]
      that.$emit('onPicture', this.$el.files[0])
      reader.readAsDataURL(blob)
    }
  }
}
</script>

<style>

</style>
