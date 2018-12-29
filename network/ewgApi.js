
const EWG_DomainUserCenter = "https://member-api.ewgvip.com";
const EWG_Domain = "https://mall-api.ewgvip.com"
const EWF_DomainPayCenter = "https://paycenter-api.ewgvip.com";

const wxRequest = (params, url) => {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  });
  wx.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: params.method === "GET" ? {
      'Content-Type': 'application/json',
      'access_token': wx.getStorageSync('accessToken')
    } : {
      'Content-Type' : 'application/x-www-form-urlencoded',
        'access_token': wx.getStorageSync('accessToken')
        },
    success: (res) => {
      params.success && params.success(res)
      wx.hideToast()
    },
    fail: (res) => {
      params.fail && params.fail(res)
    },
    complete: (res) => {
      params.complete && params.complete(res)
    }
  })
}
// 首页
const homeContentApi = (params) => wxRequest(params, EWG_Domain + '/system/home/get-home-page-information.html');

// 活动商品配置详情
const homeSubjectContentApi = (params) => wxRequest(params, EWG_Domain + '/system/home/get-subject-page-information.html');

// 活动商品列表 
const homeSubjectProductListApi = (params) => wxRequest(params, EWG_Domain + '/productCenter/goods/list.html');

// 商品详情
const productDetailInfoApi = (params) => wxRequest(params, EWG_Domain + '/productCenter/goods/detail.html');

// 商品分类
const productCateListApi = (params) => wxRequest(params, EWG_Domain + '/system/category/list.html');

// 用户登录
const userLoginApi = (params) => wxRequest(params, EWG_DomainUserCenter + '/sso/login.html');

module.exports = {
  homeContentApi,
  homeSubjectContentApi,
  homeSubjectProductListApi,
  productDetailInfoApi,
  productCateListApi,
  userLoginApi,
}