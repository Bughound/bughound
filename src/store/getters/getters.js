import getUser from './getUser'

const GetterNames = {
  GetUser: 'getUser'
}

const GetterFunctions = {
  [GetterNames.GetUser]: getUser
}

export {
  GetterNames,
  GetterFunctions
}
