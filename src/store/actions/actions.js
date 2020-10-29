import ActionNames from './actionNames'
import activateCamera from './activateCamera'
import createObservation from './createObservation'
import createZone from './createZone'
import loadZones from './loadZones'
import loadUser from './loadUser'
import loginUser from './loginUser'
import logout from './logout'
import updateZone from './updateZone'

const ActionFunctions = {
  [ActionNames.ActivateCamera]: activateCamera,
  [ActionNames.CreateObservation]: createObservation,
  [ActionNames.CreateZone]: createZone,
  [ActionNames.LoadUser]: loadUser,
  [ActionNames.LoadZones]: loadZones,
  [ActionNames.LoginUser]: loginUser,
  [ActionNames.Logout]: logout,
  [ActionNames.UpdateZone]: updateZone
}

export {
  ActionNames,
  ActionFunctions
}
