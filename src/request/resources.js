import { makeRequest } from '@/helpers/makeRequest.js'

const CreateObservation = (data) => makeRequest('post', '/observations', data)

const GetPathogen = (id) => makeRequest('get', `/pathogens/${id}`)

const GetUser = () => makeRequest('get', '/users/me')

const RegisterUser = (data) => makeRequest('post', '/auth/local/register', data)

const LoginUser = (data) => makeRequest('post', '/auth/local', data)

export {
  CreateObservation,
  GetPathogen,
  GetUser,
  RegisterUser,
  LoginUser
}
