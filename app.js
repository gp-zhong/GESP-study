// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录成功', res)
      }
    })
  },
  globalData: {
    userInfo: null,
    apiSettings: {
      endpoint: 'https://api.deepseek.com/v1',
      model: 'DeepSeek Chat'
    }
  }
}) 