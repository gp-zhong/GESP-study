import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '../components/Header';
import Card from '../components/Card';
import Tag from '../components/Tag';
import Colors from '../constants/Colors';

// Mock data for exams
const YEAR_FILTERS = [
  { id: 'all', label: '全部' },
  { id: '2023', label: '2023' },
  { id: '2022', label: '2022' },
  { id: '2021', label: '2021' },
  { id: '2020', label: '2020' },
];

const LEVEL_FILTERS = [
  { id: 'all', label: '全部' },
  { id: 'basic', label: '初级' },
  { id: 'intermediate', label: '中级' },
  { id: 'advanced', label: '高级' },
];

const EXAMS = [
  {
    id: '1',
    title: '2023年GESP中级真题',
    date: '2023年6月',
    year: '2023',
    level: 'intermediate',
  },
  {
    id: '2',
    title: '2022年GESP高级真题',
    date: '2022年12月',
    year: '2022',
    level: 'advanced',
  },
  {
    id: '3',
    title: '2022年GESP中级真题',
    date: '2022年6月',
    year: '2022',
    level: 'intermediate',
  },
  {
    id: '4',
    title: '2021年GESP初级真题',
    date: '2021年12月',
    year: '2021',
    level: 'basic',
  },
  {
    id: '5',
    title: '2021年GESP中级真题',
    date: '2021年6月',
    year: '2021',
    level: 'intermediate',
  },
];

const ExamScreen = () => {
  const navigation = useNavigation();
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Filter exams based on selected filters
  const filteredExams = EXAMS.filter(exam => {
    const matchesYear = selectedYear === 'all' || exam.year === selectedYear;
    const matchesLevel = selectedLevel === 'all' || exam.level === selectedLevel;
    return matchesYear && matchesLevel;
  });

  // Render year filter item
  const renderYearItem = ({ item }) => (
    <Tag
      label={item.label}
      isActive={selectedYear === item.id}
      onPress={() => setSelectedYear(item.id)}
    />
  );

  // Render level filter item
  const renderLevelItem = ({ item }) => (
    <Tag
      label={item.label}
      isActive={selectedLevel === item.id}
      onPress={() => setSelectedLevel(item.id)}
    />
  );

  // Get level text
  const getLevelText = (level) => {
    switch (level) {
      case 'basic':
        return '初级';
      case 'intermediate':
        return '中级';
      case 'advanced':
        return '高级';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <Header title="GESP真题" />
      
      <ScrollView style={styles.scrollView}>
        {/* Year filters */}
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>年份</Text>
          <FlatList
            data={YEAR_FILTERS}
            renderItem={renderYearItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersList}
          />
        </View>
        
        {/* Level filters */}
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>级别</Text>
          <FlatList
            data={LEVEL_FILTERS}
            renderItem={renderLevelItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersList}
          />
        </View>
        
        {/* Exams list */}
        <View style={styles.examsContainer}>
          {filteredExams.map(exam => (
            <Card
              key={exam.id}
              onPress={() => 
                navigation.navigate('ExamDetail', {
                  id: exam.id,
                  title: exam.title,
                  year: exam.year,
                  level: exam.level as 'basic' | 'intermediate' | 'advanced'
                })
              }
            >
              <View style={styles.examItem}>
                <Text style={styles.examTitle}>{exam.title}</Text>
                <View style={styles.examDetails}>
                  <Text style={styles.examDate}>考试时间：{exam.date}</Text>
                  <Text style={styles.examLevel}>级别：{getLevelText(exam.level)}</Text>
                </View>
                <View style={styles.examFooter}>
                  <FontAwesome5 
                    name="file-alt" 
                    solid 
                    size={14} 
                    color={Colors.primary} 
                    style={styles.examIcon} 
                  />
                  <Text style={styles.viewExamText}>查看真题</Text>
                </View>
              </View>
            </Card>
          ))}
          
          {filteredExams.length === 0 && (
            <View style={styles.emptyState}>
              <FontAwesome5 name="file-alt" size={40} color={Colors.border} />
              <Text style={styles.emptyStateText}>没有找到符合条件的真题</Text>
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
  filtersContainer: {
    marginVertical: 8,
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
  examsContainer: {
    padding: 16,
  },
  examItem: {
    flex: 1,
  },
  examTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  examDetails: {
    marginBottom: 12,
  },
  examDate: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  examLevel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  examFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  examIcon: {
    marginRight: 6,
  },
  viewExamText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
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

export default ExamScreen; 