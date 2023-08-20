import request from '@/utils/request.js'

export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

export const userGetInfoService = () => request.get('/my/userinfo')

export const userUpdateInfoService = (data) => request.put('/my/userinfo', data)

export const userUpdateAvatarService = (data) =>
  request.patch('/my/update/avatar', data)

export const userUpdatePwdService = (data) =>
  request.patch('/my/updatepwd', data)
