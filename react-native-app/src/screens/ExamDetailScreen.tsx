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
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '../components/Header';
import Colors from '../constants/Colors';

// Mock data for exam questions
const EXAM_QUESTIONS = [
  {
    id: '1',
    number: 1,
    content: '以下关于软件工程中需求分析的说法，错误的是？',
    options: [
      { id: 'A', text: '需求分析是软件开发的第一步' },
      { id: 'B', text: '需求分析应该关注系统做什么，而不是怎么做' },
      { id: 'C', text: '需求分析的结果只需要开发人员理解即可' },
      { id: 'D', text: '需求分析应该包括功能性需求和非功能性需求' },
    ],
    correctAnswer: 'C',
    difficulty: 'medium',
    explanation: '需求分析的结果需要得到所有利益相关者的理解和认可，而不仅仅是开发人员。这是需求分析阶段的一个重要原则，确保系统最终能满足用户的实际需求。',
  },
  {
    id: '2',
    number: 2,
    content: '在软件测试中，以下哪种测试方法主要关注程序内部结构和逻辑？',
    options: [
      { id: 'A', text: '黑盒测试' },
      { id: 'B', text: '白盒测试' },
      { id: 'C', text: '灰盒测试' },
      { id: 'D', text: '集成测试' },
    ],
    correctAnswer: 'B',
    difficulty: 'easy',
    explanation: '白盒测试是基于程序内部结构和逻辑的测试方法，测试人员需要了解代码的内部结构和工作原理。黑盒测试关注功能而不关注内部实现，灰盒测试是两者的结合，集成测试则关注模块之间的交互。',
  },
  {
    id: '3',
    number: 3,
    content: '在敏捷开发中，以下哪个不是Scrum框架中的核心角色？',
    options: [
      { id: 'A', text: 'Scrum Master' },
      { id: 'B', text: 'Product Owner' },
      { id: 'C', text: 'Developer' },
      { id: 'D', text: 'Project Manager' },
    ],
    correctAnswer: 'D',
    difficulty: 'medium',
    explanation: 'Scrum框架中的三个核心角色是Scrum Master（负责确保团队遵循Scrum流程）、Product Owner（负责定义产品需求和优先级）和Development Team（负责实现功能）。传统的Project Manager角色在Scrum中被分散到了这三个角色中。',
  },
];

const ExamDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, id } = route.params as { title: string; id: string };
  
  const [selectedQuestion, setSelectedQuestion] = useState(EXAM_QUESTIONS[0]);
  const [userAnswers, setUserAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScoreRevealed, setIsScoreRevealed] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [showAiAnalysis, setShowAiAnalysis] = useState(false);
  
  // Handle selecting a question
  const handleSelectQuestion = (question) => {
    setSelectedQuestion(question);
  };
  
  // Handle selecting an answer
  const handleSelectAnswer = (questionId, optionId) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };
  
  // Handle toggling explanation
  const handleToggleExplanation = (questionId) => {
    setShowExplanation(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };
  
  // Submit exam
  const handleSubmitExam = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsScoreRevealed(true);
      
      // Mock AI analysis
      setAiAnalysis(
        '根据你的答题情况，我发现你对软件工程基础概念理解良好，但在敏捷开发方法论方面还有提升空间。\n\n' +
        '建议重点学习：\n' +
        '1. 敏捷开发中的角色和职责\n' +
        '2. 需求分析的利益相关者沟通原则\n' +
        '3. 白盒测试和黑盒测试的应用场景\n\n' +
        '你在选择题解答时的思路基本正确，但建议在做选择题时更仔细地分析每个选项，排除法有时比直接选择更有效。'
      );
    }, 2000);
  };
  
  // Calculate score
  const calculateScore = () => {
    let correct = 0;
    EXAM_QUESTIONS.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return `${correct}/${EXAM_QUESTIONS.length}`;
  };
  
  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
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
  
  // Get difficulty text
  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return '简单';
      case 'medium':
        return '中等';
      case 'hard':
        return '困难';
      default:
        return '';
    }
  };
  
  return (
    <View style={styles.container}>
      <Header title={title} showBackButton />
      
      <View style={styles.content}>
        {/* Questions sidebar */}
        <View style={styles.sidebar}>
          <ScrollView>
            {EXAM_QUESTIONS.map(question => (
              <TouchableOpacity
                key={question.id}
                style={[
                  styles.questionTab,
                  selectedQuestion.id === question.id && styles.activeQuestionTab,
                  isScoreRevealed && userAnswers[question.id] === question.correctAnswer && styles.correctQuestionTab,
                  isScoreRevealed && userAnswers[question.id] !== question.correctAnswer && userAnswers[question.id] && styles.incorrectQuestionTab
                ]}
                onPress={() => handleSelectQuestion(question)}
              >
                <Text 
                  style={[
                    styles.questionNumber,
                    selectedQuestion.id === question.id && styles.activeQuestionNumber,
                    isScoreRevealed && userAnswers[question.id] === question.correctAnswer && styles.correctQuestionNumber,
                    isScoreRevealed && userAnswers[question.id] !== question.correctAnswer && userAnswers[question.id] && styles.incorrectQuestionNumber
                  ]}
                >
                  {question.number}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Question content */}
        <ScrollView style={styles.questionContent}>
          {/* Current question */}
          <View style={styles.questionContainer}>
            <View style={styles.questionHeader}>
              <Text style={styles.questionTitle}>
                问题 {selectedQuestion.number}
              </Text>
              <View style={styles.difficultyBadge}>
                <Text style={[
                  styles.difficultyText,
                  { color: getDifficultyColor(selectedQuestion.difficulty) }
                ]}>
                  {getDifficultyText(selectedQuestion.difficulty)}
                </Text>
              </View>
            </View>
            
            <Text style={styles.questionText}>
              {selectedQuestion.content}
            </Text>
            
            {/* Options */}
            <View style={styles.optionsContainer}>
              {selectedQuestion.options.map(option => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionItem,
                    userAnswers[selectedQuestion.id] === option.id && styles.selectedOption,
                    isScoreRevealed && option.id === selectedQuestion.correctAnswer && styles.correctOption,
                    isScoreRevealed && userAnswers[selectedQuestion.id] === option.id && 
                      option.id !== selectedQuestion.correctAnswer && styles.incorrectOption
                  ]}
                  onPress={() => !isScoreRevealed && handleSelectAnswer(selectedQuestion.id, option.id)}
                  disabled={isScoreRevealed}
                >
                  <Text style={[
                    styles.optionLetter,
                    userAnswers[selectedQuestion.id] === option.id && styles.selectedOptionText,
                    isScoreRevealed && option.id === selectedQuestion.correctAnswer && styles.correctOptionText,
                    isScoreRevealed && userAnswers[selectedQuestion.id] === option.id && 
                      option.id !== selectedQuestion.correctAnswer && styles.incorrectOptionText
                  ]}>
                    {option.id}
                  </Text>
                  <Text style={[
                    styles.optionText,
                    userAnswers[selectedQuestion.id] === option.id && styles.selectedOptionText,
                    isScoreRevealed && option.id === selectedQuestion.correctAnswer && styles.correctOptionText,
                    isScoreRevealed && userAnswers[selectedQuestion.id] === option.id && 
                      option.id !== selectedQuestion.correctAnswer && styles.incorrectOptionText
                  ]}>
                    {option.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Explanation */}
            {isScoreRevealed && (
              <View>
                <TouchableOpacity 
                  style={styles.explanationButton}
                  onPress={() => handleToggleExplanation(selectedQuestion.id)}
                >
                  <Text style={styles.explanationButtonText}>
                    {showExplanation[selectedQuestion.id] ? '隐藏解析' : '查看解析'}
                  </Text>
                  <FontAwesome5 
                    name={showExplanation[selectedQuestion.id] ? 'chevron-up' : 'chevron-down'} 
                    size={14} 
                    color={Colors.primary} 
                  />
                </TouchableOpacity>
                
                {showExplanation[selectedQuestion.id] && (
                  <View style={styles.explanationContainer}>
                    <Text style={styles.explanationText}>
                      {selectedQuestion.explanation}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
          
          {/* Results section */}
          {isScoreRevealed && (
            <View style={styles.resultsContainer}>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreLabel}>得分</Text>
                <Text style={styles.scoreValue}>{calculateScore()}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.aiAnalysisButton}
                onPress={() => setShowAiAnalysis(!showAiAnalysis)}
              >
                <FontAwesome5 
                  name="robot" 
                  size={18} 
                  color={Colors.primary} 
                  style={styles.aiIcon}
                />
                <Text style={styles.aiAnalysisButtonText}>
                  {showAiAnalysis ? '隐藏AI分析' : '查看AI分析'}
                </Text>
                <FontAwesome5 
                  name={showAiAnalysis ? 'chevron-up' : 'chevron-down'} 
                  size={14} 
                  color={Colors.primary} 
                />
              </TouchableOpacity>
              
              {showAiAnalysis && (
                <View style={styles.aiAnalysisContainer}>
                  <Text style={styles.aiAnalysisText}>
                    {aiAnalysis}
                  </Text>
                </View>
              )}
            </View>
          )}
          
          {/* Submit button */}
          {!isScoreRevealed && (
            <TouchableOpacity 
              style={[
                styles.submitButton,
                Object.keys(userAnswers).length < EXAM_QUESTIONS.length && styles.disabledButton
              ]}
              onPress={handleSubmitExam}
              disabled={Object.keys(userAnswers).length < EXAM_QUESTIONS.length || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>提交答案</Text>
              )}
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 60,
    backgroundColor: Colors.cardBackground,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  questionTab: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeQuestionTab: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  correctQuestionTab: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  incorrectQuestionTab: {
    backgroundColor: Colors.error,
    borderColor: Colors.error,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  activeQuestionNumber: {
    color: 'white',
  },
  correctQuestionNumber: {
    color: 'white',
  },
  incorrectQuestionNumber: {
    color: 'white',
  },
  questionContent: {
    flex: 1,
    padding: 16,
  },
  questionContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: Colors.backgroundSecondary,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  questionText: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
    marginBottom: 16,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: Colors.background,
  },
  selectedOption: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}10`,
  },
  correctOption: {
    borderColor: Colors.success,
    backgroundColor: `${Colors.success}10`,
  },
  incorrectOption: {
    borderColor: Colors.error,
    backgroundColor: `${Colors.error}10`,
  },
  optionLetter: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    width: 30,
  },
  optionText: {
    fontSize: 16,
    color: Colors.textPrimary,
    flex: 1,
  },
  selectedOptionText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  correctOptionText: {
    color: Colors.success,
    fontWeight: '500',
  },
  incorrectOptionText: {
    color: Colors.error,
    fontWeight: '500',
  },
  explanationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginTop: 8,
  },
  explanationButtonText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginRight: 4,
  },
  explanationContainer: {
    backgroundColor: `${Colors.primary}10`,
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  explanationText: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  resultsContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 12,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  aiAnalysisButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  aiIcon: {
    marginRight: 8,
  },
  aiAnalysisButtonText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginRight: 4,
    flex: 1,
    textAlign: 'center',
  },
  aiAnalysisContainer: {
    backgroundColor: `${Colors.primary}10`,
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  aiAnalysisText: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  disabledButton: {
    backgroundColor: Colors.border,
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default ExamDetailScreen; 