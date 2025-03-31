// exam.js
Page({
  data: {
    activeYear: 'all',
    activeLevel: 'all',
    yearFilters: ['全部', '2023', '2022', '2021', '2020'],
    levelFilters: ['全部', '初级', '中级', '高级'],
    examList: [
      { id: 1, title: '2023年GESP中级真题', time: '2023年6月', level: '中级' },
      { id: 2, title: '2022年GESP高级真题', time: '2022年12月', level: '高级' },
      { id: 3, title: '2022年GESP中级真题', time: '2022年6月', level: '中级' },
      { id: 4, title: '2021年GESP高级真题', time: '2021年12月', level: '高级' }
    ]
  },
  
  onLoad: function() {
    // 页面加载时执行的代码
  },
  
  // 设置年份筛选
  setActiveYear: function(e) {
    const year = e.currentTarget.dataset.year;
    this.setData({ 
      activeYear: year 
    });
    this.filterExams();
  },
  
  // 设置级别筛选
  setActiveLevel: function(e) {
    const level = e.currentTarget.dataset.level;
    this.setData({ 
      activeLevel: level 
    });
    this.filterExams();
  },
  
  // 过滤考试列表
  filterExams: function() {
    // 在实际应用中，这里会根据筛选条件过滤数据
    // 这里只是示例，没有实际过滤数据
    wx.showToast({
      title: '筛选条件已应用',
      icon: 'none',
      duration: 1500
    });
  },
  
  goToDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/exam/detail?id=${id}`
    });
  }
}) 