import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type IoniconName = keyof typeof Ionicons.glyphMap;

interface FeatureItemProps {
  icon: IoniconName;
  title: string;
  description: string;
  iconColor: string;
  iconBackground: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
  iconColor,
  iconBackground,
}) => {
  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        iconContainer: {
          backgroundColor: iconBackground,
        },
        iconColor: {
          color: iconColor,
        },
      }),
    [iconBackground, iconColor],
  );

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainerBase, dynamicStyles.iconContainer]}>
        <Ionicons name={icon} size={22} style={dynamicStyles.iconColor} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  iconContainerBase: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.heading3,
    fontSize: 17,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  description: {
    ...typography.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
    marginTop: 2,
  },
});

export default FeatureItem;
