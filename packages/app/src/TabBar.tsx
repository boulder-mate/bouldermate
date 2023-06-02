import React from "react";
import { View, Pressable, Dimensions, StyleSheet } from "react-native";
import NavigationIcon from "./NavigationIcon";

const { width } = Dimensions.get("window");

export const TabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

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
                backgroundColor: isFocused ? "#FF3131" : "#e0e0e0",
                borderRadius: 15,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  padding: 10,
                  height: 60,
                  width: 60,
                }}
              >
                <NavigationIcon route={label} isFocused={isFocused} />
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    paddingBottom: 30,
    borderTopColor: "#BBB",
    borderTopWidth: 0.25,
    backgroundColor: "#FFF",
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 1,
    borderColor: "#333B42",
  },
});
