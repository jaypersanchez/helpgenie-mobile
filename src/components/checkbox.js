import { View, TouchableOpacity, StyleSheet } from "react-native";

import { Check } from "lucide-react-native";
import Text from "./text";

const sizes = {
  sm: {
    icon: 11,
    size: 18,
    position: 2,
  },
  base: {
    icon: 12,
    size: 20,
    position: 2,
  },
  lg: {
    icon: 14,
    size: 24,
    position: 3,
  },
};

const Checkbox = ({
  label,
  fontsize = "base",
  isChecked,
  onToggle,
  color = "#212121",
  size = "base",
}) => {
  const handleToggle = () => {
    onToggle(!isChecked);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity onPress={handleToggle}>
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: isChecked ? "#6842FF" : "transparent",
              width: sizes[size].size,
              height: sizes[size].size,
            },
          ]}
        >
          {isChecked && (
            <View
              style={[
                styles.checkmark,
                {
                  top: sizes[size].position,
                  bottom: sizes[size].position,
                  left: sizes[size].position,
                  right: sizes[size].position,
                },
              ]}
            >
              <Check color="white" size={sizes[size].icon} strokeWidth={4} />
            </View>
          )}
        </View>
      </TouchableOpacity>
      {label ? (
        <Text
          label={label}
          size={fontsize}
          font="semibold"
          style={{ color: color }}
        />
      ) : null}
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 2,
    borderColor: "#6842FF",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
    position: "relative",
  },
  checkmark: {
    position: "absolute",
  },
});
