import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { View, Text, ActivityIndicator } from 'react-native';

// Screens
import KnowledgeScreen from './src/screens/KnowledgeScreen';
import ExerciseScreen from './src/screens/ExerciseScreen';
import DiscussionScreen from './src/screens/DiscussionScreen';
import ExamScreen from './src/screens/ExamScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SplashScreen from './src/screens/SplashScreen';
import KnowledgeDetailScreen from './src/screens/KnowledgeDetailScreen';
import ExerciseDetailScreen from './src/screens/ExerciseDetailScreen';
import QuestionDetailScreen from './src/screens/QuestionDetailScreen';
import ExamDetailScreen from './src/screens/ExamDetailScreen';
import ApiSettingsScreen from './src/screens/ApiSettingsScreen';
import AskQuestionScreen from './src/screens/AskQuestionScreen';

// Constants
import Colors from './src/constants/Colors';
import { RootStackParamList, BottomTabParamList } from './src/types/navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Knowledge"
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Knowledge"
        component={KnowledgeScreen}
        options={{
          tabBarLabel: "知识点",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{
          tabBarLabel: "习题",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="code" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Discussion"
        component={DiscussionScreen}
        options={{
          tabBarLabel: "讨论",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="question-answer" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Exam"
        component={ExamScreen}
        options={{
          tabBarLabel: "真题",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="file-alt" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "我的",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Load fonts and other resources
  useEffect(() => {
    async function loadResources() {
      try {
        await Font.loadAsync({
          'Noto-Sans-SC': require('./src/assets/fonts/NotoSansSC-Regular.otf'),
          'Noto-Sans-SC-Bold': require('./src/assets/fonts/NotoSansSC-Bold.otf'),
        });
      } catch (e) {
        console.warn('Error loading assets:', e);
      } finally {
        setIsReady(true);
        // Hide splash screen after a delay
        setTimeout(() => {
          setShowSplash(false);
        }, 2000);
      }
    }

    loadResources();
  }, []);

  if (!isReady || showSplash) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="KnowledgeDetail" component={KnowledgeDetailScreen} />
          <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
          <Stack.Screen name="QuestionDetail" component={QuestionDetailScreen} />
          <Stack.Screen name="ExamDetail" component={ExamDetailScreen} />
          <Stack.Screen name="ApiSettings" component={ApiSettingsScreen} />
          <Stack.Screen name="AskQuestion" component={AskQuestionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 