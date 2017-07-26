Page({
  onShareAppMessage: function (res) {
    var pid = ''
    var title = ''
    wx.getStorage({
      key: 'pid',
      success: function (res) {
        pid = res.data
      }
    })
    wx.getStorage({
      key: 'title',
      success: function (res) {
        title = res.data
      }
    })
    if (pid != '' && title != '') {
      return {
        title: title,
        path: '/pages/detail/detail?pid='+pid+'&title='+title,
        success: function (res) {
          // 转发成功
          wx.showToast({
            title: '感谢您的支持！',
            icon: 'success',
            duration: 2000
          })
        }
      }
    } else {
      return {
        title: '五彩斑斓，唯源是真',
        path: '/pages/index/index',
        success: function (res) {
          // 转发成功
          wx.showToast({
            title: '感谢您的支持！',
            icon: 'success',
            duration: 2000
          })
        }
      }
    }
  },
  onLoad: function (option) {
    var that = this
    var pid = option.pid
    var title = option.title
    wx.setStorage({
      key: "pid",
      data: pid
    })
    wx.setStorage({
      key: "title",
      data: title
    })
    wx.request({
      url: 'https://dieyan.emto.cn/getProductInfo/' + pid,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var product_info = res.data.data
        var info = product_info.detail;
        if (info == null) {
          info = ''
        }
        that.setData({
          'info': info,
          'imgUrls': product_info.imgUrls
        })
      }
    })
  }
})