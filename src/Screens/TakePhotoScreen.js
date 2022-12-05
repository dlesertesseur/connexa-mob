import React, { useState, useEffect } from "react";
import CameraFullScreen from "../Components/CameraFullScreen";
import ActionButton from "../Components/ActionButton";
import { Text, View } from "react-native";
import { Camera } from "expo-camera";
import { setDocument } from "../Features/Auth";
import { useDispatch, useSelector } from "react-redux";

export default function TakePhotoScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const {document} = useSelector((state) => state.auth.value);
  
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (image) {
      const ret = {...document};
      ret.url = image;
      dispatch(setDocument(ret));
      navigation.navigate("ShowImage");
    }
  }, [image]);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraFullScreen type={type} setCamera={setCamera}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
            alignSelf: "flex-end",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <ActionButton
            iconName="camera-flip"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />

          <ActionButton iconName={"camera"} onPress={takePicture} />

          <ActionButton iconName={"crop"} onPress={() => {}} />
        </View>
      </CameraFullScreen>
    </View>
  );
}
