import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import NavigationTab from "./NavigationTab";
import Octicons from "react-native-vector-icons/Octicons";

const ENLARGED_TAB = 2;

export const TabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.mainContainer}>
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
          <View
            key={index}
            style={[
              styles.mainItemContainer,
              { borderRightWidth: label == "notes" ? 3 : 0 },
            ]}
          >
            <Pressable
              onPress={onPress}
              style={{
                backgroundColor: isFocused ? "red" : "#FFF",
                borderTopLeftRadius: index === ENLARGED_TAB ? 25 : 0,
                borderTopRightRadius: index === ENLARGED_TAB ? 25 : 0,
                marginTop: "auto",
                height: indexToHeight(index, isFocused),
                alignItems: "center",
                borderWidth: isFocused ? 0.7 : 0.5,
                borderColor:
                  index === ENLARGED_TAB || isFocused ? "#AAA" : "#FFF",
                borderTopColor: "#AAA",
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingTop: index === ENLARGED_TAB ? 10 : 8,
                  height: 60,
                  width: 60,
                }}
              >
                <NavigationTab route={label} isFocused={isFocused} />
              </View>
              {isFocused ? (
                <Octicons
                  name="dot-fill"
                  color="white"
                  style={{ position: "relative", bottom: 28 }}
                />
              ) : (
                <Text
                  style={{
                    position: "relative",
                    bottom: 30,
                    fontSize: 10,
                    fontFamily: "Lexend",
                  }}
                >
                  {label}
                </Text>
              )}
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

function indexToHeight(index: any, isFocused: any) {
  if (index === ENLARGED_TAB) return 110;
  else return 85;
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 1,
  },
});
