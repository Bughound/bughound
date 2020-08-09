import ActionNames from './actionNames'
import loadUser from './loadUser'
import loginUser from './loginUser'

const ActionFunctions = {
  [ActionNames.LoadUser]: loadUser,
  [ActionNames.LoginUser]: loginUser
}

export {
  ActionNames,
  ActionFunctions
}
