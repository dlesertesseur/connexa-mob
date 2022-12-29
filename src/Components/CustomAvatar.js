import React from "react";
import UserAvatar from "react-native-user-avatar-component";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const CustomAvatar = ({ name = "No Picture", image, size, bgColor = "#000000", onPress }) => {

  console.log("CustomAvatar -> ", image);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} disabled={onPress ? false : true}>
        {/* <UserAvatar
          size={size}
          name={name}
          bgColor={bgColor}
          src={image ? image : "https://picsum.photos/200/200"}
        /> */}

        <Image  
          style={{
            width: size,
            height: size,
          }}
          source={{uri: image}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomAvatar;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  panel: {
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
});
