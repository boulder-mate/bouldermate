import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useState, useEffect } from "react";
import {
  RopeGradeScale,
  BoulderGradeScale,
  RouteColors,
  RouteTypes,
  ScaleToGrades,
} from "common";
import DropDownPicker from "react-native-dropdown-picker";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Horizontal } from "../../Utils/MiscComponents";

let height = Dimensions.get("screen").height;
const Climb = require("../../../assets/images/climbing.png");

const FIELD_TO_ZINDEX = {
  Gym: 6,
  "Route Type": 5,
  Routesetters: 4,
  Colors: 3,
  "Grade Scale": 2,
  Grade: 1,
  Notes: 0,
};

export const UploadMetadata = ({ metadata, updateMetadata }) => {
  return (
    <ScrollView
      style={{ height, overflow: "scroll" }}
      nestedScrollEnabled
      persistentScrollbar
    >
      <TouchableWithoutFeedback>
        <View style={styles.metadataContainer}>
          <View style={styles.sectionIndicator}>
            <Text style={styles.sectionIndicatorText}>Required</Text>
            <Horizontal />
          </View>
          <UploadMetadataField
            icon={
              <MaterialIcons
                style={{ marginRight: 2 }}
                name={"location-pin"}
                size={22}
              />
            }
            label="Gym"
          >
            <Selector
              items={["Urban Climb Blackburn", "BoulderLabs Clayton"]}
              value={metadata.gym}
              update={(value: any) =>
                updateMetadata({ ...metadata, gym: value })
              }
            />
          </UploadMetadataField>
          <UploadMetadataField
            icon={
              <Image
                source={Climb}
                style={{
                  height: 30,
                  width: 25,
                  backgroundColor: "white",
                }}
              />
            }
            label="Route Type"
          >
            <Selector
              items={Object.values(RouteTypes)}
              value={metadata.type}
              update={(value: any) =>
                updateMetadata({
                  ...metadata,
                  type: value,
                  scale: undefined,
                  grade: undefined,
                })
              }
            />
          </UploadMetadataField>
          <UploadMetadataField
            icon={
              <Entypo
                name="tools"
                size={20}
                style={{ width: 20, marginRight: "auto" }}
              />
            }
            label="Routesetters"
          >
            <RoutesetterSelector
              items={["Jonathon Brown", "Jack Ginnevan"]}
              update={(value: any) =>
                updateMetadata({ ...metadata, routsetters: value })
              }
            />
          </UploadMetadataField>
          <UploadMetadataField
            icon={<ColorDisplay colors={metadata.colors} />}
            label="Colors"
          >
            <ColorSelector
              items={RouteColors}
              update={(value: any) =>
                updateMetadata({ ...metadata, colors: value })
              }
            />
          </UploadMetadataField>
          <View style={styles.sectionIndicator}>
            <Text style={styles.sectionIndicatorText}>Optional</Text>
            <Horizontal />
          </View>
          <UploadMetadataField
            icon={
              <FontAwesome
                name="balance-scale"
                size={20}
                style={{ width: 25, marginRight: "auto" }}
              />
            }
            label="Grade Scale"
          >
            <Selector
              items={
                // Need to do it this messy way because Object.values returns numbers
                metadata.type === RouteTypes.Boulder
                  ? Object.values(BoulderGradeScale)
                  : Object.values(RopeGradeScale)
              }
              value={metadata.scale}
              update={(value: any) =>
                updateMetadata({ ...metadata, scale: value })
              }
            />
          </UploadMetadataField>
          <UploadMetadataField
            icon={
              <FontAwesome
                name="user-secret"
                size={22}
                style={{ width: 20, marginRight: "auto" }}
              />
            }
            label="Grade"
          >
            <Selector
              items={
                // Need to do it this messy way because Object.values returns numbers
                metadata.scale
                  ? Object.values(ScaleToGrades[metadata.scale])
                  : ["Select a scale first"]
              }
              value={metadata.grade}
              update={(value: any) =>
                updateMetadata({ ...metadata, grade: value })
              }
            />
          </UploadMetadataField>
          <UploadMetadataField
            icon={
              <Ionicons
                name="pencil"
                size={22}
                style={{ width: 20, marginRight: "auto" }}
              />
            }
            label="Notes"
          >
            <TextInput
              style={[styles.notes, { borderWidth: metadata.notes ? 1 : 0.5 }]}
              multiline={true}
              onChangeText={(text) =>
                updateMetadata({ ...metadata, notes: text })
              }
            />
          </UploadMetadataField>
          <View style={{ marginTop: 700, height: 10 }} />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const UploadMetadataField = ({ label, children, icon }) => {
  return (
    <View style={[styles.metadataSection, { zIndex: FIELD_TO_ZINDEX[label] }]}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.fieldLabel}>
        <Text style={styles.fieldLabelText}>{label}</Text>
      </View>
      <View style={[styles.fieldValue]}>{children}</View>
    </View>
  );
};

const Selector = ({ items, multiple = false, value, update }) => {
  console.log("ITEMS", items);
  // Items should be an array or enum
  items = items.map((x: any) => {
    return { label: x, value: x };
  });

  const [open, setOpen] = useState(false);
  // This package we use is an absolute fucking mess
  // Should consider designing own rendition in the future
  // For some reason the package requires a local copy of the value and couldnt do this internally
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    update(localValue);
  }, [localValue]);

  return (
    <DropDownPicker
      open={open}
      value={localValue}
      items={items}
      style={[
        styles.dropdown,
        {
          borderWidth: !!localValue ? 1 : 0.5,
        },
      ]}
      setOpen={setOpen}
      setValue={setLocalValue} // This prop works in a dumb way - onSelectItem is used for state updates for ease of mind
      listMode={"SCROLLVIEW"}
      dropDownDirection="BOTTOM"
      autoScroll
      multiple={multiple}
    />
  );
};

