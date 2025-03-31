// knowledge.js
Page({
  data: {
    searchKeyword: '',
    popularKnowledge: [
      {
        id: 1,
        title: '数据结构',
        icon: 'data-structure',
        color: '#1E90FF'
      },
      {
        id: 2,
        title: '算法',
        icon: 'algorithm',
        color: '#8FBC8F'
      },
      {
        id: 3,
        title: '编程基础',
        icon: 'programming',
        color: '#FFD700'
      },
      {
        id: 4,
        title: '操作系统',
        icon: 'os',
        color: '#FF7F50'
      }
    ],
    knowledgeList: [
      { id: 1, title: '数据结构基础', desc: '包括数组、链表、栈、队列等基本数据结构' },
      { id: 2, title: '算法设计与分析', desc: '包括排序算法、搜索算法、动态规划等' },
      { id: 3, title: '程序设计基础', desc: '包括变量、表达式、控制结构等' },
      { id: 4, title: '面向对象编程', desc: '包括类、对象、继承、多态等面向对象概念' },
      { id: 5, title: '软件工程', desc: '包括软件开发过程、软件测试、项目管理等' }
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
  
  goToDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/knowledge/detail?id=${id}`
    });
  }
}) 