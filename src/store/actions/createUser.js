import { RegisterUser } from '@/request/resources'

export default ({ commit }, data) => {
  RegisterUser({
    username: data.username,
    email: data.email,
    password: data.password
  }).then(response => {
    localStorage.setItem('authtoken', response.data.jwt)
    console.log('Well done!')
    console.log('User profile', response.data.user)
    console.log('User token', response.data.jwt)
  }).catch(error => {
    console.log('An error occurred:', error.response)
  })
}
