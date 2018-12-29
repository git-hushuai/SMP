
var api = require('../../../network/ewgApi.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    productDetailModel : {},
    showModal:false,
    userSelectProductAmount:1,
    userSelectSpecArr : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let deviceType = wx.getSystemInfoSync();
    var device = ''
    if (deviceType.model.indexOf('iPhone') >= 0) {
      device = 'IOS'
    } else {
      device = 'ANDROID';
    }
    api.productDetailInfoApi({
      method:'POST',
      data:{
        id: options.productID,
        device: device
      },
      success:(res)=>{
        console.log(res);
        this.setData({ productDetailModel : res.data})
      }
    })
  },
  userAddProductToShopCart:function(e){
    console.log(e);
    console.log(getCurrentPages());
    // 检查用户是否登录
    let token = wx.getStorageSync('accessToken');
    if(token && token.length > 0){
      console.log('加入购物车');
      this.showModelView();
    }else{
      wx.navigateTo({
        url: '../Login/ewgLogin',
      })
    }
  },
// 显示弹框
  showModelView: function () {
    this.setData({
      showModal: true
    })
  },
  // 隐藏弹框View
  hiddenModelAction: function () {
    this.hiddenModelView()
  },
  //   隐藏弹框View
  hiddenModelView: function () {
    this.setData({
      showModal: false
    })
  },
  preventTouchMove:function(){
    return;
  },
  move:function(){
    console.log('user move');
    return;
  },
  // 用户增加或者减少商品数量
  userAddOrReduceProductAmount: function (e) {
    var amount = this.data.userSelectProductAmount
    if (e.currentTarget.dataset.index == 2) {
      // 增加商品数量
      amount = amount + 1;
      this.setData({ userSelectProductAmount: amount })
    } else if (e.currentTarget.dataset.index == 0) {
      // 减少商品数量
      amount = amount - 1 < 0 ? 1 : amount - 1;
      this.setData({ userSelectProductAmount: amount })
    }
  },
  // 加入商品到购物车
  userAddProductToShopCartAction:function(e){
    console.log('加入商品到购物车');
  },
  // 用户选择购买的商品
  userSelectScaleAction:function(e){
    console.log('userSelectScaleAction'+e);
    let dict = e.currentTarget.dataset.model;

    this.data.userSelectSpecArr[e.currentTarget.dataset.specindex] = dict;
    console.log(this.data.userSelectSpecArr);
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
    console.log('刷新界面');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('加载更多');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})