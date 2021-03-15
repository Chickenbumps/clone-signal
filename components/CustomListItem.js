import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from "firebase";

export default function CustomListItem({ chat, enterChat }) {
  const [chatMessageInfo, setChatMessageInfo] = useState([]);

  useEffect(() => {
    const requset = firebase
      .firestore()
      .collection("chats")
      .doc(chat.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setChatMessageInfo(snapshot.docs.map((doc) => doc.data()));
      });
    return requset;
  }, [chatMessageInfo]);

  return (
    <ListItem
      onPress={() => enterChat(chat.id, chat.data.chatName)}
      key={chat.id}
      bottomDivider
    >
      <Avatar
        rounded
        source={{
          uri:
            chatMessageInfo?.[0]?.photoURL ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chat.data.chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessageInfo?.[0]?.displayName}: {chatMessageInfo?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({});
