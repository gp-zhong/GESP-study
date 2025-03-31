import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';

// Import screens
import KnowledgeScreen from './screens/KnowledgeScreen';
import KnowledgeDetailScreen from './screens/KnowledgeDetailScreen';
import ExerciseScreen from './screens/ExerciseScreen';
import ExerciseDetailScreen from './screens/ExerciseDetailScreen';
import DiscussionScreen from './screens/DiscussionScreen';
import DiscussionDetailScreen from './screens/DiscussionDetailScreen';
import ExamScreen from './screens/ExamScreen';
import ExamDetailScreen from './screens/ExamDetailScreen';
import SettingsScreen from './screens/SettingsScreen';

// Import theme
import Colors from './constants/Colors';

// Create navigators
const Tab = createBottomTabNavigator();
const KnowledgeStack = createStackNavigator();
const ExerciseStack = createStackNavigator();
const DiscussionStack = createStackNavigator();
const ExamStack = createStackNavigator();
const SettingsStack = createStackNavigator();

// Knowledge stack navigator
const KnowledgeStackNavigator = () => (
  <KnowledgeStack.Navigator screenOptions={{ headerShown: false }}>
    <KnowledgeStack.Screen name="KnowledgeList" component={KnowledgeScreen} />
    <KnowledgeStack.Screen name="KnowledgeDetail" component={KnowledgeDetailScreen} />
  </KnowledgeStack.Navigator>
);

// Exercise stack navigator
const ExerciseStackNavigator = () => (
  <ExerciseStack.Navigator screenOptions={{ headerShown: false }}>
    <ExerciseStack.Screen name="ExerciseList" component={ExerciseScreen} />
    <ExerciseStack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
  </ExerciseStack.Navigator>
);

// Discussion stack navigator
const DiscussionStackNavigator = () => (
  <DiscussionStack.Navigator screenOptions={{ headerShown: false }}>
    <DiscussionStack.Screen name="DiscussionList" component={DiscussionScreen} />
    <DiscussionStack.Screen name="DiscussionDetail" component={DiscussionDetailScreen} />
  </DiscussionStack.Navigator>
);

// Exam stack navigator
const ExamStackNavigator = () => (
  <ExamStack.Navigator screenOptions={{ headerShown: false }}>
    <ExamStack.Screen name="ExamList" component={ExamScreen} />
    <ExamStack.Screen name="ExamDetail" component={ExamDetailScreen} />
  </ExamStack.Navigator>
);

// Settings stack navigator
const SettingsStackNavigator = () => (
  <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
    <SettingsStack.Screen name="SettingsList" component={SettingsScreen} />
  </SettingsStack.Navigator>
);

// Custom tab bar icon
const TabIcon = ({ name, color }) => (
  <FontAwesome5 name={name} size={22} color={color} solid />
);

// Custom tab bar label
const TabLabel = ({ label, color }) => (
  <Text style={[styles.tabLabel, { color }]}>{label}</Text>
);

// Main app component
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <SafeAreaView style={styles.safeArea}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.textSecondary,
            tabBarStyle: styles.tabBar,
            tabBarHideOnKeyboard: true,
          }}
        >
          <Tab.Screen 
            name="Knowledge" 
            component={KnowledgeStackNavigator} 
            options={{
              tabBarIcon: ({ color }) => <TabIcon name="book" color={color} />,
              tabBarLabel: ({ color }) => <TabLabel label="知识点" color={color} />,
            }}
          />
          <Tab.Screen 
            name="Exercise" 
            component={ExerciseStackNavigator} 
            options={{
              tabBarIcon: ({ color }) => <TabIcon name="pencil-alt" color={color} />,
              tabBarLabel: ({ color }) => <TabLabel label="习题" color={color} />,
            }}
          />
          <Tab.Screen 
            name="Discussion" 
            component={DiscussionStackNavigator} 
            options={{
              tabBarIcon: ({ color }) => <TabIcon name="comments" color={color} />,
              tabBarLabel: ({ color }) => <TabLabel label="讨论" color={color} />,
            }}
          />
          <Tab.Screen 
            name="Exam" 
            component={ExamStackNavigator} 
            options={{
              tabBarIcon: ({ color }) => <TabIcon name="file-alt" color={color} />,
              tabBarLabel: ({ color }) => <TabLabel label="真题" color={color} />,
            }}
          />
          <Tab.Screen 
            name="Settings" 
            component={SettingsStackNavigator} 
            options={{
              tabBarIcon: ({ color }) => <TabIcon name="cog" color={color} />,
              tabBarLabel: ({ color }) => <TabLabel label="设置" color={color} />,
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabBar: {
    backgroundColor: Colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});

export default App; 