var app = getApp()
Page({
  data: {
    lottery_status: '',
    lottery_over_status: 'display:none',
    balance: 10,
    userInfo: {}
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      
    })
    wx.getWeRunData({
      success(res) {
        const iv = res.iv
        const encryptedData = res.encryptedData
        console.log(iv+'=='+encryptedData)
      }
    })
  }
})