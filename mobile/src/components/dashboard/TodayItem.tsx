import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";

type ItemType = "Appointment" | "Medications";
interface TodayItemPropsBase {
  dotColor: string;
  timeBackgroundColor: string;
  timeTextColor: string;
  mode?: ItemType;
}

export interface TodayItemProps extends TodayItemPropsBase {
  time?: string;
  title?: string;
  subtitle?: string;
  address?: string;
  notes?: string;
  specialty?: string;
  doctorName?: string;
  name?: string;
  dosage?: string;
  frequency?: string;
  scheduleTimes?: string[];
}

const TodayItem: React.FC<TodayItemProps> = ({
  time,
  title,
  subtitle,
  dotColor,
  timeBackgroundColor,
  timeTextColor,
  mode,
  doctorName,
  address,
  notes,
  specialty,
}) => {
  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        timeBadge: {
          backgroundColor: timeBackgroundColor,
        },
        timeText: {
          color: timeTextColor,
        },
        dot: {
          backgroundColor: dotColor,
        },
      }),
    [dotColor, timeBackgroundColor, timeTextColor],
  );

  return mode === "Appointment" ? (
    <View style={styles.container}>
      <View style={[styles.timeBadge, dynamicStyles.timeBadge]}>
        <Text style={[styles.timeText, dynamicStyles.timeText]}>{time}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{`Endereço: ${address}`}</Text>
        <Text style={styles.subtitle}>{`Doutor: ${doctorName}`}</Text>
        <Text style={styles.subtitle}>{`Lembrete: ${notes}`}</Text>
      </View>

      <View style={[styles.dot, dynamicStyles.dot]} />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={[styles.timeBadge, dynamicStyles.timeBadge]}>
        <Text style={[styles.timeText, dynamicStyles.timeText]}>{time}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={[styles.dot, dynamicStyles.dot]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 12,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  timeBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    minWidth: 44,
    alignItems: "center",
  },
  timeText: {
    fontSize: 11,
    fontWeight: "500",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.label,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default TodayItem;
