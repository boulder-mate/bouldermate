import { View } from "react-native";

export const Horizontal = ({ styles = {} }) => {
  return (
    <View
      style={[
        {
          borderBottomColor: "black",
          borderBottomWidth: 0.5,
        },
        styles,
      ]}
    />
  );
};
