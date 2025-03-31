// exercise/detail.js
Page({
  data: {
    id: null,
    exercise: {
      id: 101,
      title: '两数之和',
      difficulty: '简单',
      type: '数组',
      description: '给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。',
      example: '输入：nums = [2, 7, 11, 15], target = 9\n输出：[0, 1]'
    },
    code: '',
    showAnalysis: false,
    aiAnalysis: {
      idea: '这题可以使用哈希表来解决，通过一次遍历数组，将每个元素及其索引存入哈希表，同时查找是否存在 target - nums[i] 的元素，若存在则返回两个索引。',
      code: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}',
      complexity: '- 时间复杂度：O(n)，其中 n 是数组的长度。只需要遍历一次数组。\n- 空间复杂度：O(n)，其中 n 是数组的长度。主要是哈希表的开销。'
    }
  },
  
  onLoad: function(options) {
    this.setData({
      id: options.id
    });
    // 实际应用中，这里会根据ID从服务器获取习题详情
    // wx.request({ ... })
  },
  
  updateCode: function(e) {
    this.setData({
      code: e.detail.value
    });
  },
  
  submitAnswer: function() {
    // 实际应用中，这里会将代码提交到后端进行评估
    // wx.request({ ... })
    
    // 显示解析
    this.setData({
      showAnalysis: true
    });
    
    wx.showToast({
      title: '解答已提交',
      icon: 'success'
    });
  },
  
  toggleAnalysis: function() {
    this.setData({
      showAnalysis: !this.data.showAnalysis
    });
  }
}) 