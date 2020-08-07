<template>
  <div>
    <p v-html="taxon.description"/>
  </div>
</template>

<script>
export default {
  props: {
    taxon: {
      type: Object
    }
  }
}
</script>

<style>

</style>
