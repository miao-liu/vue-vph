/* eslint-disable */

const USER_LOGIN = '/api/user/login'//用户登录
const USER_REGISTER = '/api/user/reg'//用户注册
const USER_DEL = '/api/user/del'//用户注销

const INDEX_NAVS = '/api/index/navs'//首页导航数据
const INDEX_BG = '/api/index/bg'//首页不同板块的背景图片
const INDEX_RECOMMENDS = '/api/index/recommends'//首页推荐产品【第一板块】
const INDEX_SELECTION_TYPES = '/api/index/selection_types'//精选好货类别
const INDEX_SELECTION_ITEMS = '/api/index/selection_items'//精选好货产品
const INDEX_TODAY_ITEMS = '/api/index/today_items'//今日特卖产品
const INDEX_TODAY_TYPES = '/api/index/today_types'//今日特卖推荐栏目

const TYPES_ALL = '/api/types/all'//分类页所有一级栏目
const TYPES_ITEMS = '/api/types/items'//分类页面三级栏目


const TYPES_HOTS = '/api/types/hots'//搜索页面：热门搜索

const PRODUCTS_ITEM = '/api/products/type'//产品列表页面，指定类别显示

const ADDRESS_MAP = '/api/addr/data'//省市区街联动菜单数据
const ADDRESS_ADD = '/api/addr'//新增收货地址
const ADDRESS_LIST = '/api/addr/list'//地址列表
const ADDRESS_DEL = '/api/addr/del'//删除地址

const DETAIL =  '/api/detail'
const CART = '/api/cart'
export {
  USER_LOGIN,
  USER_REGISTER,
  USER_DEL,
  INDEX_NAVS,
  INDEX_BG,
  INDEX_RECOMMENDS,
  INDEX_SELECTION_TYPES,
  INDEX_SELECTION_ITEMS,
  INDEX_TODAY_ITEMS,
  INDEX_TODAY_TYPES,
  TYPES_ALL,
  TYPES_ITEMS,
  TYPES_HOTS,
  PRODUCTS_ITEM,
  ADDRESS_MAP,
  ADDRESS_ADD,
  ADDRESS_LIST,
  ADDRESS_DEL,
  DETAIL,
  CART
}
