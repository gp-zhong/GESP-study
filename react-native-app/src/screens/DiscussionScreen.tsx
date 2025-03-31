import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '../components/Header';
import Card from '../components/Card';
import Tag from '../components/Tag';
import Colors from '../constants/Colors';

// Mock data for discussions
const TOPICS = [
  { id: 'all', label: '全部' },
  { id: 'algorithm', label: '算法' },
  { id: 'datastructure', label: '数据结构' },
  { id: 'programming', label: '编程语言' },
  { id: 'database', label: '数据库' },
];

const DISCUSSIONS = [
  {
    id: '1',
    user: {
      name: '王小明',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      isExpert: false,
    },
    time: '2小时前',
    title: '动态规划的状态转移方程如何推导？',
    content: '动态规划的状态转移方程如何推导？我理解基本概念，但在实际应用时总是遇到困难。',
    hasImage: true,
    imageUrl: 'https://miro.medium.com/max/1400/1*gzvzPcYR4bwA-1pjVBJ7Ig.jpeg',
    topic: 'algorithm',
    answersCount: 2,
  },
  {
    id: '2',
    user: {
      name: '李华',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      isExpert: false,
    },
    time: '1小时前',
    title: '有没有人知道如何优化快速排序？',
    content: '有没有人知道如何优化快速排序算法？我在处理大数据集时遇到了性能问题。',
    hasImage: false,
    topic: 'algorithm',
    answersCount: 0,
  },
  {
    id: '3',
    user: {
      name: '张教授',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      isExpert: true,
    },
    time: '3小时前',
    title: '解释B+树和B树的区别',
    content: '有同学能详细解释一下B+树和B树在实际应用中的主要区别吗？特别是在数据库索引方面。',
    hasImage: false,
    topic: 'datastructure',
    answersCount: 5,
  },
];

const DiscussionScreen = () => {
  const navigation = useNavigation();
  const [selectedTopic, setSelectedTopic] = useState('all');

  // Filter discussions based on selected topic
  const filteredDiscussions = selectedTopic === 'all'
    ? DISCUSSIONS
    : DISCUSSIONS.filter(discussion => discussion.topic === selectedTopic);

  // Render topic filter item
  const renderTopicItem = ({ item }) => (
    <Tag
      label={item.label}
      isActive={selectedTopic === item.id}
      onPress={() => setSelectedTopic(item.id)}
    />
  );

  // Render discussion item
  const renderDiscussionItem = (item) => (
    <Card
      key={item.id}
      onPress={() => navigation.navigate('QuestionDetail', { id: item.id })}
    >
      <View style={styles.discussionItem}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>{item.user.name}</Text>
              {item.user.isExpert && (
                <View style={styles.expertBadge}>
                  <Text style={styles.expertText}>专家</Text>
                </View>
              )}
            </View>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>

        <Text style={styles.discussionTitle}>{item.title}</Text>
        <Text style={styles.discussionContent} numberOfLines={2}>
          {item.content}
        </Text>

        {item.hasImage && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.discussionImage}
              resizeMode="cover"
            />
          </View>
        )}

        <View style={styles.discussionFooter}>
          <View style={styles.answerCountContainer}>
            <FontAwesome5 name="comment-alt" solid size={14} color={Colors.textSecondary} />
            <Text style={styles.answerCount}>{item.answersCount}条回答</Text>
          </View>
          <TouchableOpacity
            style={styles.detailButton}
            onPress={() => navigation.navigate('QuestionDetail', { id: item.id })}
          >
            <Text style={styles.detailButtonText}>查看详情</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  // Header right button
  const AddQuestionButton = () => (
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => navigation.navigate('AskQuestion')}
    >
      <FontAwesome5 name="plus" solid size={14} color={Colors.primary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="问答讨论" rightComponent={<AddQuestionButton />} />
      
      <View style={styles.topicsContainer}>
        <FlatList
          data={TOPICS}
          renderItem={renderTopicItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topicsList}
        />
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.discussionsContainer}>
          {filteredDiscussions.map(renderDiscussionItem)}
          
          {filteredDiscussions.length === 0 && (
            <View style={styles.emptyState}>
              <FontAwesome5 name="comments" size={40} color={Colors.border} />
              <Text style={styles.emptyStateText}>还没有相关讨论</Text>
              <TouchableOpacity
                style={styles.emptyStateButton}
                onPress={() => navigation.navigate('AskQuestion')}
              >
                <Text style={styles.emptyStateButtonText}>发起提问</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AskQuestion')}
      >
        <FontAwesome5 name="plus" solid size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topicsContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  topicsList: {
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  discussionsContainer: {
    padding: 16,
  },
  discussionItem: {
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginRight: 6,
  },
  expertBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  expertText: {
    fontSize: 10,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  timeText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  discussionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  discussionContent: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 10,
  },
  imageContainer: {
    marginBottom: 10,
  },
  discussionImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  discussionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  answerCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  answerCount: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  detailButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  detailButtonText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(30, 144, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    color: Colors.textSecondary,
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  emptyStateButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default DiscussionScreen; 