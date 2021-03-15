import React, { useLayoutEffect, useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
// import firebase from "firebase";
import * as firebase from "firebase";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const signUp = () => {
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((response) => {
    //     response.user.updateProfile({
    //       displayName: name,
    //       photoURL:
    //         imageUrl ||
    //         "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
    //     });
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            displayName: name,
            Email: email,
            photoURL:
              imageUrl ||
              "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h2 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(e) => setName(e)}
        />
        <Input
          placeholder="Email"
          autoFocus
          type="text"
          value={email}
          onChangeText={(e) => setEmail(e)}
        />
        <Input
          placeholder="Password"
          autoFocus
          type="text"
          value={password}
          secureTextEntry={true}
          onChangeText={(e) => setPassword(e)}
        />
        <Input
          placeholder="Profile Picture URL(optional)"
          autoFocus
          type="text"
          value={imageUrl}
          onChangeText={(e) => setImageUrl(e)}
          onSubmitEditing={signUp}
        />
      </View>
      <Button onPress={signUp} title="Register" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
