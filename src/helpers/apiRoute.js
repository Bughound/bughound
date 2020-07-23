import { apiRequest } from '@/config.js'

export default `${apiRequest.protocol}://${apiRequest.host}:${apiRequest.port}`
