import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '../components/Header';
import Card from '../components/Card';
import Colors from '../constants/Colors';

// Mock data for knowledge points
const POPULAR_KNOWLEDGE = [
  { id: '1', title: '数据结构', icon: 'database' },
  { id: '2', title: '算法', icon: 'cogs' },
  { id: '3', title: '编程语言', icon: 'code' },
  { id: '4', title: '设计模式', icon: 'sitemap' },
];

const ALL_KNOWLEDGE = [
  {
    id: '1',
    title: '数据结构基础',
    description: '包括数组、链表、栈、队列、树、图等',
  },
  {
    id: '2',
    title: '算法设计与分析',
    description: '包括排序算法、查找算法、动态规划等',
  },
  {
    id: '3',
    title: '程序设计基础',
    description: '包括变量、表达式、控制流、函数等',
  },
  {
    id: '4',
    title: '面向对象编程',
    description: '包括类、对象、继承、多态、封装等',
  },
  {
    id: '5',
    title: '软件工程',
    description: '包括软件开发过程、软件测试、项目管理等',
  },
];

const KnowledgeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter knowledge points based on search query
  const filteredKnowledge = ALL_KNOWLEDGE.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render popular knowledge item
  const renderPopularItem = ({ item }) => (
    <TouchableOpacity
      style={styles.popularItem}
      onPress={() => navigation.navigate('KnowledgeDetail', { id: item.id, title: item.title })}
    >
      <View style={styles.popularIcon}>
        <FontAwesome5 name={item.icon} size={24} color={Colors.primary} />
      </View>
      <Text style={styles.popularTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="知识点预习" />
      
      <ScrollView style={styles.scrollView}>
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <FontAwesome5 name="search" size={16} color={Colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索知识点..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.textSecondary}
          />
        </View>

        {/* Popular knowledge points */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>热门知识点</Text>
          <FlatList
            data={POPULAR_KNOWLEDGE}
            renderItem={renderPopularItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularList}
          />
        </View>

        {/* All knowledge points */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>全部知识点</Text>
          {filteredKnowledge.map(item => (
            <Card
              key={item.id}
              onPress={() => navigation.navigate('KnowledgeDetail', { id: item.id, title: item.title })}
            >
              <View style={styles.knowledgeItem}>
                <FontAwesome5 name="square" solid size={16} color={Colors.primary} style={styles.bulletIcon} />
                <View style={styles.knowledgeContent}>
                  <Text style={styles.knowledgeTitle}>{item.title}</Text>
                  <Text style={styles.knowledgeDescription}>{item.description}</Text>
                </View>
              </View>
            </Card>
          ))}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: Colors.textPrimary,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: Colors.textPrimary,
  },
  popularList: {
    paddingBottom: 8,
  },
  popularItem: {
    width: 90,
    alignItems: 'center',
    marginRight: 12,
  },
  popularIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(30, 144, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  popularTitle: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.textPrimary,
  },
  knowledgeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletIcon: {
    marginTop: 3,
    marginRight: 10,
  },
  knowledgeContent: {
    flex: 1,
  },
  knowledgeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: Colors.textPrimary,
  },
  knowledgeDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default KnowledgeScreen; 