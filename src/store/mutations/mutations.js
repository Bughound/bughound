import setUser from './setUser'

const MutationNames = {
  SetUser: 'setUser'
}

const MutationFunctions = {
  [MutationNames.SetUser]: setUser
}

export {
  MutationNames,
  MutationFunctions
}
