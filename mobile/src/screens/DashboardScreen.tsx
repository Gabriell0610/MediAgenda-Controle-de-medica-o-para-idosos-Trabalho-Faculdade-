import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SectionHeader from "../components/dashboard/SectionHeader";
import StatCard from "../components/dashboard/StatCard";
import TodayItem, { TodayItemProps } from "../components/dashboard/TodayItem";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import {
  APPOINTMENTS_TODAY,
  EXAMS_TODAY,
  MEDICATION_TODAY,
} from "../utils/const";
import { fetchApi } from "../service/api";

interface StatSummary {
  value: number;
  label: string;
  backgroundColor: string;
  textColor: string;
}

interface ListMedicationInterface {
  id: string;
  scheduleTimes: string[];
  startDate: string;
  endDate: string;
  frequency: string;
  notes: string;
  userId: string;
  dosage: string;
  name: string;
}
interface ListExamsInterface {
  id: string;
  address: string;
  notes: string;
  date: string;
  name: string;
  userId: string;
  time: string;
  preparation: string;
}

interface ListAppointmentInterface {
  id: string;
  userId: string;
  doctorName: string;
  date: string;
  notes: string;
  time: string;
  updatedAt: string;
  specialty: string;
  address: string;
  createdAt: string;
}

const capitalizeFirstLetter = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const DashboardScreen: React.FC = () => {
  const [userName] = useState<string>("João Silva");

  useEffect(() => {
    async function loadData() {
      try {
        const medications =
          await fetchApi.get<ListMedicationInterface>(MEDICATION_TODAY);

        const appointments =
          await fetchApi.get<ListAppointmentInterface>(APPOINTMENTS_TODAY);

        const exams = await fetchApi.get<ListExamsInterface>(EXAMS_TODAY);

        console.log("Medication: ", medications.data);
        console.log("consultas: ", appointments.data);
        console.log("exames: ", exams.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, []);

  const [stats] = useState<StatSummary[]>([
    {
      value: 3,
      label: "Remédios hoje",
      backgroundColor: "#E1F5EE",
      textColor: "#085041",
    },
    {
      value: 1,
      label: "Exame hoje",
      backgroundColor: "#EEEDFE",
      textColor: "#3C3489",
    },
    {
      value: 2,
      label: "Consultas hoje",
      backgroundColor: "#FAEEDA",
      textColor: "#633806",
    },
  ]);

  const [medicationsToday, setMedicationsToday] = useState<TodayItemProps[]>([
    {
      time: "08:00",
      title: "Losartana 50mg",
      subtitle: "1 comprimido",
      dotColor: colors.primary,
      timeBackgroundColor: "#E1F5EE",
      timeTextColor: "#085041",
    },
    {
      time: "12:00",
      title: "Metformina 850mg",
      subtitle: "1 comprimido",
      dotColor: "#EF9F27",
      timeBackgroundColor: "#FFF4E6",
      timeTextColor: "#633806",
    },
    {
      time: "15:00",
      title: "Consulta cardiologista",
      subtitle: "Dr. Marcos — Clínica Vida",
      dotColor: "#534AB7",
      timeBackgroundColor: "#EEEDFE",
      timeTextColor: "#3C3489",
    },
  ]);

  const [examItems, setItems] = useState<TodayItemProps[]>([
    {
      time: "28 Mai",
      title: "Hemograma completo",
      subtitle: "Lab. São Lucas",
      dotColor: "#534AB7",
      timeBackgroundColor: "#EEEDFE",
      timeTextColor: "#3C3489",
    },
    {
      time: "03 Jun",
      title: "Ecocardiograma",
      subtitle: "Clínica do Coração",
      dotColor: "#534AB7",
      timeBackgroundColor: "#EEEDFE",
      timeTextColor: "#3C3489",
    },
  ]);

  const [appointment, setAppointment] = useState<TodayItemProps[]>([
    {
      time: "28 Mai",
      title: "Hemograma completo",
      address: "Rua leite ribeiro - 23",
      doctorName: "Ricardo",
      notes: "levar exame de sangue",
      specialty: "Endrocrino",
      dotColor: "#cb1958",
      timeBackgroundColor: "#EEEDFE",
      timeTextColor: "#cb1958",
    },
  ]);

  const currentDate = useMemo(() => {
    const formattedDate = new Date().toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    return capitalizeFirstLetter(formattedDate);
  }, []);

  const handleSeeAllExams = (): void => {
    console.log("Ver todos pressionado");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.navigate("Landing")}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color={colors.primary} />
          </Pressable>
          <Text style={styles.greeting}>Bom dia,</Text>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              backgroundColor={stat.backgroundColor}
              textColor={stat.textColor}
            />
          ))}
        </View>

        <View style={styles.body}>
          <SectionHeader title="Remédios" />
          <View style={styles.itemList}>
            {medicationsToday.map((item) => (
              <TodayItem
                key={`${item.time}-${item.title}`}
                time={item.time}
                title={item.title}
                subtitle={item.subtitle}
                dotColor={item.dotColor}
                timeBackgroundColor={item.timeBackgroundColor}
                timeTextColor={item.timeTextColor}
              />
            ))}
          </View>

          <SectionHeader
            title="Exames"
            actionLabel="Ver todos"
            onActionPress={handleSeeAllExams}
          />
          <View style={styles.itemList}>
            {examItems.map((item) => (
              <TodayItem
                key={`${item.time}-${item.title}`}
                time={item.time}
                title={item.title}
                subtitle={item.subtitle}
                dotColor={item.dotColor}
                timeBackgroundColor={item.timeBackgroundColor}
                timeTextColor={item.timeTextColor}
              />
            ))}
          </View>

          <SectionHeader
            title="Consultas"
            actionLabel="Ver todos"
            onActionPress={handleSeeAllExams}
          />
          <View style={styles.itemList}>
            {appointment.map((item) => (
              <TodayItem
                key={`${item.time}-${item.title}`}
                mode="Appointment"
                time={item.time}
                title={item.title}
                doctorName={item.doctorName}
                notes={item.notes}
                specialty={item.specialty}
                address={item.address}
                dotColor={item.dotColor}
                timeBackgroundColor={item.timeBackgroundColor}
                timeTextColor={item.timeTextColor}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 16,
    paddingVertical: 2,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    ...typography.caption,
    color: "rgba(255,255,255,0.8)",
  },
  userName: {
    ...typography.heading2,
    color: colors.white,
    marginTop: 2,
  },
  date: {
    ...typography.caption,
    color: "rgba(255,255,255,0.75)",
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: -20,
    marginHorizontal: 20,
  },
  body: {
    paddingHorizontal: 20,
  },
  itemList: {
    gap: 10,
  },
});

export default DashboardScreen;
