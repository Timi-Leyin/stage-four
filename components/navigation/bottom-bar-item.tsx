import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
  useColorScheme,
} from "react-native";
import React from "react";
import { ThemedText } from "../themed/themed-text";
import { Icon as IconType } from "iconsax-react-native";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Colors, primaryColor } from "@/constants/colors";
import { router, usePathname, useRouter } from "expo-router";

interface BottomBarItemProps {
  active?: boolean;
  name?: string;
  Icon: IconType;
  middle: boolean;
  href: string;
}

const BottomBarItem = ({
  active = false,
  href,
  middle = false,
  name = "",
  Icon,
}: BottomBarItemProps) => {
  const theme = useColorScheme() ?? "light";
  const accent = Colors[theme].text;
  const activeColor = Colors[theme].primary;

  const pathname = usePathname();
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        if (pathname == href) return;
        Vibration.vibrate(60);
        router.navigate(href);
      }}
      style={[styles.content, middle && styles.middleNav]}
      activeOpacity={pathname == href ? 1 : 0.5}
    >
      {
        <Icon
        size={middle?15:20}
          variant={active ? "Bold" : "Outline"}
          color={middle ? "white" : active ? activeColor : accent}
        />
      }
      {!middle && (
        <ThemedText
          type={"defaultSemiBold"}
          style={[
            {
              color: active ? activeColor : accent,
              fontSize: 10,
            },
          ]}
        >
          {name}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
};

export default BottomBarItem;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  middleNav: {
    flex: 1,
    backgroundColor: primaryColor,
    width: 65,
    marginTop:-5,
    transform:[{
        scale:1.3
    }],
    height: 45,
    padding: 6,
    borderRadius: 40,
  },
  middleNavText: {},
});
