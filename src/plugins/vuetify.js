import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa'
  },
  theme: {
    themes: {
      light: {
        primary: '#219653', // #E53935
        secondary: colors.green.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
        background: colors.grey.lighten5
      }
    }
  }
})
