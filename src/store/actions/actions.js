import ActionNames from './actionNames'
import activateCamera from './activateCamera'
import createObservation from './createObservation'
import createZone from './createZone'
import loadUser from './loadUser'
import loginUser from './loginUser'
import logout from './logout'

const ActionFunctions = {
  [ActionNames.ActivateCamera]: activateCamera,
  [ActionNames.CreateObservation]: createObservation,
  [ActionNames.CreateZone]: createZone,
  [ActionNames.LoadUser]: loadUser,
  [ActionNames.LoginUser]: loginUser,
  [ActionNames.Logout]: logout
}

export {
  ActionNames,
  ActionFunctions
}
