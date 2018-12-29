
var api = require('../../../network/ewgApi.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateGory : ['商品分类','品牌墙','兴农扶贫'],
    cateIndex : 1,
    cateBottomLeftMargin: '0vw',
    categoryMode : {},
    subCateIndex : 0,  // 商品分类、品牌墙、兴农扶贫
    ssubCateIndex : 0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.productCateListApi();
  },
  // 拉取用户商品分类列表
  productCateListApi:function(e){
    var device = ''
    let deviceType = wx.getSystemInfoSync();
    if (deviceType.model.indexOf('iPhone') >= 0) {
      device = 'IOS'
    } else {
      device = 'ANDROID';
    }
    api.productCateListApi({
      method:'POST',
      data:{device:device},
      success:(res)=>{
        console.log(res);
        if(res.data.code == 0){
          this.setData({ categoryMode: res.data.list })
        } 
      }
    });
  },
  // 用户切换主分类
  userChangeCateAction:function(e){
      console.log(e);
      this.setData({
        cateBottomLeftMargin: e.currentTarget.dataset.index * 33.3 +'vw',
        subCateIndex: e.currentTarget.dataset.index, ssubCateIndex:0})
  },
// 用户切换左边子分类
  userChangeSubCateIndex:function(e){
      this.setData({
        ssubCateIndex : e.currentTarget.dataset.index
      });
  },
// 用户查看分类全部商品
  usercheckSubAllProductAction:function(e){
    console.log(e);
    let str = '_ewg_' + 'product' + '_ewg_' + e.currentTarget.dataset.model.id +'_ewg_';
    wx.navigateTo({
      url: '../productList/productList?subjectID=' + str + '&navigationTitle=' + e.currentTarget.dataset.model.cate_name.CN,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})