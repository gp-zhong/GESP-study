// index.js
Page({
  data: {
    motto: 'CCF-GESP学习助手',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loadingCompleted: false
  },
  onLoad: function () {
    // 模拟加载过程
    setTimeout(() => {
      this.setData({
        loadingCompleted: true
      });
      // 加载完成后跳转到知识点页面
      wx.switchTab({
        url: '/pages/knowledge/knowledge'
      });
    }, 2000);
  }
}) 