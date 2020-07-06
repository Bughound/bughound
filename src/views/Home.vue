<template>
  <div style="height: 100%;">
    <map-component/>
  </div>
</template>

<script>
// @ is an alias to /src

import MapComponent from '@/components/Map.vue'
export default {
  name: 'Home',
  components: {
    MapComponent
  }
}
</script>
