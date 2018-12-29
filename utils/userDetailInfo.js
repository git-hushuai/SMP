


var accessToken = wx.getStorageSync('accessToken');

var accessTokenTimeout = wx.getStorageSync('accessTokenTimeout');

var refreshToken = wx.getStorageSync('refreshToken');

var refreshTokenTimeout = wx.getStorageSync('refreshTokenTimeout');

var account = wx.getStorageSync('account');

var id = wx.getStorageSync('id');

var openid = wx.getStorageSync('openid');

var status = wx.getStorageSync('status');

var syncSaveUserInfo = function(userInfo){
    if(userInfo){
      wx.setStorageSync('accessToken', userInfo.accessToken);
      wx.setStorageSync('accessTokenTimeout', String(userInfo.accessTokenTimeout));
      wx.setStorageSync('account', String(userInfo.info.account));
      wx.setStorageSync('id', String(userInfo.info.id));
      wx.setStorageSync('openid', String(userInfo.info.openid));
      wx.setStorageSync('status', String(userInfo.info.status));
    }
}

module.exports={
  accessToken: accessToken,
  accessTokenTimeout: accessTokenTimeout,
  refreshToken: refreshToken,
  refreshTokenTimeout: refreshTokenTimeout,
  account: account,
  id: id,
  openid: openid,
  status: status,
  syncSaveUserInfo: syncSaveUserInfo
}