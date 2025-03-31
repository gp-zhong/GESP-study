import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  StyleProp, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import Colors from '../constants/Colors';

interface TagProps {
  label: string;
  isActive?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const Tag: React.FC<TagProps> = ({ 
  label, 
  isActive = false, 
  style, 
  textStyle, 
  onPress 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive && styles.activeContainer,
        style
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <Text 
        style={[
          styles.label,
          isActive && styles.activeLabel,
          textStyle
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: Colors.backgroundSecondary,
  },
  activeContainer: {
    backgroundColor: Colors.primary,
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  activeLabel: {
    color: 'white',
  },
});

export default Tag; 