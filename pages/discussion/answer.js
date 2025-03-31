// pages/discussion/answer.js
Page({
  data: {
    discussion: null,
    content: '',
    tempImages: [],
    showAIModal: false,
    showFormulaModal: false,
    aiPrompt: '',
    formulaContent: '',
    replyTo: ''
  },

  onLoad: function(options) {
    const postId = options.id;
    // 这里应该调用API获取讨论详情，这里用模拟数据
    this.setData({
      discussion: {
        id: postId,
        title: '动态规划的状态转移方程如何推导？',
        content: '动态规划的状态转移方程如何推导？我理解基本概念，但在实际应用时总是遇到困难。',
        image: '/assets/icons/dp.jpg'
      }
    });
  },

  navigateBack: function() {
    wx.navigateBack();
  },

  onContentChange: function(e) {
    this.setData({
      content: e.detail.value
    });
  },

  submitAnswer: function() {
    if (!this.data.content.trim()) {
      wx.showToast({
        title: '请输入回答内容',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({
      title: '提交中...'
    });

    // 这里应该调用API提交回答
    setTimeout(() => {
      wx.hideLoading();
      wx.navigateBack();
    }, 1500);
  },

  onAnswerInput(e) {
    this.setData({
      answer: e.detail.value
    });
    this.checkCanSubmit();
  },

  chooseImage() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.setData({
          imagePath: res.tempFilePaths[0]
        });
      }
    });
  },

  deleteImage() {
    this.setData({
      imagePath: ''
    });
  },

  checkCanSubmit() {
    const canSubmit = this.data.answer.trim().length > 0;
    this.setData({ canSubmit });
  }
}); 