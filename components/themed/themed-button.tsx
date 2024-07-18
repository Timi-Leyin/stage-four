import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
  type ViewProps,
} from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedText } from "./themed-text";
import { primaryColor } from "@/constants/colors";
import { FONTS } from "@/constants/fonts";

export type ThemedButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  outline?: boolean;
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  children,
  outline = false,
  ...otherProps
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const OUTLINE_WIDTH = 1;
const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderRadius: 30,
    marginVertical: 20,
    backgroundColor: primaryColor,
  },
  outlineButton: {
    padding: 10,
    paddingHorizontal:30,
    borderRadius: 20,
    marginVertical: 20,
    borderColor: primaryColor,
    borderStartWidth: OUTLINE_WIDTH,
    borderEndWidth: OUTLINE_WIDTH,
    borderTopWidth: OUTLINE_WIDTH,
    borderBottomWidth: OUTLINE_WIDTH,
  },
  btnText: {
    textAlign: "center",
    color: outline ? "#000" :"#fff",
    fontSize: 12,
      fontFamily: FONTS.Bold,
    //   fontWeight: "normal",
  },
});


  return (
    <TouchableOpacity
      activeOpacity={0.5}
      {...otherProps}
      style={[
        { backgroundColor },
        outline ? styles.outlineButton : styles.button,
        style,
      ]}
    >
      <ThemedText type="defaultSemiBold" style={styles.btnText}>
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
}

