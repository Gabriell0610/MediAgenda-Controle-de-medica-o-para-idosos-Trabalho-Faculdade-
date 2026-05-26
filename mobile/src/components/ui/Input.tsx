import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean | 'true' | 'false';
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const secureEntry: boolean =
    secureTextEntry === true || secureTextEntry === 'true';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={secureEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[styles.input, isFocused ? styles.inputFocused : styles.inputDefault]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  input: {
    ...typography.body,
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: colors.textPrimary,
    borderWidth: 0.5,
  },
  inputDefault: {
    borderColor: colors.border,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
});

export default Input;
