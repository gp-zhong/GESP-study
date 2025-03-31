// knowledge/detail.js
Page({
  data: {
    id: null,
    knowledgeDetail: {
      id: 1,
      title: '数据结构基础',
      content: '数据结构是计算机存储、组织数据的方式。数据结构是指相互之间存在一种或多种特定关系的数据元素的集合。',
      items: [
        { name: '数组（Array）', desc: '最基本的数据结构，在内存中连续存储' },
        { name: '链表（Linked List）', desc: '由节点组成，每个节点包含数据和指向下一个节点的指针' },
        { name: '栈（Stack）', desc: '后进先出（LIFO）的数据结构' },
        { name: '队列（Queue）', desc: '先进先出（FIFO）的数据结构' },
        { name: '树（Tree）', desc: '具有层次关系的数据结构，如二叉树、红黑树等' },
        { name: '图（Graph）', desc: '由边连接的节点集合' },
        { name: '哈希表（Hash Table）', desc: '通过哈希函数映射键值' }
      ],
      summary: '掌握每种数据结构的特点、适用场景以及基本操作的时间复杂度是GESP考试的重点内容。'
    }
  },
  
  onLoad: function(options) {
    this.setData({
      id: options.id
    });
    // 实际应用中，这里会根据ID从服务器获取知识点详情
    // wx.request({ ... })
  },
  
  goToExercises: function() {
    wx.switchTab({
      url: '/pages/exercise/exercise'
    });
  },
  
  goToExams: function() {
    wx.switchTab({
      url: '/pages/exam/exam'
    });
  }
}) 