import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Colors from '../constants/Colors';

// DeepSeek model options
const MODEL_OPTIONS = [
  { id: 'deepseek-coder', label: 'DeepSeek Coder' },
  { id: 'deepseek-chat', label: 'DeepSeek Chat' },
  { id: 'deepseek-llm', label: 'DeepSeek LLM' },
];

const SettingsScreen = () => {
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('https://api.deepseek.com/v1');
  const [selectedModel, setSelectedModel] = useState('deepseek-chat');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  
  // Load settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);
  
  // Load saved settings from AsyncStorage
  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('appSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setApiKey(settings.apiKey || '');
        setEndpoint(settings.endpoint || 'https://api.deepseek.com/v1');
        setSelectedModel(settings.selectedModel || 'deepseek-chat');
        setIsDarkMode(settings.isDarkMode || false);
        setIsOfflineMode(settings.isOfflineMode || false);
        setAutoSave(settings.autoSave !== undefined ? settings.autoSave : true);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };
  
  // Save settings to AsyncStorage
  const saveSettings = async () => {
    setIsSaving(true);
    try {
      const settings = {
        apiKey,
        endpoint,
        selectedModel,
        isDarkMode,
        isOfflineMode,
        autoSave,
      };
      await AsyncStorage.setItem('appSettings', JSON.stringify(settings));
      setTimeout(() => {
        setIsSaving(false);
        Alert.alert('成功', '设置已保存');
      }, 800);
    } catch (error) {
      setIsSaving(false);
      Alert.alert('错误', '保存设置失败');
      console.error('Failed to save settings:', error);
    }
  };
  
  // Test API connection
  const testConnection = () => {
    if (!apiKey) {
      Alert.alert('错误', '请先输入API密钥');
      return;
    }
    
    setIsTesting(true);
    // Simulate API test
    setTimeout(() => {
      setIsTesting(false);
      Alert.alert('连接成功', '成功连接到DeepSeek API');
    }, 2000);
  };
  
  return (
    <View style={styles.container}>
      <Header title="设置" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DeepSeek API配置</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>API密钥</Text>
            <TextInput
              style={styles.input}
              value={apiKey}
              onChangeText={setApiKey}
              placeholder="输入DeepSeek API密钥"
              placeholderTextColor={Colors.textSecondary}
              secureTextEntry
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>API端点</Text>
            <TextInput
              style={styles.input}
              value={endpoint}
              onChangeText={setEndpoint}
              placeholder="输入API端点URL"
              placeholderTextColor={Colors.textSecondary}
              keyboardType="url"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>模型选择</Text>
            <View style={styles.modelOptions}>
              {MODEL_OPTIONS.map(option => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.modelOption,
                    selectedModel === option.id && styles.selectedModelOption
                  ]}
                  onPress={() => setSelectedModel(option.id)}
                >
                  <Text 
                    style={[
                      styles.modelOptionText,
                      selectedModel === option.id && styles.selectedModelOptionText
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.testButton} 
            onPress={testConnection}
            disabled={isTesting}
          >
            {isTesting ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <FontAwesome5 name="plug" size={16} color="white" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>测试连接</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>应用设置</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <FontAwesome5 name="moon" size={16} color={Colors.textPrimary} style={styles.settingIcon} />
              <Text style={styles.settingLabel}>深色模式</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor="white"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <FontAwesome5 name="wifi-slash" size={16} color={Colors.textPrimary} style={styles.settingIcon} />
              <Text style={styles.settingLabel}>离线模式</Text>
            </View>
            <Switch
              value={isOfflineMode}
              onValueChange={setIsOfflineMode}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor="white"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <FontAwesome5 name="save" size={16} color={Colors.textPrimary} style={styles.settingIcon} />
              <Text style={styles.settingLabel}>自动保存答题记录</Text>
            </View>
            <Switch
              value={autoSave}
              onValueChange={setAutoSave}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor="white"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>关于</Text>
          
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>版本</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>开发者</Text>
            <Text style={styles.aboutValue}>CCF-GESP 学习团队</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={saveSettings}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <>
              <FontAwesome5 name="save" size={16} color="white" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>保存设置</Text>
            </>
          )}
        </TouchableOpacity>
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
    paddingHorizontal: 16,
  },
  section: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  modelOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  modelOption: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedModelOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  modelOptionText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  selectedModelOptionText: {
    color: 'white',
    fontWeight: '500',
  },
  testButton: {
    backgroundColor: Colors.info,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  aboutLabel: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  aboutValue: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default SettingsScreen; 