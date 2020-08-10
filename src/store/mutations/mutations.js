import setUser from './setUser'
import setPredictions from './setPredictions'

const MutationNames = {
  SetUser: 'setUser',
  SetPredictions: 'setPredictions'
}

const MutationFunctions = {
  [MutationNames.SetUser]: setUser,
  [MutationNames.SetPredictions]: setPredictions
}

export {
  MutationNames,
  MutationFunctions
}
