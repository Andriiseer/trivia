import React, { useState } from "react";
import { Text, View, Button, TextInput } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

const Box = ({ className = "", ...props }) => (
  <StyledText
    className={`flex p-5 w-4/5 m-2 justify-center items-center text-center text-black bg-fuchsia-500 rounded ${className}`}
    {...props}
  />
);

export default () => {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [serverMessages, setServerMessages] = React.useState([]);
  const ws = new WebSocket("wss://620e-71-247-250-209.ngrok-free.app");

  React.useEffect(() => {
    const serverMessagesList = [];
    ws.onopen = () => {
      console.log("Connected to the server");
    };
    ws.onclose = (e) => {
      console.log("Disconnected. Check internet or server.");
    };
    ws.onerror = (e) => {
      console.log(e.message);
    };
    ws.onmessage = (e) => {
      serverMessagesList.push(e.data);
      setServerMessages([...serverMessagesList]);
    };
  }, []);

  const submit = () => {
    ws.send(JSON.stringify({ name, text }));
    setText("");
  };

  return (
    <StyledView className="flex flex-1 pt-12 flex-col justify-start items-center">
      <View>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type your name here!"
          onChangeText={(v) => setName(v)}
          value={name}
        />
      </View>
      <View className="w-4/5 text-center items-center flex flex-col justify-end h-72 bg-fuchsia-200 pb-5">
        {serverMessages.map((e, i) => (
          <Text key={"txt" + i}>{e}</Text>
        ))}
      </View>
      <Box className="h-14 flex-none bg-fuchsia-200">
        <Text>What's the worlds larges mammal?</Text>
      </Box>
      <View>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type your answer here!"
          onChangeText={(v) => setText(v)}
          value={text}
        />
      </View>
      <Button
        onPress={submit}
        title="Submit"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </StyledView>
  );
};
