import getUser from './getUser'
import getPredictions from './getPredictions'
import getSettings from './getSettings'

const GetterNames = {
  GetUser: 'getUser',
  GetPredictions: 'getPredictions',
  GetSettings: 'getSettings'
}

const GetterFunctions = {
  [GetterNames.GetUser]: getUser,
  [GetterNames.GetPredictions]: getPredictions,
  [GetterNames.GetSettings]: getSettings
}

export {
  GetterNames,
  GetterFunctions
}
