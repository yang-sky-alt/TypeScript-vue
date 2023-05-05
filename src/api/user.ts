import base from './base'
import req from './request'

//定义登录参数接口
export interface ILoginParams {
    loginname: string
    password: string
}

/**
 * 登录接口
 * @param params  ILoginParams
 * @returns
 */
export const postLoginApi = (params: ILoginParams) =>
    req.post<any, { token: string; userid: string }>(base.login, params)


/**
 * 获取用户信息
 * @param userid
 * @returns
 */
export const getUserinfoApi = (userid: string) =>
    req.get<any, UserNS.IUserInfo[]>(base.userinfo, { params: { userid } })
// 注册参数接口
export interface IRegistetrParams {
    tel: string
    password: string
}
/**
 * 注册
 * @param params IRegistetrParams
 * @returns
 */
export const postRegisterApi = (params: IRegistetrParams) =>
    req.post<any, string>(base.register, params)