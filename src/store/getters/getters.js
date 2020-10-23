import getUser from './getUser'
import getPredictions from './getPredictions'
import getSettings from './getSettings'
import getZones from './getZones'

const GetterNames = {
  GetUser: 'getUser',
  GetPredictions: 'getPredictions',
  GetSettings: 'getSettings',
  GetZones: 'getZones'
}

const GetterFunctions = {
  [GetterNames.GetUser]: getUser,
  [GetterNames.GetPredictions]: getPredictions,
  [GetterNames.GetSettings]: getSettings,
  [GetterNames.GetZones]: getZones
}

export {
  GetterNames,
  GetterFunctions
}
