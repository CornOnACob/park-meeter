import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Text,
} from "react-native";

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

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "gray",
    textAlign: "center",
    fontSize: 30,
  },
  errorHeader: {
    color: "red",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorMessage: {
    padding: 15,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
})

export default LoadingScreen;
