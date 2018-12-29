var api = require('../../../network/ewgApi.js')
var userInfo = require('../../../utils/userDetailInfo.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BannerList: [],
    isSecurityType : true,
    securityImgSource: '../../../source/image/ic_pwd_hide.png',
    noSecurityImgSource: '../../../source/image/ic_pwd_show.png',
    userPwd : '',
    userAccount : '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 用户改变密码输入方式
  userChangePwdSecurityType:function(e){
    this.setData({
      isSecurityType: !this.data.isSecurityType
    })
  },
  // 用户输入密码
  userInputPwdAction:function(e){
    this.setData({
      userPwd : e.detail.value
    })
  },
  // 用户输入账号
  userInputAccount:function(e){
    this.setData({
      userAccount : e.detail.value
    })
  },
  // 登录
  userLoginAction:function(e){
    console.log('account :' + this.data.userAccount + 'pwd' + this.data.userPwd);
    let deviceType = wx.getSystemInfoSync();
    var device = ''
    if (deviceType.model.indexOf('iPhone') >= 0) {
      device = 'IOS'
    } else {
      device = 'ANDROID';
    }
    api.userLoginApi({
      method:'POST',
      data: { 
        device: device,
        password: this.data.userPwd,
        username : this.data.userAccount
      },
      success:(res)=>{
        console.log(res);
        if(res.data.code == 0){
          // 登录成功
          // 更新缓存数据
          userInfo.syncSaveUserInfo(res.data);
          wx.navigateBack({
          })
        }
      }
    });
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