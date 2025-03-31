// pages/profile/settings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiInfo: {
      key: '',
      endpoint: 'https://api.deepseek.com/v1',
      model: 'DeepSeek Chat'
    },
    modelOptions: ['DeepSeek Chat', 'DeepSeek Coder', 'DeepSeek Math'],
    modelIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 加载本地存储的API信息
    const apiInfo = wx.getStorageSync('apiInfo');
    if (apiInfo) {
      // 查找modelIndex
      const modelIndex = this.data.modelOptions.findIndex(item => item === apiInfo.model);
      
      this.setData({
        apiInfo: apiInfo,
        modelIndex: modelIndex !== -1 ? modelIndex : 0
      });
    }
    
    // 如果有tab参数，可以滚动到对应位置
    if (options.tab) {
      // 实际应用中，可以根据tab滚动到对应的设置项
      wx.showToast({
        title: `正在设置${options.tab}`,
        icon: 'none'
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // API KEY 输入改变
  onKeyChange: function(e) {
    this.setData({
      'apiInfo.key': e.detail.value
    });
  },
  
  // API 端点输入改变
  onEndpointChange: function(e) {
    this.setData({
      'apiInfo.endpoint': e.detail.value
    });
  },
  
  // API 模型选择改变
  onModelChange: function(e) {
    const index = e.detail.value;
    this.setData({
      modelIndex: index,
      'apiInfo.model': this.data.modelOptions[index]
    });
  },
  
  // 保存设置
  saveSettings: function() {
    const apiInfo = this.data.apiInfo;
    
    // 验证输入
    if (!apiInfo.key) {
      wx.showToast({
        title: '请输入API KEY',
        icon: 'none'
      });
      return;
    }
    
    if (!apiInfo.endpoint) {
      wx.showToast({
        title: '请输入API端点',
        icon: 'none'
      });
      return;
    }
    
    // 保存到本地存储
    wx.setStorageSync('apiInfo', apiInfo);
    
    wx.showToast({
      title: '设置已保存',
      icon: 'success',
      success: () => {
        // 延迟返回
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    });
  },
  
  // 返回上一页
  navigateBack: function() {
    wx.navigateBack();
  }
})