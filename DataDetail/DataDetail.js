import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  StyleSheet,
  Text,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';

import firebase from "../database/firebase";

const DataDetail = (props) => {
  const initialState = {
    id: "",
    venta: "",
    fecha: "",
  };

  const [user, setUser] = useState(initialState);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  
  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("data").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
  };

  const deleteUser = async (id) => {
    const dbRef = firebase.db
      .collection("data")
      .doc(props.route.params.userId);
    await dbRef.delete();
    props.navigation.navigate("Data");
  };

  const updateUser = async (id) => {
    const userRef = firebase.db.collection("data").doc(user.id);
    await userRef.set({
      venta: user.venta,
      gasto: user.gasto,
      fecha: date
    });
    setUser(initialState);
    props.navigation.navigate("Data");
  };

  useEffect(() => {
        getUserById(props.route.params.userId);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Venta"
          style={styles.inputGroup}
          value={user.venta}
          onChangeText={(value) => handleTextChange(value, "venta")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Gasto"
          style={styles.inputGroup}
          value={user.gasto}
          onChangeText={(value) => handleTextChange(value, "gasto")}
        />
      </View>
      <View>
      <View style={styles.buttonFecha}>
        <Button onPress={showDatepicker} title="Cambiar Fecha"/>
      </View>
      <View style={styles.buttonFecha}>
        <Button onPress={showTimepicker} title="Cambiar Hora" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => deleteUser()}
          color="#E37399"
        />
      </View>
      <View>
      <Text>{date}</Text>
        <Button title="Update" onPress={() => updateUser()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    marginTop:50,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
    marginTop:30
  },
  buttonFecha: {
    marginBottom: 10
  }
  
});

export default DataDetail;