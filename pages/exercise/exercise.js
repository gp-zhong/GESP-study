// exercise.js
Page({
  data: {
    searchKeyword: '',
    activeFilters: {
      difficulty: '全部',
      type: '全部'
    },
    difficultyOptions: ['全部', '简单', '中等', '困难'],
    typeOptions: ['全部', '数组', '字符串', '动态规划', '图论', '树'],
    exerciseList: [
      { id: 101, title: '两数之和', difficulty: '简单', type: '数组', desc: '给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。' },
      { id: 102, title: '最长回文子串', difficulty: '中等', type: '字符串', desc: '给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。' },
      { id: 103, title: '无重复字符的最长子串', difficulty: '中等', type: '字符串', desc: '给定一个字符串，请你找出其中不含有重复字符的最长子串的长度。' },
      { id: 104, title: '最长递增子序列', difficulty: '中等', type: '动态规划', desc: '给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。' },
      { id: 105, title: '课程表', difficulty: '中等', type: '图论', desc: '你这个学期必须选修 numCourse 门课程，记为 0 到 numCourse-1 。在选修某些课程之前需要一些先修课程。' }
    ]
  },
  
  onSearch: function(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },
  
  onClearSearch: function() {
    this.setData({
      searchKeyword: ''
    });
  },
  
  setFilter: function(e) {
    const { type, value } = e.currentTarget.dataset;
    this.setData({
      [`activeFilters.${type}`]: value
    });
  },
  
  goToDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/exercise/detail?id=${id}`
    });
  }
}) 