
var api = require('../../../network/ewgApi.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    secKillModel: {},
    screenWidth: wx.getSystemInfoSync().windowWidth
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('wxwindowWidth' + wx.getSystemInfoSync().windowWidth);
    let subjectID = options.subjectID;
    let actionData = subjectID.split('_ewg_')
    this.getSubjectProductInfo(actionData[2]);

  },
// 获取配置信息
  getSubjectProductInfo:function(subjectID){
    console.log('subjectidinfo :'+subjectID);
    api.homeSubjectContentApi({
      method:'POST',
      data:{
        subject_id: subjectID,
      },
      success:(res)=>{
        console.log(res);
        var tempArr = res.data.content.list;
        for(var i =0;i<tempArr.length;i++){
          var temp = tempArr[i];
          console.log('temp model info :' + temp.frame);
          if(temp.frame != undefined){
            var tempH = (temp.frame.h / temp.frame.w) * this.data.screenWidth;
            temp.imgWidth = tempH + 'px';
          }
        }
        this.setData({ secKillModel: res.data.content});
        console.log('after model :'+res.data.content);
        wx.setNavigationBarTitle({
          title: res.data.title.CN,
        })
      }
    })
  },
// 查看商品详情
userCheckProductDetailAction:function(e){
  var tempArr = e.currentTarget.dataset.model.action.split('_ewg_');
  if (tempArr[1] == 'product') {
    console.log('查看商品详情');

    wx.navigateTo({
      url: '../ProductDetail/EWGProductDetail?productID=' + tempArr[2],
    })
  } 
},

// 商品详情
  userLongTapProductAction:function(e){
    console.log('userLongTapProductAction'+e);
    if (e.currentTarget.dataset.model.code == 16 || e.currentTarget.dataset.model.code == 6){
    if (!e.currentTarget.dataset.model.data.content.actionDescription){
          return;
    }
      var titleArr = e.currentTarget.dataset.model.data.content.actionDescription.split('｜')
    } 

    var tempArr = e.currentTarget.dataset.model.data.content.action.split('_ewg_');
    if(tempArr[1] == 'product'){
      console.log('查看商品详情');
      wx.navigateTo({
        url: '../ProductDetail/EWGProductDetail?productID=' + tempArr[2],
      })

    } else if (tempArr[1] == 'product_list'){
      wx.navigateTo({
        url: '../productList/productList?subjectID=' + e.currentTarget.dataset.model.data.content.action + '&navigationTitle=' + titleArr[1],
      })
    }
  },
// 用户选择商品列表
  userTapCheckProductListsAction:function(e){
    console.log('userTapCheckProductListsAction');
    var param = {title : ''};
    if (e.currentTarget.dataset.model.actionDescription){
      var titleArr = e.currentTarget.dataset.model.actionDescription.split('｜')
      param.title = titleArr[1];
    } else if (e.currentTarget.dataset.model.icon_title){
      param.title = e.currentTarget.dataset.model.icon_title.CN;
    }
    if(param.title.length <= 0){return;}
    wx.navigateTo({
      url: '../productList/productList?subjectID=' + e.currentTarget.dataset.model.action+'&navigationTitle='+param.title,
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