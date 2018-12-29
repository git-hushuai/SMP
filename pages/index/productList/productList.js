
var api = require('../../../network/ewgApi.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    BannerList: [],
    sortKeys:['默认',"销量",'价格','新品'],
    sortIndex: 0,
    defaultColor: '#333333',
    selectColor: '#e3333b',
    pageIndex:1,
    sortRank: true,
    cate_id:'',
    productListsModel : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.navigationTitle,
    })
    let tempArr = options.subjectID.split('_ewg_');
    this.setData({
      cate_id: tempArr[2],
      pageIndex : 1,
    },()=>{
      this.loadProductListsInfoWithLoadMore(this.data.sortIndex,false)
    });
  },

  userChangeSortAction:function(e){
    console.log('userChangeSortAction');
    let sortIndex = e.currentTarget.dataset.sortindex
    this.setData({
      pageIndex: 1,
      sortIndex: sortIndex,
      sortRank: sortIndex == 2 ? this.data.sortRank==true?false:true : true
    },()=>{
      this.loadProductListsInfoWithLoadMore(this.data.sortIndex,false)
    });
  },
// 加载商品列表数据
  loadProductListsInfoWithLoadMore:function(sortIndex,isLoadMore){
    var productListsModelTemp = this.data.productListsModel;
    let orderBy = '';
    var device = ''
    let deviceType = wx.getSystemInfoSync();
    if(deviceType.model.indexOf('iPhone') >= 0){
      device = 'IOS'
    }else{
      device = 'ANDROID';
    }
    wx.setStorageSync('sessionKey', 'a_2ee8caabe5cbe4113eaaa0a75bob6d51')
    if(sortIndex == 1){
      orderBy = 'sales'
    }else if(sortIndex == 2){
      orderBy = 'price'
    }else if(sortIndex == 3){
      orderBy = 'time'
    }
    api.homeSubjectProductListApi({
      method:'POST',
      data:{
        cate_id: this.data.cate_id,
        keyword:'',
        rank: sortIndex == 2 ?  this.data.sortRank :false,
        page: this.data.pageIndex,
        orderBy:orderBy,
        device: device
      },
      success:(res)=>{
        console.log(res);
        this.setData({ 
          productListsModel: isLoadMore ? productListsModelTemp.concat(res.data.list) : res.data.list,
          pageIndex: this.data.pageIndex+1,
          });
      }
    });
  },
  onPullDownRefresh: function () {
    console.log("下拉刷新");
    // wx.showNavigationBarLoading() //在标题栏中显示加载
  },
  //  查看商品详情
  userCheckProductDetailAction:function(e){
    if (e.currentTarget.dataset.model.id) {
      wx.navigateTo({
          url: '../ProductDetail/EWGProductDetail?productID=' + e.currentTarget.dataset.model.id,
        })
      }
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    console.log("上拉加载更多");
    this.loadProductListsInfoWithLoadMore(this.data.sortIndex,true);
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
    this.setData({
      pageIndex: 1
    }, () => {
      this.loadProductListsInfoWithLoadMore(this.data.sortIndex, false)
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})