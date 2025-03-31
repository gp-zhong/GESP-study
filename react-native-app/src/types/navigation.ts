import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Knowledge Stack Params
export type KnowledgeStackParamList = {
  KnowledgeList: undefined;
  KnowledgeDetail: {
    id: string;
    title: string;
    topic: string;
  };
};

export type KnowledgeScreenNavigationProp = StackNavigationProp<KnowledgeStackParamList, 'KnowledgeList'>;
export type KnowledgeDetailScreenNavigationProp = StackNavigationProp<KnowledgeStackParamList, 'KnowledgeDetail'>;
export type KnowledgeDetailScreenRouteProp = RouteProp<KnowledgeStackParamList, 'KnowledgeDetail'>;

// Exercise Stack Params
export type ExerciseStackParamList = {
  ExerciseList: undefined;
  ExerciseDetail: {
    id: string;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
  };
};

export type ExerciseScreenNavigationProp = StackNavigationProp<ExerciseStackParamList, 'ExerciseList'>;
export type ExerciseDetailScreenNavigationProp = StackNavigationProp<ExerciseStackParamList, 'ExerciseDetail'>;
export type ExerciseDetailScreenRouteProp = RouteProp<ExerciseStackParamList, 'ExerciseDetail'>;

// Discussion Stack Params
export type DiscussionStackParamList = {
  DiscussionList: undefined;
  DiscussionDetail: {
    id: string;
    title: string;
    author: string;
    content: string;
    timestamp: string;
    topic: string;
  };
};

export type DiscussionScreenNavigationProp = StackNavigationProp<DiscussionStackParamList, 'DiscussionList'>;
export type DiscussionDetailScreenNavigationProp = StackNavigationProp<DiscussionStackParamList, 'DiscussionDetail'>;
export type DiscussionDetailScreenRouteProp = RouteProp<DiscussionStackParamList, 'DiscussionDetail'>;

// Exam Stack Params
export type ExamStackParamList = {
  ExamList: undefined;
  ExamDetail: {
    id: string;
    title: string;
    year: string;
    level: 'basic' | 'intermediate' | 'advanced';
  };
};

export type ExamScreenNavigationProp = StackNavigationProp<ExamStackParamList, 'ExamList'>;
export type ExamDetailScreenNavigationProp = StackNavigationProp<ExamStackParamList, 'ExamDetail'>;
export type ExamDetailScreenRouteProp = RouteProp<ExamStackParamList, 'ExamDetail'>;

// Root Stack Params (combining all stacks)
export type RootStackParamList = {
  Knowledge: undefined;
  Exercise: undefined;
  Discussion: undefined;
  Exam: undefined;
  Settings: undefined;
};

// Declare type for each route's navigation prop
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 