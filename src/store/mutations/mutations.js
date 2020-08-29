import setUser from './setUser'
import setPredictions from './setPredictions'
import setSettings from './setSettings'

const MutationNames = {
  SetUser: 'setUser',
  SetPredictions: 'setPredictions',
  SetSettings: 'setSettings'
}

const MutationFunctions = {
  [MutationNames.SetUser]: setUser,
  [MutationNames.SetPredictions]: setPredictions,
  [MutationNames.SetSettings]: setSettings
}

export {
  MutationNames,
  MutationFunctions
}
