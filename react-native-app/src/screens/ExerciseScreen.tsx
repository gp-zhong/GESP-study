import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '../components/Header';
import Card from '../components/Card';
import Tag from '../components/Tag';
import Colors from '../constants/Colors';

// Mock data for exercises
const DIFFICULTY_FILTERS = [
  { id: 'all', label: '全部' },
  { id: 'easy', label: '简单' },
  { id: 'medium', label: '中等' },
  { id: 'hard', label: '困难' },
];

const TYPE_FILTERS = [
  { id: 'all', label: '全部' },
  { id: 'array', label: '数组' },
  { id: 'string', label: '字符串' },
  { id: 'dp', label: '动态规划' },
  { id: 'graph', label: '图论' },
  { id: 'tree', label: '树' },
];

const EXERCISES = [
  {
    id: '101',
    title: '两数之和',
    description: '给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。',
    difficulty: 'easy',
    type: 'array',
  },
  {
    id: '102',
    title: '最长回文子串',
    description: '给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。',
    difficulty: 'medium',
    type: 'string',
  },
  {
    id: '103',
    title: '无重复字符的最长子串',
    description: '给定一个字符串，请你找出其中不含有重复字符的最长子串的长度。',
    difficulty: 'medium',
    type: 'string',
  },
  {
    id: '104',
    title: '最长递增子序列',
    description: '给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。',
    difficulty: 'medium',
    type: 'dp',
  },
  {
    id: '105',
    title: '课程表',
    description: '你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses-1 。在选修某些课程之前需要一些先修课程。',
    difficulty: 'medium',
    type: 'graph',
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
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

const getDifficultyText = (difficulty: string) => {
  switch (difficulty) {
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

const ExerciseScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  const difficultyScrollRef = useRef<FlatList>(null);
  const typeScrollRef = useRef<FlatList>(null);
  
  // Filter exercises based on selected filters and search query
  const filteredExercises = EXERCISES.filter(exercise => {
    const matchesSearch = exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'all' || exercise.type === selectedType;
    
    return matchesSearch && matchesDifficulty && matchesType;
  });

  return (
    <View style={styles.container}>
      <Header title="习题练习" />
      
      <ScrollView style={styles.scrollView}>
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <FontAwesome5 name="search" size={16} color={Colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索习题..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.textSecondary}
          />
        </View>

        {/* Difficulty filters */}
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>难度筛选</Text>
          <FlatList
            ref={difficultyScrollRef}
            data={DIFFICULTY_FILTERS}
            renderItem={({ item }) => (
              <Tag
                label={item.label}
                isActive={selectedDifficulty === item.id}
                onPress={() => setSelectedDifficulty(item.id)}
              />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersList}
          />
        </View>

        {/* Type filters */}
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>类型筛选</Text>
          <FlatList
            ref={typeScrollRef}
            data={TYPE_FILTERS}
            renderItem={({ item }) => (
              <Tag
                label={item.label}
                isActive={selectedType === item.id}
                onPress={() => setSelectedType(item.id)}
              />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersList}
          />
        </View>

        {/* Exercises list */}
        <View style={styles.exercisesContainer}>
          {filteredExercises.map(exercise => (
            <Card
              key={exercise.id}
              onPress={() => navigation.navigate('ExerciseDetail', {
                id: exercise.id,
                title: exercise.title,
                difficulty: exercise.difficulty as 'easy' | 'medium' | 'hard'
              })}
            >
              <View>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                  <View style={[styles.difficultyTag, { backgroundColor: getDifficultyColor(exercise.difficulty) }]}>
                    <Text style={styles.difficultyText}>{getDifficultyText(exercise.difficulty)}</Text>
                  </View>
                </View>
                <Text style={styles.exerciseDescription} numberOfLines={2}>
                  {exercise.description}
                </Text>
              </View>
            </Card>
          ))}

          {filteredExercises.length === 0 && (
            <View style={styles.emptyState}>
              <FontAwesome5 name="search" size={40} color={Colors.border} />
              <Text style={styles.emptyStateText}>没有找到符合条件的习题</Text>
            </View>
          )}
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
  filtersContainer: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.textPrimary,
  },
  filtersList: {
    paddingVertical: 4,
  },
  exercisesContainer: {
    padding: 16,
    paddingTop: 4,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
  },
  difficultyTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  difficultyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  exerciseDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
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
  },
});

export default ExerciseScreen; 