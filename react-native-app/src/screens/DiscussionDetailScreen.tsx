import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '../components/Header';
import Colors from '../constants/Colors';

// Mock data for comments
const COMMENTS = [
  {
    id: '1',
    author: '李明',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: '我觉得这个问题的关键是理解软件架构模式和设计模式的区别。架构模式关注的是整个系统的组织结构，而设计模式更多关注的是代码级别的实现细节。',
    timestamp: '3天前',
    likes: 12,
    isLiked: false,
  },
  {
    id: '2',
    author: '张华',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: '补充一点，MVC是一种架构模式，它将应用程序分为Model、View和Controller三个部分。而单例模式、工厂模式等是设计模式，它们解决的是特定的代码设计问题。',
    timestamp: '2天前',
    likes: 8,
    isLiked: true,
  },
  {
    id: '3',
    author: 'DeepSeek助手',
    avatar: 'https://placehold.co/100x100/4a90e2/ffffff?text=AI',
    content: '非常好的讨论！我想补充说明一下架构模式和设计模式的应用场景：\n\n架构模式适用于系统整体结构设计，如：\n- MVC/MVP/MVVM：用于界面与数据分离\n- 微服务架构：用于大型分布式系统\n- 分层架构：用于复杂业务系统\n\n设计模式适用于特定问题的代码设计，如：\n- 单例模式：确保一个类只有一个实例\n- 工厂模式：封装对象的创建过程\n- 观察者模式：实现对象间的一对多依赖关系\n\n在GESP考试中，理解它们的区别和应用场景非常重要。',
    timestamp: '1天前',
    likes: 15,
    isLiked: true,
    isExpert: true,
  },
];

const DiscussionDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, author, content, timestamp, topic } = route.params as { 
    title: string;
    author: string;
    content: string;
    timestamp: string;
    topic: string;
  };
  
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(COMMENTS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  
  // Handle like comment
  const handleLikeComment = (commentId) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };
  
  // Handle submit comment
  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      const newComment = {
        id: `${Date.now()}`,
        author: '我',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        content: commentText,
        timestamp: '刚刚',
        likes: 0,
        isLiked: false,
      };
      
      setComments(prev => [newComment, ...prev]);
      setCommentText('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  // Handle AI analysis
  const handleAiAnalysis = () => {
    setIsAiAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const aiComment = {
        id: `ai-${Date.now()}`,
        author: 'DeepSeek助手',
        avatar: 'https://placehold.co/100x100/4a90e2/ffffff?text=AI',
        content: '根据讨论内容，我认为这个问题涉及到软件工程中架构设计的核心概念。\n\n架构模式和设计模式的区别在于关注点和抽象级别不同：\n\n1. 架构模式关注整个系统的组织结构，如微服务、分层架构等\n2. 设计模式关注代码级别的设计，如单例、工厂、观察者等\n\n在GESP考试中，这两个概念都是重点，建议从以下方面深入学习：\n- 掌握常见架构模式的优缺点和适用场景\n- 学习GOF设计模式的分类和实现方式\n- 理解如何在实际项目中结合使用架构模式和设计模式',
        timestamp: '刚刚',
        likes: 0,
        isLiked: false,
        isExpert: true,
      };
      
      setComments(prev => [aiComment, ...prev]);
      setIsAiAnalyzing(false);
    }, 3000);
  };
  
  return (
    <View style={styles.container}>
      <Header title="问题详情" showBackButton />
      
      <ScrollView style={styles.scrollView}>
        {/* Question */}
        <View style={styles.questionContainer}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionTitle}>{title}</Text>
            <View style={styles.topicBadge}>
              <Text style={styles.topicText}>{topic}</Text>
            </View>
          </View>
          
          <Text style={styles.questionContent}>{content}</Text>
          
          <View style={styles.authorContainer}>
            <View style={styles.authorInfo}>
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/42.jpg' }} 
                style={styles.avatar} 
              />
              <Text style={styles.authorName}>{author}</Text>
            </View>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
        </View>
        
        {/* Comments section */}
        <View style={styles.commentsSection}>
          <View style={styles.commentsSectionHeader}>
            <Text style={styles.commentsSectionTitle}>回答 ({comments.length})</Text>
            <TouchableOpacity 
              style={styles.aiAnalysisButton}
              onPress={handleAiAnalysis}
              disabled={isAiAnalyzing}
            >
              {isAiAnalyzing ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <>
                  <FontAwesome5 name="robot" size={14} color={Colors.primary} style={styles.aiIcon} />
                  <Text style={styles.aiAnalysisText}>AI分析</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          
          {/* Comments list */}
          {comments.map(comment => (
            <View key={comment.id} style={styles.commentItem}>
              <View style={styles.commentHeader}>
                <View style={styles.commentAuthorInfo}>
                  <Image source={{ uri: comment.avatar }} style={styles.commentAvatar} />
                  <Text style={styles.commentAuthorName}>{comment.author}</Text>
                  {comment.isExpert && (
                    <View style={styles.expertBadge}>
                      <Text style={styles.expertBadgeText}>专家</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
              </View>
              
              <Text style={styles.commentContent}>{comment.content}</Text>
              
              <View style={styles.commentActions}>
                <TouchableOpacity 
                  style={styles.likeButton}
                  onPress={() => handleLikeComment(comment.id)}
                >
                  <FontAwesome5 
                    name={comment.isLiked ? 'thumbs-up' : 'thumbs-up'} 
                    solid={comment.isLiked}
                    size={14} 
                    color={comment.isLiked ? Colors.primary : Colors.textSecondary} 
                  />
                  <Text 
                    style={[
                      styles.likeCount, 
                      comment.isLiked && styles.likedText
                    ]}
                  >
                    {comment.likes}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.replyButton}>
                  <FontAwesome5 name="reply" size={14} color={Colors.textSecondary} />
                  <Text style={styles.replyText}>回复</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* Comment input */}
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          value={commentText}
          onChangeText={setCommentText}
          placeholder="写下你的回答..."
          placeholderTextColor={Colors.textSecondary}
          multiline
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            (!commentText.trim() || isSubmitting) && styles.disabledButton
          ]}
          onPress={handleSubmitComment}
          disabled={!commentText.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <FontAwesome5 name="paper-plane" size={16} color="white" />
          )}
        </TouchableOpacity>
      </View>
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
  questionContainer: {
    backgroundColor: Colors.cardBackground,
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  topicBadge: {
    backgroundColor: `${Colors.primary}20`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  topicText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  questionContent: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
    marginBottom: 16,
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  commentsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  commentsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  aiAnalysisButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}10`,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  aiIcon: {
    marginRight: 4,
  },
  aiAnalysisText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
  commentItem: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  commentAuthorName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textPrimary,
    marginRight: 8,
  },
  expertBadge: {
    backgroundColor: `${Colors.primary}20`,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  expertBadgeText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '600',
  },
  commentTimestamp: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  commentContent: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 22,
    marginBottom: 12,
  },
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  likeCount: {
    marginLeft: 4,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  likedText: {
    color: Colors.primary,
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyText: {
    marginLeft: 4,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.cardBackground,
  },
  commentInput: {
    flex: 1,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: Colors.textPrimary,
    maxHeight: 100,
    minHeight: 40,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: Colors.border,
    opacity: 0.7,
  },
});

export default DiscussionDetailScreen; 