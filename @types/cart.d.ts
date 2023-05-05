// 购物车
declare namespace CartNS {
    interface ICartItem {
        readonly cartid: string
        readonly userid: string
        discount: number
        flag: boolean
        img1: string
        num: number
        originprice: number
        proid: string
        proname: string
    }
}
