import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  fullWidth = false,
}) => {
  const containerVariantStyle =
    variant === 'outline'
      ? styles.containerOutline
      : variant === 'ghost'
        ? styles.containerGhost
        : styles.containerPrimary;

  const textVariantStyle =
    variant === 'outline'
      ? styles.textOutline
      : variant === 'ghost'
        ? styles.textGhost
        : styles.textPrimary;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.containerBase,
        containerVariantStyle,
        fullWidth ? styles.fullWidth : styles.autoWidth,
        pressed ? styles.pressed : styles.defaultOpacity,
      ]}
    >
      <Text style={[styles.textBase, textVariantStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerBase: {
    minHeight: 48,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  containerPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  containerOutline: {
    backgroundColor: 'transparent',
    borderColor: colors.primary,
  },
  containerGhost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  textBase: {
    ...typography.label,
  },
  textPrimary: {
    color: colors.white,
  },
  textOutline: {
    color: colors.primary,
  },
  textGhost: {
    color: colors.primary,
  },
  fullWidth: {
    width: '100%',
  },
  autoWidth: {
    alignSelf: 'flex-start',
  },
  pressed: {
    opacity: 0.8,
  },
  defaultOpacity: {
    opacity: 1,
  },
});

export default Button;
