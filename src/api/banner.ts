import base from './base'
import req from './request'

/**
 * 首页轮播图
 * @returns
 */
export const getBannerListApi = () => req.get<any, BannerNS.IBannerItem[]>(base.banner)
