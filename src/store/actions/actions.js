import ActionNames from './actionNames'
import loadUser from './loadUser'
import loginUser from './loginUser'
import logout from './logout'

const ActionFunctions = {
  [ActionNames.LoadUser]: loadUser,
  [ActionNames.LoginUser]: loginUser,
  [ActionNames.Logout]: logout
}

export {
  ActionNames,
  ActionFunctions
}
