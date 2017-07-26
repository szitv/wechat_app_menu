Page({
  onShareAppMessage: function (res) {
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
  },
  showLottery: function(event) {
    wx.navigateTo({
      url: '/pages/lottery/lottery',
    })
  },
  select:function(event) {
    var id = event.currentTarget.dataset.id
    var that = this;
    wx.getStorage({
      key: 'product_list_'+id,
      success: function (res) {
        var product_list = res.data
        that.setData({
          'id': id,
          'product_list': product_list
        })
      },
      fail: function(e) {
        wx.request({
          url: 'https://dieyan.emto.cn/getProductList/' + id,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var product_list = res.data.data
            wx.setStorage({
              key: "product_list_" + id,
              data: product_list
            })
            that.setData({
              'id': id,
              'product_list': product_list
            })
          }
        })
      }
    })
  },
  call:function(event) {
    var phone = event.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  showDetail:function(event) {
    wx.navigateTo({
      url: '/pages/detail/detail?pid=' + event.currentTarget.dataset.pid + '&title=' + event.currentTarget.dataset.title
    })
  },
  
  showLocation:function(event) {
    wx.openLocation({
      latitude: 22.540800,
      longitude: 113.952960,
      name: '蝶宴酒楼',
      address: '深圳市南山区高新园地铁站B出口大冲商务中心C座201'
    });
  },

  onLoad: function (options){
    wx.onUserCaptureScreen(function (res) {
      wx.showModal({
        title: '告诉你一个好消息',
        content: '你获得了6.6折蝶宴卡券一张！点击确定即放入微信卡券包中',
        success: function (res) {
          if (res.confirm) {
            wx.showToast({
              title: '卡券领取成功',
              icon: 'success',
              duration: 2000
            })
          } else if (res.cancel) {
            wx.showToast({
              title: '恭喜你错失良机',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this;

    wx.request({
      url: 'https://dieyan.emto.cn/getProductList/1',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var product_list = res.data.data
        that.setData({
          'product_list': product_list
        })
      }
    })

    wx.request({
      url: 'https://dieyan.emto.cn/menu',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var array = res.data.data
        that.setData({
          'array': array
        })
      }
    })
    
    wx.request({
      url: 'https://dieyan.emto.cn/getProfile',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var profile = res.data.data
        that.setData({
          'logo': profile.logo,
          'address': profile.address,
          'tel': profile.tel
        })
      }
    })

    this.setData({
      'id': 1,
    })
    
  }
})