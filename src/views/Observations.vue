<template>
  <v-list
    subheader
    three-line>
    <v-subheader>Observaciones</v-subheader>
    <template v-for="(item, index) in observations">
      <v-subheader
        v-if="item.header"
        :key="item.header"
        v-text="item.header"
      ></v-subheader>

      <v-divider
        v-else-if="item.divider"
        :key="index"
        :inset="item.inset"
      ></v-divider>

      <v-list-item
        v-else
        :key="item.title"
      >
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="composeScientificName(item.taxon)"></v-list-item-title>
          <v-list-item-subtitle v-html="item.date"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider
        :key="index"
      ></v-divider>
    </template>
  </v-list>
</template>

<script>
export default {
  data () {
    return {
      observations: [
        {
          taxon: {
            name: 'elongatus',
            rank: 'Especie',
            parent: {
              name: 'Dichroplus'
            }
          },
          importance: {
            type: 'Economica',
            level: 5
          },
          date: '02/07/2020'
        },
        {
          taxon: {
            name: 'alienus',
            importance: {
              type: 'Economica',
              level: 5
            },
            rank: 'Especie',
            parent: {
              name: 'Jivarus'
            }
          },
          date: '13/02/2020'
        }
      ]
    }
  },
  methods: {
    composeScientificName (taxon) {
      return `${taxon.parent.name} ${taxon.name}`
    }
  }
}
</script>