const RoutesetterSelector = ({ items, update }) => {
  // Items should be an array or enum
  items = items.map((x: any) => {
    return { label: x, value: x };
  });

  const [open, setOpen] = useState(false);
  // This package we use is an absolute fucking mess
  // Should consider designing own rendition in the future
  // For some reason the package requires a local copy of the value and couldnt do this internally
  const [localValue, setLocalValue] = useState([]);

  useEffect(() => {
    update(localValue);
  }, [localValue]);

  return (
    <DropDownPicker
      open={open}
      value={localValue}
      items={items}
      style={[styles.dropdown, { borderWidth: localValue.length ? 1 : 0.5 }]}
      setOpen={setOpen}
      setValue={setLocalValue} // This prop works in a dumb way - onSelectItem is used for state updates for ease of mind
      listMode={"SCROLLVIEW"}
      mode="BADGE"
      placeholder="Select items"
      autoScroll
      dropDownDirection="BOTTOM"
      showBadgeDot={false}
      badgeColors={["#FF3131"]}
      badgeTextStyle={{ color: "white" }}
      multiple
    />
  );
};

const ColorSelector = ({ items, update }) => {
  // Items should be an array or enum
  items = Object.keys(items).map((x: any, index) => {
    var icon = (
      <View
        style={{
          width: 20,
          height: 20,
          backgroundColor: items[x],
          borderWidth: 0.5,
          borderRadius: 5,
        }}
      />
    );

    return {
      label: x,
      value: x,
      icon: () => icon,
    };
  });

  const [open, setOpen] = useState(false);
  // This package we use is an absolute fucking mess
  // Should consider designing own rendition in the future
  // For some reason the package requires a local copy of the value and couldnt do this internally
  const [localValue, setLocalValue] = useState([]);

  useEffect(() => {
    update(localValue);
  }, [localValue]);

  return (
    <DropDownPicker
      open={open}
      value={localValue}
      scrollViewProps={{
        nestedScrollEnabled: true,
        persistentScrollbar: true,
      }}
      items={items}
      style={[styles.dropdown, { borderWidth: localValue.length ? 1 : 0.5 }]}
      setOpen={setOpen}
      setValue={setLocalValue} // This prop works in a dumb way - onSelectItem is used for state updates for ease of mind
      listMode={"SCROLLVIEW"}
      mode="BADGE"
      dropDownDirection="BOTTOM"
      placeholder="Select items"
      showBadgeDot={false}
      badgeColors={["#FF3131"]}
      badgeTextStyle={{ color: "white" }}
      autoScroll
      multiple
    />
  );
};

const ColorDisplay = ({ colors }) => {
  // This is a cool component
  if (!colors) colors = ["White"];

  return (
    <View
      style={{
        width: 20,
        height: 20,
        borderWidth: 0.5,
        flexDirection: "row",
        overflow: "hidden",
        justifyContent: "center",
      }}
    >
      {colors.map((x) => (
        <View
          style={{
            height: "100%",
            flex: 1,
            backgroundColor: RouteColors[x],
          }}
          key={x}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  metadataContainer: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    gap: 17,
    flexDirection: "column",
    alignContent: "space-between",
    overflow: "scroll",
  },
  metadataSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fieldLabel: {
    width: "35%",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  fieldLabelText: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
    flexWrap: "wrap",
  },
  fieldValue: {
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: "white",
  },
  dropdown: {
    borderColor: "black",
    height: 40,
    backgroundColor: "white",
    overflow: "scroll",
  },
  icon: {
    width: "6%",
    alignItems: "center",
  },
  sectionIndicator: {
    gap: 5,

    zIndex: -1000,
    elevation: -1000,
  },
  sectionIndicatorText: {
    marginLeft: 5,
    fontSize: 15,
    fontFamily: "Lexend",
    color: "#FF3131",
  },
  notes: {
    borderWidth: 0.5,
    width: "100%",
    height: 60,
    padding: 5,
    borderRadius: 5,
  },
});
