import { StyleSheet, Text, View } from "react-native";
import React, { Fragment } from "react";
import bottomBarItems from "@/constants/bottom-bar-items";
import BottomBarItem from "./bottom-bar-item";
import { usePathname } from "expo-router";

const BottomBar = () => {
  const pathname = usePathname();
  return (
    <View style={styles.wrapper}>
      {bottomBarItems.map((item, index) => {
        return (
          <BottomBarItem
            middle={item.middle}
            href={item.href}
            key={index}
            active={pathname == item.href}
            Icon={item.icon}
            name={!item.middle ? item.name : ""}
          />
        );
      })}
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    marginTop:"auto",
    marginBottom:6,
    flexDirection: "row",
    backgroundColor: "#fff",
    gap: 30,
    width:"90%",
    marginHorizontal:"auto",
    borderRadius:60,
    // borderTopColor: "rgba(0,0,0,0.05)",
    // borderTopWidth: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
