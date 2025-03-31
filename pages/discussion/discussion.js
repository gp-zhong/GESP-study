// discussion.js
Page({
  data: {
    activeTag: '全部',
    tags: ['全部', '算法', '数据结构', '编程语言', '数据库'],
    discussionList: [
      {
        id: 1,
        avatar: '/assets/icons/avatar1.png',
        author: '王小明',
        time: '2小时前',
        title: '动态规划的状态转移方程如何推导？',
        content: '动态规划的状态转移方程如何推导？我理解基本概念，但在实际应用时总是遇到困难。',
        image: '/assets/icons/dp.jpg',
        answerCount: 2
      },
      {
        id: 2,
        avatar: '/assets/icons/avatar2.png',
        author: '李华',
        time: '1小时前',
        title: '有没有人知道如何优化快速排序？',
        content: '有没有人知道如何优化快速排序算法？我在处理大数据集时遇到了性能问题。',
        answerCount: 0
      }
    ]
  },
  
  // 设置当前选中的标签
  setActiveTag: function(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({
      activeTag: tag
    });
    // TODO: 根据标签筛选讨论列表
  },
  
  // 跳转到讨论详情页
  goToDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/discussion/detail?id=${id}`
    });
  },
  
  // 跳转到新建讨论页面
  goToNewDiscussion: function() {
    wx.navigateTo({
      url: '/pages/discussion/new'
    });
  },

  // 跳转到回答页面
  goToAnswer: function(e) {
    const postId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/discussion/answer?id=${postId}`
    });
  },

  // 点赞帖子
  likePost: function(e) {
    const { id } = e.currentTarget.dataset;
    // TODO: 实现点赞功能
    console.log('Like post:', id);
  },

  // 分享帖子
  sharePost: function(e) {
    const { id } = e.currentTarget.dataset;
    // TODO: 实现分享功能
    console.log('Share post:', id);
  }
}) 