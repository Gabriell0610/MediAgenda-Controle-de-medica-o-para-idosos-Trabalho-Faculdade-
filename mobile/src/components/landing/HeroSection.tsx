import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";

const HeroSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="heart" size={32} color={colors.heroText} />
      </View>

      <Text style={styles.title}>Cuidar é um ato de amor</Text>
      <Text style={styles.subtitle}>
        Gerencie medicamentos, consultas e exames de quem você ama
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.heroBackground,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    ...typography.heading2,
    color: colors.heroText,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    color: colors.heroText,
    textAlign: "center",
    opacity: 0.92,
  },
});

export default HeroSection;
