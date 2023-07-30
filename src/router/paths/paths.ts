const ROOT_PATH = '/'
const LOGIN_PATH = '/login'
const REGISTER_PATH = '/register'
const METRICS_PATH = '/metrics'
const USERS_PATH = '/users'
const USER_PATH = '/users/:id'

const paths = {
  ROOT_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  METRICS_PATH,
  USERS_PATH,
  USER_PATH
} as const

export default paths
