//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.checkUserAuthorization();
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
// 检查用户是否授权
  checkUserAuthorization(url){

    let that = this;
    this.globalData.unionId = wx.getStorageSync("unionId") || '';
    this.globalData.accessToken = wx.getStorageSync('accessToken') || '';

    wx.getSetting({
      success(res) {
        console.log("authSetting" + res.authSetting);
        debugger
        if(res.authSetting["scope.userinfo"]){
            wx.getUserInfo({
              success : function(res){
                 console.log('用户已经授权');
              }
            })
        }else{
          // 未授权,去到授权界面
          wx.redirectTo({
            url: '/pages/authorization/index',
          })

        }
      }
    })

  },



  globalData: {
    userInfo: null,
    unionId : null,
    accessToken : null

  }
})