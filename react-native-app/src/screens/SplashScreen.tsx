import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>CCF-GESP</Text>
      <Text style={styles.subtitle}>学习助手</Text>
      <ActivityIndicator 
        style={styles.loader} 
        size="large" 
        color={Colors.primary} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 60,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen; 