//index.js
//获取应用实例
const app = getApp()
var api = require('../../network/ewgApi.js')
Page({
  data: {
    BannerList:[],
    homeContentModelLists:[],
    secKillModel : {},
    screenWidth: wx.getSystemInfoSync().windowWidth
  },

  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getHomeContentInfo();
    this.checkUserIsLogin();
    wx.showShareMenu({}) // 分享

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('wxlogin rsp:'+res);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })



  },
  // 分享的消息类型
  onShareAppMessage(options){
    return {
      title :'测试分享'
,imageUrl:'http:\/\/ewg-cdn.oss-cn-shenzhen.aliyuncs.com\/ewg_group\/upload\/2018\/09\/376e601799dc1234b2bc10d14c8cad2d.jpg',
      path:'/pages/index/productCate/productCate'
    }
  },

  

  // 检查用户是否登录
  checkUserIsLogin:function(e){
    wx.checkSession({
      success(e){
        wx.login(); // 重新登录
        // console.log('checkUserIsLogin' + e);
      },
      fail(){
      }
    })
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    console.log("下拉刷新");
    this.onLoad();
    // wx.showNavigationBarLoading() //在标题栏中显示加载
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉加载更多");
  },
  // 查看秒杀商品详情
  userCheckProductDetailAction:function(e){
    wx.navigateTo({
      url: 'ProductDetail/EWGProductDetail?productID=' + e.currentTarget.dataset.model.id,
    })
  },
  // 查看商品详情数据
  userCheckProductDetail:function(e){
    if(e.currentTarget.dataset.model.action){
      var tempArr = e.currentTarget.dataset.model.action.split('_ewg_');
      if (tempArr[1] == 'product'){
        wx.navigateTo({
          url: 'ProductDetail/EWGProductDetail?productID='+tempArr[2],
        })
      }
    }
  },
// 分类主题
  userTapSecKillActivityAction:function(e,param){
    console.log("userTapSecKillActivityAction"+e);
    if(e.currentTarget.dataset.model.data.content.action){
      wx.navigateTo({
        url: 'productSubject/secKillSubject?subjectID=' + e.currentTarget.dataset.model.data.content.action
      })
    }
  },
  // 用户点击广告banner
  userTapADBannerImage : function(e){
    console.log('userTapADBannerImage' + e);
    var tempArr = e.currentTarget.dataset.model.action.split('_ewg_');
    if (tempArr[1] == 'subject'){
      wx.navigateTo({
        url: 'productSubject/secKillSubject?subjectID=' + e.currentTarget.dataset.model.action
      })
    } else if (tempArr[1] == 'category'){
      console.log('跳转到分类列表');

      wx.navigateTo({
        url: 'productCate/productCate',
      })
    }
  },
  // 用户查看商品列表数据
  userCheckProductLists:function(e){
    console.log('userCheckProductLists');
    if (e.currentTarget.dataset.model.code == 16 || e.currentTarget.dataset.model.code == 6) {
      if (!e.currentTarget.dataset.model.data.content.actionDescription) {
        return;
      }
      var titleArr = e.currentTarget.dataset.model.data.content.actionDescription.split('｜')
    } 

    if(e.currentTarget.dataset.model.code == 6){
      var tempArr = e.currentTarget.dataset.model.data.content.action.split('_ewg_');
      if (tempArr[1] == 'product_list'){
        wx.navigateTo({
          url: 'productList/productList?subjectID=' + e.currentTarget.dataset.model.data.content.action + '&navigationTitle=' + titleArr[1],
        })
      }
    }
  },
  getHomeContentInfo:function(){
    api.homeContentApi({
      success:(res)=>{
        console.log(res);
        if(res.data.code == 0){

          // 计算组件高度
          var tempArr = res.data.content.list;
          for (var i = 0; i < tempArr.length; i++) {
            var temp = tempArr[i];
            if (temp.frame != undefined) {
              var tempH = (temp.frame.h / temp.frame.w) * this.data.screenWidth;
              temp.contentH = tempH + 'px';
            }
          }
          this.setData({
            BannerList : res.data.content.list[0].data.content,
            homeContentModel:res.data.content.list,
            secKillModel:res.data.seckill
          })
        }
      }
    })
  }
})


