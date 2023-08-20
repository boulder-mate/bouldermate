import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { EmulateHeader } from "./EmulatedHeader";

export const TopTabBar = ({ state, descriptors, navigation, onBack }: any) => {
  return (
    <View style={styles.container}>
      <EmulateHeader onBack={onBack} headerRight={undefined} />
      <View style={styles.main}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              onPress={onPress}
              key={label}
              style={[
                styles.section,
                {
                  backgroundColor: isFocused ? "red" : "#FFF",
                  borderBottomWidth: isFocused ? 1 : 0.5,
                  borderBottomColor: isFocused ? "black" : "#AAA",
                },
              ]}
            >
              <Text
                style={[
                  styles.sectionText,
                  { color: isFocused ? "white" : "black" },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  main: {
    flexDirection: "row",
  },
  section: {
    flex: 1,
    paddingVertical: 15,
    alignContent: "center",
    justifyContent: "center",
    borderBottomColor: "#AAA",
    borderBottomWidth: 0.5,
  },
  sectionText: {
    textAlign: "center",
    fontFamily: "Lexend",
    fontSize: 15,
  },
});
