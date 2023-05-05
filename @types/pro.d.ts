// 商品对象
declare namespace GoodsNS {
  interface IGoodsItem {
    readonly proid: string
    banners: string[]
    category: string
    brand: string
    proname: string
    originprice: number
    desc: string
    discount: number
    img1: string
  }
}
