import Vue from 'vue'
export default (state, zone) => {
  const index = state.zones.findIndex(z => z.id === zone.id)
  if (index >= 0) {
    Vue.set(state.zones, index, zone)
  } else {
    state.zones.push(zone)
  }
}
