import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FeatureItem from "../components/landing/FeatureItem";
import HeroSection from "../components/landing/HeroSection";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";

const LandingScreen: React.FC = () => {
  const handleLoginPress = (): void => {
    console.log("Entrar pressionado");
  };

  const handleStartPress = (): void => {
    console.log("Começar agora pressionado");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.logoText}>ZelarApp</Text>
          <Pressable onPress={handleLoginPress} style={styles.loginButton}>
            <Text style={styles.loginText}>Entrar</Text>
          </Pressable>
        </View>

        <HeroSection />

        <View style={styles.featuresContainer}>
          <Card style={styles.featureCard}>
            <FeatureItem
              icon="medkit-outline"
              title="Controle de medicamentos"
              description="Lembretes automáticos por horário"
              iconColor={colors.medication}
              iconBackground={colors.medicationBackground}
            />
          </Card>

          <Card style={styles.featureCard}>
            <FeatureItem
              icon="calendar-outline"
              title="Agendamento de exames e consultas"
              description="Organize consultas e exames médicos"
              iconColor={colors.medication}
              iconBackground={colors.medicationBackground}
            />
          </Card>

          <Card style={styles.featureCard}>
            <FeatureItem
              icon="notifications-outline"
              title="Notificações"
              description="Nunca perca um remédio ou consulta"
              iconColor={colors.exam}
              iconBackground={colors.examBackground}
            />
          </Card>
        </View>

        <Button
          title="Começar agora"
          onPress={handleStartPress}
          variant="primary"
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoText: {
    ...typography.heading3,
    color: colors.textPrimary,
    fontSize: 22,
  },
  loginButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  loginText: {
    ...typography.label,
    color: colors.primary,
  },
  featuresContainer: {
    gap: 12,
  },
  featureCard: {
    padding: 14,
  },
});

export default LandingScreen;
