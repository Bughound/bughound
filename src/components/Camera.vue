<template>
  <input
    type="file"
    accept="image/*"
    capture="environment"
    class="d-none"
    @change="onInputPhotoChange"/>
</template>

<script>

import EXIF from 'exif-js'

export default {
  methods: {
    openCamera () {
      this.$el.click()
    },
    onInputPhotoChange () {
      if (this.$el.files.length === 0) {
        return
      }

      EXIF.getData(this.$el.files[0], () => {
        var allMetaData = EXIF.getAllTags(this.$el.files[0])
        this.$emit('onPicture', {
          image: this.$el.files[0],
          exif: allMetaData
        })
      })
    }
  }
}
</script>

<style>

</style>
