import { View, Text } from "react-native";
import { Logo, Title } from "../Logo";

export const Friends = () => {
  return (
    <View style={{backgroundColor: "#FFF", alignItems: "center"}}>
      <Text>Friends!</Text>
      <Logo height={400} width={400}/>
      <Title size={40} />
    </View>
  );
};