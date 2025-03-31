// profile.js
Page({
  data: {
    userInfo: {
      avatar: '/assets/icons/avatar1.png',
      name: '王小明',
      bio: '努力学习 CCF-GESP 中...'
    },
    menuItems: [
      { id: 'favorites', icon: 'star', title: '我的收藏' },
      { id: 'history', icon: 'time', title: '学习记录' },
      { id: 'errors', icon: 'warn', title: '错题本' },
      { id: 'settings', icon: 'setting', title: 'API设置' }
    ],
    apiInfo: {
      key: '••••••••••••••••',
      endpoint: 'https://api.deepseek.com/v1',
      model: 'DeepSeek Chat'
    }
  },
  
  onLoad: function() {
    // 页面加载时执行的代码
  },
  
  // 导航到收藏页面
  goToCollections: function() {
    wx.showToast({
      title: '收藏功能开发中',
      icon: 'none'
    });
  },
  
  // 导航到历史记录页面
  goToHistory: function() {
    wx.showToast({
      title: '历史记录功能开发中',
      icon: 'none'
    });
  },
  
  // 导航到错题本页面
  goToWrongQuestions: function() {
    wx.showToast({
      title: '错题本功能开发中',
      icon: 'none'
    });
  },
  
  // 导航到设置页面
  goToSettings: function() {
    wx.navigateTo({
      url: '/pages/profile/settings'
    });
  },
  
  // 导航到API KEY设置页面
  goToApiSettings: function() {
    wx.navigateTo({
      url: '/pages/profile/settings?tab=apikey'
    });
  },
  
  // 导航到API端点设置页面
  goToEndpointSettings: function() {
    wx.navigateTo({
      url: '/pages/profile/settings?tab=endpoint'
    });
  },
  
  // 导航到API模型选择页面
  goToModelSettings: function() {
    wx.navigateTo({
      url: '/pages/profile/settings?tab=model'
    });
  },
  
  // 保存设置
  saveSettings: function() {
    wx.showToast({
      title: '设置已保存',
      icon: 'success'
    });
  }
}) 