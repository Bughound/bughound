import ActionNames from './actionNames'
import createObservation from './createObservation'
import loadUser from './loadUser'
import loginUser from './loginUser'
import logout from './logout'

const ActionFunctions = {
  [ActionNames.CreateObservation]: createObservation,
  [ActionNames.LoadUser]: loadUser,
  [ActionNames.LoginUser]: loginUser,
  [ActionNames.Logout]: logout
}

export {
  ActionNames,
  ActionFunctions
}
