import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, Image } from "react-native";
import { Images } from "@assets";

class EmployeeItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { item } = this.props;
    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderRadius: 2,
          borderColor: "#ddd",
          shadowOffset: { width: 1, height: 1 },
          shadowColor: "black",
          shadowOpacity: 0.5,
          backgroundColor: "white"
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ width: 30, height: 30, marginRight: 10 }}
            source={Images.profileIcon}
          />
          {item.name && (
            <Text style={{ alignSelf: "center" }}>{item.name}</Text>
          )}
        </View>
        {item.email && <Text style={{ marginVertical: 5 }}>{item.email}</Text>}
        {item.phoneNo && (
          <Text style={{ marginVertical: 5 }}>{item.phoneNo}</Text>
        )}
      </View>
    );
  }
}

export { EmployeeItem };

const styles = StyleSheet.create({});
