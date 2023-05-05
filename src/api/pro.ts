// 商品

import base from './base'
import req from './request'

// 定义商品列表请求参数 接口
export interface IPageParams {
  count: number
  limitNum?: number
}

/**
 * 获取商品列表
 * @param params   IPageParams
 * @returns   GoodsNS.IGoodsItem[]
 */
export const getProListApi = (params: IPageParams) =>
  req.get<any, GoodsNS.IGoodsItem[]>(base.proList, { params })

/**
 * 获取商品详情
 * @param proid  string
 * @returns   GoodsNS.IGoodsItem
 */
export const getProDetailApi = (proid: string) =>
  req.get<any, GoodsNS.IGoodsItem>(`${base.proDetail}/${proid}`)
