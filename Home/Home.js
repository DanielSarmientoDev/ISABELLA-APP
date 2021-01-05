import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Text
} from "react-native";

import firebase from "../database/firebase";
import DateTimePicker from '@react-native-community/datetimepicker';

const Home = (props) => {
  const initalState = {
    venta: "",
    gasto: "",
    fecha: "",
  };

  const [state, setState] = useState(initalState);
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


  const handleChangeText = (value, venta) => {
    setState({ ...state, [venta]: value });
  };

  const saveNewUser = async () => {
    if (state.venta === "") {
      alert("no se puede enviar vacio.");
    } else {

      try {
        await firebase.db.collection("data").add({
          venta: state.venta,
          gasto: state.gasto,
          fecha: date
        });
        alert("save")
      } catch (error) {
        alert(error)
      }
    }
    
  };

  return (
    <View style={styles.container}>
      {/* Name Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.text}>Venta</Text>
        <Text>{state.venta}</Text>
            <TextInput
              placeholder="Venta"
              style={styles.input}
              onChangeText={(value) => handleChangeText(value, "venta")}
              value={state.venta}
              keyboardType = 'number-pad'
            />
        <Text style={styles.text}>Gasto</Text>
        <Text>{state.gasto}</Text>
          <TextInput
            placeholder="Gasto"
            style={styles.input}
            onChangeText={(value) => handleChangeText(value, "gasto")}
            value={state.gasto}
            keyboardType = 'number-pad'
          />
      </View>
      <View>
      </View>
      <View>
      <View style={styles.buttonFecha}>
        <Button onPress={showDatepicker} title="Cambiar Fecha" color="#432"/>
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
      <Text>{state.date}</Text>

      <View style={styles.button}>
        <Button title="Save User" onPress={() => saveNewUser()} />
      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCAE9',
  },
  text:{
    color: '#FFCAE9',
    textAlign:'center',
    fontWeight:'bold',
    fontSize:25
  },
  inputGroup: {
    padding: 10,
    marginBottom: 15,
    textAlign: 'center',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  input:{
    padding: 25,
    paddingHorizontal:80,
    backgroundColor: '#FFCAE9',
    borderRadius:15,
    marginTop: 10,
    marginBottom: 10
  },
  buttonFecha:{
    marginBottom: 8
  },
  button:{
    marginTop:10
  }
});

export default Home;