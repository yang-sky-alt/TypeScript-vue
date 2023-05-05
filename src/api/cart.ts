// 购物车

import base from './base'
import req from './request'

/**
 * 获取购物车列表 post
 * @param userid string
 * @returns
 */
export const postCartListApi = (userid: string) =>
    req.post<any, CartNS.ICartItem[]>(base.cartList, { userid })

// 定义加入购物车商品参数接口
interface IAddCartItem {
    userid: string
    proid: string
    num: number
}
/**
 * 加入购物车 post
 * @param params IAddCartItem
 * @returns
 */
export const postAddCartApi = (params: IAddCartItem) => req.post<any, null>(base.addCart, params)

// 定义更新购物车数量参数 接口
interface IUpdateCartNum {
    cartid: string
    num: number
}
/**
 * 更新购物车数量
 * @param params IUpdateCartNum
 * @returns
 */
export const postUpdateCartNumApi = (params: IUpdateCartNum) =>
    req.post<any, null>(base.updateCartNum, params)

/**
 *  删除购物车单条数据
 * @param cartid
 * @returns
 */
export const postRemoveCartItemApi = (cartid: string) =>
    req.post<any, null>(base.removeCartItem, { cartid })

// 定义更新商品选中状态 参数 接口
interface IUpdateSelectCartItem {
    cartid: string
    flag: boolean
}
/**
 * 更新商品选中状态
 * @param params IUpdateSelectCartItem
 * @returns
 */
export const postUpdateSelectCartApi = (params: IUpdateSelectCartItem) =>
    req.post<any, null>(base.updateSelectCartItem, params)

// 定义 全选或全不选 参数 接口
interface IUpdateSelectAll {
    userid: string
    type: boolean
}
/**
 * 全选或全不选
 * @param params
 * @returns
 */
export const postSelectAllApi = (params: IUpdateSelectAll) =>
    req.post<any, null>(base.selectAll, params)
