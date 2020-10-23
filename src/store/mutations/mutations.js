import addZone from './addZone'
import setUser from './setUser'
import setPredictions from './setPredictions'
import setSettings from './setSettings'
import setZones from './setZones'

const MutationNames = {
  AddZone: 'addZone',
  SetUser: 'setUser',
  SetPredictions: 'setPredictions',
  SetSettings: 'setSettings',
  SetZones: 'setZones'
}

const MutationFunctions = {
  [MutationNames.AddZone]: addZone,
  [MutationNames.SetUser]: setUser,
  [MutationNames.SetPredictions]: setPredictions,
  [MutationNames.SetSettings]: setSettings,
  [MutationNames.SetZones]: setZones
}

export {
  MutationNames,
  MutationFunctions
}
