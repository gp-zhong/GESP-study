Page({
  data: {
    title: '',
    content: '',
    imagePath: '',
    selectedTag: '',
    tags: ['算法', '数据结构', '编程语言', '数据库'],
    canSubmit: false
  },

  onTitleInput(e) {
    this.setData({
      title: e.detail.value
    });
    this.checkCanSubmit();
  },

  onContentInput(e) {
    this.setData({
      content: e.detail.value
    });
    this.checkCanSubmit();
  },

  selectTag(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({
      selectedTag: tag
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
    const { title, content, selectedTag } = this.data;
    const canSubmit = title.trim() && content.trim() && selectedTag;
    this.setData({ canSubmit });
  },

  submitDiscussion() {
    if (!this.data.canSubmit) {
      wx.showToast({
        title: '请完善讨论内容',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({
      title: '发布中...',
    });

    // 这里应该调用API发布讨论
    setTimeout(() => {
      wx.hideLoading();
      wx.navigateBack({
        success: () => {
          wx.showToast({
            title: '发布成功',
            icon: 'success'
          });
        }
      });
    }, 1500);
  }
}); 