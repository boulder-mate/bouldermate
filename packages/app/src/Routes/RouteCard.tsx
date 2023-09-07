import { useNavigation } from "@react-navigation/native";
import { Route } from "common";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableHighlight,
} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import { AddToProjects } from "./HeaderButtons";
import { ColorDisplay } from "./Uploads/UploadMetadata";

let wallImage = require("../../assets/images/wall-image.jpg");

export const RouteCard = ({ route, gym }) => {
  const navigator = useNavigation<any>();

  console.log("grades", route.grades);
  const getGrade = () => {
    if (route.grades.user.length > 0) {
      
    }
  }

  return (
    <TouchableHighlight
      onPress={() =>
        navigator.navigate("RoutePage", {
          routeObj: { ...route, location: gym },
          headerButton: () => <AddToProjects route_id={route._id} />,
        })
      }
      style={styles.container}
    >
      <View>
        <Image
          source={{ uri: route.image }}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.aboutContainer}>
          <View style={styles.about}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <ColorDisplay colors={route.colors} size={17.5} />
              <Text
                style={styles.title}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
              >
                {route.name}
              </Text>
            </View>
            <View style={styles.desc}>
              <View style={{ marginHorizontal: 5 }} />
              <Text style={[styles.descText]}>V7</Text>
              <Octicons name="dot-fill" style={styles.dots} />
              <Text style={styles.descText}>4.71</Text>
              <Octicons name="star-fill" style={styles.dots} />
            </View>
          </View>
          <View style={styles.seeMore}>
            <View style={styles.projectText}>
              <Text style={{ fontSize: 15 }}>See More</Text>
              <Octicons size={20} name="chevron-right" />
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  image: {
    height: 200,
    alignContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
  },
  title: {
    color: "#FF3131",
    fontFamily: "LexendSemibold",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 0,
    overflow: "scroll",
    fontSize: 22,
  },
  aboutContainer: {
    backgroundColor: "white",
    width: "100%",
    marginTop: "auto",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    flexDirection: "row",
  },
  about: {
    flexDirection: "column",
    flex: 1,
    marginRight: 15,
  },
  seeMore: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    height: 40,
  },
  projectText: {
    marginTop: 4,
    fontFamily: "Lexend",
    flexDirection: "row",
    color: "black",
    alignItems: "center",
    textAlignVertical: "center",
    gap: 8,
  },
  desc: {
    flexDirection: "row",
    alignItems: "center",
  },
  descText: {
    fontFamily: "Lexend",
    textAlignVertical: "center",
    fontSize: 15,
  },
  dots: {
    alignSelf: "center",
    marginTop: 3,
    marginHorizontal: 10,
  },
});
