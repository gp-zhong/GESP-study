import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '../components/Header';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import { RootStackParamList } from '../types/navigation';

type ExerciseDetailRouteProp = RouteProp<RootStackParamList, 'ExerciseDetail'>;

// Mock data for exercise details
const EXERCISE_DATA = {
  '101': {
    title: '两数之和',
    difficulty: 'easy',
    content: `给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。`,
    example: `输入：nums = [2, 7, 11, 15], target = 9
输出：[0, 1]
解释：因为 nums[0] + nums[1] = 2 + 7 = 9，所以返回 [0, 1]`,
    aiAnalysis: `这道题可以使用哈希表（HashMap）来解决，时间复杂度为O(n)。

算法思路：
1. 创建一个哈希表，用于存储每个元素的值和索引。
2. 遍历数组，对于每个元素nums[i]，计算target - nums[i]。
3. 如果哈希表中存在target - nums[i]，则找到了答案。
4. 否则，将当前元素及其索引加入哈希表，继续遍历。

代码实现：
\`\`\`python
def twoSum(nums, target):
    hash_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i
    return []
\`\`\`

时间复杂度：O(n)，其中n是数组的长度。对于每个元素，我们只需要O(1)的时间来查找它是否在哈希表中。
空间复杂度：O(n)，主要是哈希表的开销。

这种方法比暴力解法（双重循环，时间复杂度O(n²)）更高效。`,
  }
};

const ExerciseDetailScreen = () => {
  const route = useRoute<ExerciseDetailRouteProp>();
  const navigation = useNavigation();
  const { id, difficulty } = route.params;
  
  const [solution, setSolution] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get exercise data based on id
  const exercise = EXERCISE_DATA[id] || {
    title: '未找到习题',
    difficulty: 'medium',
    content: '该习题不存在或已被删除',
    example: '',
    aiAnalysis: '',
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy':
        return Colors.success;
      case 'medium':
        return Colors.warning;
      case 'hard':
        return Colors.error;
      default:
        return Colors.textSecondary;
    }
  };

  const getDifficultyText = (diff: string) => {
    switch (diff) {
      case 'easy':
        return '简单';
      case 'medium':
        return '中等';
      case 'hard':
        return '困难';
      default:
        return '未知';
    }
  };

  const handleSubmit = () => {
    if (solution.trim() === '') return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowAnalysis(true);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Header title={exercise.title} showBackButton />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Difficulty tag */}
          <View style={[styles.difficultyTag, { backgroundColor: getDifficultyColor(difficulty) }]}>
            <Text style={styles.difficultyText}>{getDifficultyText(difficulty)}</Text>
          </View>
          
          {/* Exercise content */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>题目描述：</Text>
            <Text style={styles.descriptionText}>{exercise.content}</Text>
          </View>
          
          {/* Example */}
          {exercise.example && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>示例：</Text>
              <Card style={styles.exampleCard}>
                <Text style={styles.exampleText}>{exercise.example}</Text>
              </Card>
            </View>
          )}
          
          {/* Solution input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>你的解答：</Text>
            <View style={styles.codeEditorContainer}>
              <TextInput
                style={styles.codeEditor}
                multiline
                placeholder="在此输入你的代码解答..."
                placeholderTextColor="#999"
                value={solution}
                onChangeText={setSolution}
              />
            </View>
            
            <TouchableOpacity
              style={[
                styles.submitButton,
                solution.trim() === '' && styles.disabledButton
              ]}
              onPress={handleSubmit}
              disabled={solution.trim() === '' || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>提交解答</Text>
              )}
            </TouchableOpacity>
          </View>
          
          {/* AI Analysis */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.analysisHeader}
              onPress={() => setShowAnalysis(!showAnalysis)}
            >
              <Text style={styles.analysisTitle}>DeepSeek解析</Text>
              <FontAwesome5
                name={showAnalysis ? "chevron-up" : "chevron-down"}
                size={16}
                color={Colors.primary}
              />
            </TouchableOpacity>
            
            {showAnalysis && (
              <View style={styles.analysisContent}>
                <Text style={styles.analysisText}>{exercise.aiAnalysis}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  difficultyTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 16,
  },
  difficultyText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textPrimary,
  },
  exampleCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  exampleText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textPrimary,
    fontFamily: 'monospace',
  },
  codeEditorContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  codeEditor: {
    fontFamily: 'monospace',
    minHeight: 150,
    padding: 12,
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  analysisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 144, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  analysisContent: {
    marginTop: 12,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(30, 144, 255, 0.2)',
  },
  analysisText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textPrimary,
  },
});

export default ExerciseDetailScreen; 