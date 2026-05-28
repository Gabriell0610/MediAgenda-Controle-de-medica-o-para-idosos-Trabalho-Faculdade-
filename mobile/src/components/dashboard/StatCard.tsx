import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { typography } from '../../theme/typography';

interface StatCardProps {
  value: number;
  label: string;
  backgroundColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  backgroundColor,
  textColor,
}) => {
  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor,
        },
        text: {
          color: textColor,
        },
      }),
    [backgroundColor, textColor],
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.value, dynamicStyles.text]}>{value}</Text>
      <Text style={[styles.label, dynamicStyles.text]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
  },
  value: {
    fontSize: 24,
    fontWeight: '500',
  },
  label: {
    ...typography.caption,
    opacity: 0.8,
    marginTop: 2,
  },
});

export default StatCard;
