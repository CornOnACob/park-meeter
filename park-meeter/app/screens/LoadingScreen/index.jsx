import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles.js";

function LoadingScreen (props) {

  useEffect(() => {
    if (!props.isLoading) {
      props.navigation.navigate('Map');
    }
  },[props.isLoading]);

  return (
    <View style={styles.loading}>
      {props.errorMessage ? (
        <View>
          <Text style={styles.errorHeader}>ERROR:</Text>
          <Text style={styles.errorMessage}>{props.errorMessage}</Text>
        </View>
      ) : (
        <Text style={styles.loadingText} >Loading...</Text>
      )}
    </View>
  )
}

export default LoadingScreen;
