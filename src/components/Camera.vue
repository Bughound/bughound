<template>
  <input type="file" accept="image/*" class="d-none" capture="environment" />
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

      var reader = new window.FileReader()
      reader.onloadend = function (event) {
        // event.target.result
        // image data
        // note you may need to rotate using EXIF data on a canvas
      }

      // Read the file into memory as dataurl
      var blob = this.$el.files[0]
      reader.readAsDataURL(blob)
    }
  }
}
</script>

<style>

</style>
