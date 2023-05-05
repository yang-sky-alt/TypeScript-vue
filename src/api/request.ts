// axios 二次封装
import axios from 'axios'
import base from './base'
import useUserStore from '@/stores/user'
import { showNotify } from 'vant'
const req = axios.create({
  baseURL: base.host,
  timeout: 5000
})

// 请求拦截
req.interceptors.request.use(
  (config) => {
    // 现用现取原则
    const userStore = useUserStore()
    // 传递token
    config.headers.token = userStore.token
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截
req.interceptors.response.use(
  (res) => {
    // 判断
    const isSuccess = res.data.code === '200'
    // 10019  token无效
    const isTokenExpired = res.data.code === '10019'
    // {code: '10010', message: '该用户不存在'}
    const isUserNotExist = res.data.code === '10010'
    // {code: '10011', message: '密码错误'}
    const isPwdError = res.data.code === '10011'
    const isRegister = isSuccess && res.data.message === '注册成功'
    if (isRegister) return '注册成功'

    if (isTokenExpired || isUserNotExist || isPwdError) {
      showNotify({ type: 'danger', message: res.data.message })
    }

    if (isSuccess) {
      return res.data.data
    }
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 导出
export default req
