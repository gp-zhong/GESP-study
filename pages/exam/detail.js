// pages/exam/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存储每个题目的展开状态
    expandedStates: {},
    // 题目列表数据
    questions: [
      {
        id: 1,
        title: '第1题',
        content: '给定一个包含n个元素的链表，请设计一个时间复杂度为O(n)、额外空间复杂度为O(1)的算法，判断该链表是否为回文链表。',
        analysis: {
          thinking: '本题要求判断链表是否为回文，且时间复杂度O(n)、空间复杂度O(1)。可以使用快慢指针找到链表中点，然后反转后半部分链表，最后比较前半部分和反转后的后半部分是否相同。',
          code: `function isPalindrome(head) {
    if (!head || !head.next) return true;
    
    // 找到链表中点
    let slow = head, fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // 反转后半部分链表
    let secondHalf = reverseList(slow.next);
    
    // 比较前半部分和反转后的后半部分
    let p1 = head, p2 = secondHalf;
    let result = true;
    while (p2) {
        if (p1.val !== p2.val) {
            result = false;
            break;
        }
        p1 = p1.next;
        p2 = p2.next;
    }
    
    return result;
}`,
          complexity: '• 时间复杂度：O(n)，需要遍历链表找到中点，然后反转后半部分。\n• 空间复杂度：O(1)，只使用了常数额外空间。'
        }
      },
      {
        id: 2,
        title: '第2题',
        content: '给定一个二维矩阵 matrix，以及一个目标值 target。请编写一个高效的算法，判断 target 是否存在于 matrix 中。',
        subContent: 'matrix 具有以下特性：\n• 每行中的整数从左到右按升序排列\n• 每行的第一个整数大于前一行的最后一个整数',
        analysis: {
          thinking: '由于矩阵中的元素是有序的，我们可以使用二分查找来寻找目标值。可以将二维矩阵看作一个一维有序数组，然后通过索引映射关系进行二分查找。',
          code: `function searchMatrix(matrix, target) {
    if (!matrix.length || !matrix[0].length) return false;
    
    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0, right = m * n - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const row = Math.floor(mid / n);
        const col = mid % n;
        const value = matrix[row][col];
        
        if (value === target) {
            return true;
        } else if (value < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return false;
}`,
          complexity: '• 时间复杂度：O(log(m*n))，使用二分查找。\n• 空间复杂度：O(1)，只使用了常数额外空间。'
        }
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 页面加载时的初始化逻辑
    this.initExpandedStates();
  },

  initExpandedStates: function() {
    // 初始化所有题目的展开状态为false
    const expandedStates = {};
    this.data.questions.forEach(question => {
      expandedStates[question.id] = false;
    });
    this.setData({ expandedStates });
  },

  toggleAnalysis: function(e) {
    // 获取点击的题目ID
    const questionId = e.currentTarget.dataset.questionId;
    
    // 更新展开状态
    const expandedStates = { ...this.data.expandedStates };
    expandedStates[questionId] = !expandedStates[questionId];
    
    this.setData({ expandedStates });
  },

  goBack: function() {
    // 返回上一页
    wx.navigateBack({
      delta: 1
    });
  },

  // 复制代码到剪贴板
  copyCode: function(e) {
    const code = e.currentTarget.dataset.code;
    wx.setClipboardData({
      data: code,
      success: function() {
        wx.showToast({
          title: '代码已复制',
          icon: 'success',
          duration: 2000
        });
      }
    });
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

  }
})