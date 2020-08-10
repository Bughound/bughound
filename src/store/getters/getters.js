import getUser from './getUser'
import getPredictions from './getPredictions'

const GetterNames = {
  GetUser: 'getUser',
  GetPredictions: 'getPredictions'
}

const GetterFunctions = {
  [GetterNames.GetUser]: getUser,
  [GetterNames.GetPredictions]: getPredictions
}

export {
  GetterNames,
  GetterFunctions
}
