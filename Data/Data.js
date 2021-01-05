import React, { useState, useEffect } from "react";
import { Button, StyleSheet,View,ActivityIndicator } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import firebase from "../database/firebase";

const Data = (props) => {

  const [values, setValues] = useState([]);
  const data = {
    s:[10,100]
  }

  useEffect(() => {
    firebase.db.collection("data").onSnapshot((querySnapshot) => {
      const values = [];
      querySnapshot.docs.forEach((doc) => {
        const { venta, gasto,fecha } = doc.data();
        values.push({
          id: doc.id,
          venta,
          gasto,
          fecha,
        });
      });
      setValues(values);
      function toDateTime(secs) {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        return t;
      }
    });
  }, []);
    let ChartValue = []
      for(let key in values){
              ChartValue.push(values[key].venta)
            }    
      console.log("lista:",ChartValue)
  return (
    <ScrollView>
      {values.map((value) => {
        return (
          <ListItem
            key={value.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("DataDetail", {
                userId: value.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{value.venta}</ListItem.Title>
              <ListItem.Subtitle>{value.gasto}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
    
  );
};

export default Data;