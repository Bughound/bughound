import getUser from './getUser'
import getPredictions from './getPredictions'
import getSettings from './getSettings'
import getZoneById from './getZoneById'
import getZones from './getZones'

const GetterNames = {
  GetUser: 'getUser',
  GetPredictions: 'getPredictions',
  GetSettings: 'getSettings',
  GetZoneById: 'getZoneById',
  GetZones: 'getZones'
}

const GetterFunctions = {
  [GetterNames.GetUser]: getUser,
  [GetterNames.GetPredictions]: getPredictions,
  [GetterNames.GetSettings]: getSettings,
  [GetterNames.GetZoneById]: getZoneById,
  [GetterNames.GetZones]: getZones
}

export {
  GetterNames,
  GetterFunctions
}
