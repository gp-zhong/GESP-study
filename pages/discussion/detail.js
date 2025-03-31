// pages/discussion/detail.js
Page({
  data: {
    discussion: {
      id: '',
      title: '',
      content: '',
      author: '',
      authorAvatar: '',
      postTime: '',
      images: [],
      tags: [],
      views: 0,
      likes: 0,
      commentCount: 0
    },
    answers: [],
    isFavorite: false,
    isLiked: false
  },

  onLoad: function(options) {
    // 获取讨论ID
    const discussionId = options.id;
    
    // 加载讨论详情
    this.loadDiscussionDetail(discussionId);
    
    // 加载回答列表
    this.loadAnswers(discussionId);
  },

  onShow: function() {
    // 检查是否需要刷新数据
    if (this.data.needRefresh) {
      this.loadAnswers(this.data.discussion.id);
      this.setData({
        needRefresh: false
      });
    }
  },

  // 加载讨论详情
  loadDiscussionDetail: function(id) {
    // 模拟数据，实际应从服务器获取
    const discussion = {
      id: id,
      title: '如何理解高数中的微分方程？',
      content: '我在学习微分方程的过程中遇到了一些困难，特别是对于一阶线性微分方程的求解方法不太理解。有没有同学能够分享一下解题思路或者推荐一些好的学习资料？',
      author: '数学爱好者',
      authorAvatar: '/assets/images/avatar1.png',
      postTime: '2023-05-16 14:30',
      images: ['/assets/images/math1.png'],
      tags: ['高等数学', '微分方程', '求助'],
      views: 156,
      likes: 23,
      commentCount: 5
    };

    // 更新数据
    this.setData({
      discussion: discussion
    });

    // 增加浏览量
    this.incrementViewCount(id);
  },

  // 加载回答列表
  loadAnswers: function(discussionId) {
    // 模拟数据，实际应从服务器获取
    const answers = [
      {
        id: '1',
        author: '数学教授',
        authorAvatar: '/assets/images/avatar2.png',
        content: '一阶线性微分方程的一般形式是 y\' + P(x)y = Q(x)，求解步骤如下：\n1. 求出积分因子 μ(x) = e^(∫P(x)dx)\n2. 两边同乘以积分因子\n3. 得到 d/dx[μ(x)y] = μ(x)Q(x)\n4. 两边积分得到通解',
        postTime: '2023-05-16 15:20',
        images: ['/assets/images/math_solution1.png'],
        likes: 18,
        isLiked: false
      },
      {
        id: '2',
        author: '学霸同学',
        authorAvatar: '/assets/images/avatar3.png',
        content: '我推荐《常微分方程》这本书，里面有很多例题和详细的解析，对理解微分方程很有帮助。另外，可以看看3Blue1Brown的视频，对微分方程有直观的理解。',
        postTime: '2023-05-16 16:45',
        images: [],
        likes: 7,
        isLiked: false
      }
    ];

    this.setData({
      answers: answers
    });
  },

  // 增加浏览量
  incrementViewCount: function(id) {
    // 实际应调用API更新浏览量
    let discussion = this.data.discussion;
    discussion.views += 1;
    this.setData({
      discussion: discussion
    });
  },

  // 切换收藏状态
  toggleFavorite: function() {
    this.setData({
      isFavorite: !this.data.isFavorite
    });
    
    // 实际应调用API更新收藏状态
    wx.showToast({
      title: this.data.isFavorite ? '已收藏' : '已取消收藏',
      icon: 'success',
      duration: 1500
    });
  },

  // 点赞讨论
  likeDiscussion: function() {
    if (this.data.isLiked) {
      return;
    }
    
    let discussion = this.data.discussion;
    discussion.likes += 1;
    
    this.setData({
      discussion: discussion,
      isLiked: true
    });
    
    // 实际应调用API更新点赞数
    wx.showToast({
      title: '点赞成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 点赞回答
  likeAnswer: function(e) {
    const index = e.currentTarget.dataset.index;
    let answers = this.data.answers;
    
    if (answers[index].isLiked) {
      return;
    }
    
    answers[index].likes += 1;
    answers[index].isLiked = true;
    
    this.setData({
      answers: answers
    });
    
    // 实际应调用API更新点赞数
    wx.showToast({
      title: '点赞成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 回复某个回答
  replyToAnswer: function(e) {
    const index = e.currentTarget.dataset.index;
    const author = this.data.answers[index].author;
    
    // 跳转到回答编辑页
    wx.navigateTo({
      url: '/pages/discussion/answer?id=' + this.data.discussion.id + '&replyTo=' + author
    });
  },

  // 显示回答编辑器
  showAnswerEditor: function() {
    wx.navigateTo({
      url: '/pages/discussion/answer?id=' + this.data.discussion.id
    });
  },

  // 预览讨论图片
  previewImage: function(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.discussion.images;
    
    wx.previewImage({
      current: images[index],
      urls: images
    });
  },

  // 预览回答图片
  previewAnswerImage: function(e) {
    const answerIndex = e.currentTarget.dataset.answerIndex;
    const imageIndex = e.currentTarget.dataset.imageIndex;
    const images = this.data.answers[answerIndex].images;
    
    wx.previewImage({
      current: images[imageIndex],
      urls: images
    });
  },

  // 分享
  onShareAppMessage: function() {
    return {
      title: this.data.discussion.title,
      path: '/pages/discussion/detail?id=' + this.data.discussion.id
    };
  }
}); 