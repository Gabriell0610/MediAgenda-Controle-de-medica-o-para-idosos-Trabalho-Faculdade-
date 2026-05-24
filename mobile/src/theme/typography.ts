import { TextStyle } from "react-native";

interface Typography {
  heading1: TextStyle;
  heading2: TextStyle;
  heading3: TextStyle;
  body: TextStyle;
  caption: TextStyle;
  label: TextStyle;
}

export const typography: Typography = {
  heading1: {
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 38,
  },
  heading2: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 32,
  },
  heading3: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  caption: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
};
