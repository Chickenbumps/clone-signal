import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "./CustomListItem";
import firebase from "firebase";
import { AntDesign, SimpleLineIcons } from "react-native-vector-icons";

export default function HomeScreen({ navigation, doc }) {
  const [url, setUrl] = useState(
    "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
  );
  const [chats, setChats] = useState([]);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      });
  };

  useEffect(() => {
    const request = firebase
      .firestore()
      .collection("chats")
      .onSnapshot((snapshot) => {
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    return request;
  }, []);

  useLayoutEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((response) => {
        // console.log("props.doc", firebase.auth().currentUser.uid);
        // console.log("response.data:", response.data());
        setUrl(response.data().photoURL);
      });
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          {firebase.auth()?.currentUser ? (
            <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
              {console.log("url", url)}
              <Avatar
                rounded
                source={{
                  uri: url,
                }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
    return;
  }, [navigation, firebase.auth().currentUser.uid, url]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map((chat) => (
          <CustomListItem key={chat.id} chat={chat} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // 마우스로 당겨지게 해줌
  container: {
    height: "100%",
  },
});
