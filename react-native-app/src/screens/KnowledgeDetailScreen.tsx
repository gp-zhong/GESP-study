import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '../components/Header';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import { RootStackParamList } from '../types/navigation';

type KnowledgeDetailRouteProp = RouteProp<RootStackParamList, 'KnowledgeDetail'>;

// Mock data for knowledge details
const KNOWLEDGE_DATA = {
  '1': {
    title: '数据结构基础',
    content: `数据结构是计算机存储、组织数据的方式。数据结构是指相互之间存在一种或多种特定关系的数据元素的集合。`,
    topics: [
      { name: '数组（Array）', description: '最基本的数据结构，在内存中连续存储' },
      { name: '链表（Linked List）', description: '由节点组成，每个节点包含数据和指向下一个节点的指针' },
      { name: '栈（Stack）', description: '遵循后进先出(LIFO)原则的有序集合' },
      { name: '队列（Queue）', description: '遵循先进先出(FIFO)原则的有序集合' },
      { name: '树（Tree）', description: '具有层次关系的数据结构，每个节点有零个或多个子节点' },
      { name: '图（Graph）', description: '由边连接的节点集合' },
      { name: '哈希表（Hash Table）', description: '实现关联数组的抽象数据类型，通过散列函数映射' },
    ],
    keyPoints: '掌握每种数据结构的特点、适用场景以及基本操作的时间复杂度是GESP考试的重点内容。',
    relatedExercises: ['101', '102', '103'],
    relatedExams: ['2023-mid', '2022-adv'],
  }
};

const KnowledgeDetailScreen = () => {
  const route = useRoute<KnowledgeDetailRouteProp>();
  const navigation = useNavigation();
  const { id } = route.params;
  
  // Get knowledge data based on id
  const knowledge = KNOWLEDGE_DATA[id] || {
    title: '未找到知识点',
    content: '该知识点不存在或已被删除',
    topics: [],
    keyPoints: '',
    relatedExercises: [],
    relatedExams: [],
  };

  return (
    <View style={styles.container}>
      <Header title={knowledge.title} showBackButton />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Main content */}
          <Text style={styles.description}>{knowledge.content}</Text>
          
          {/* Topics list */}
          <Text style={styles.subtitle}>常见的数据结构包括：</Text>
          {knowledge.topics.map((topic, index) => (
            <View key={index} style={styles.topicItem}>
              <Text style={styles.topicBullet}>•</Text>
              <View style={styles.topicContent}>
                <Text style={styles.topicName}>{topic.name}</Text>
                <Text style={styles.topicDescription}>{topic.description}</Text>
              </View>
            </View>
          ))}
          
          {/* Key points */}
          <Card style={styles.keyPointsCard}>
            <Text style={styles.keyPointsTitle}>知识要点</Text>
            <Text style={styles.keyPointsContent}>{knowledge.keyPoints}</Text>
          </Card>
          
          {/* Related content */}
          <View style={styles.relatedContainer}>
            <TouchableOpacity
              style={styles.relatedButton}
              onPress={() => {
                // Navigate to the first related exercise
                if (knowledge.relatedExercises.length > 0) {
                  navigation.navigate('ExerciseDetail', {
                    id: knowledge.relatedExercises[0],
                    title: '相关习题',
                    difficulty: 'medium'
                  });
                }
              }}
            >
              <FontAwesome5 name="code" solid size={14} color="white" style={styles.buttonIcon} />
              <Text style={styles.relatedButtonText}>相关习题</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.relatedButton}
              onPress={() => {
                // Navigate to the first related exam
                if (knowledge.relatedExams.length > 0) {
                  const [year, level] = knowledge.relatedExams[0].split('-');
                  navigation.navigate('ExamDetail', {
                    id: knowledge.relatedExams[0],
                    title: `${year}年GESP真题`,
                    year,
                    level: level as 'basic' | 'intermediate' | 'advanced'
                  });
                }
              }}
            >
              <FontAwesome5 name="file-alt" solid size={14} color="white" style={styles.buttonIcon} />
              <Text style={styles.relatedButtonText}>查看真题</Text>
            </TouchableOpacity>
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
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  topicItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 4,
  },
  topicBullet: {
    fontSize: 18,
    color: Colors.primary,
    marginRight: 8,
    width: 15,
  },
  topicContent: {
    flex: 1,
  },
  topicName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  topicDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  keyPointsCard: {
    backgroundColor: 'rgba(30, 144, 255, 0.05)',
    marginTop: 20,
    marginBottom: 20,
  },
  keyPointsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 8,
  },
  keyPointsContent: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textPrimary,
  },
  relatedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  relatedButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 0.48,
  },
  buttonIcon: {
    marginRight: 8,
  },
  relatedButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15,
  },
});

export default KnowledgeDetailScreen; 