import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as dashboardActions from "@redux/actions/dashboard.actions";
import { EmployeeItem } from "./components";

class DashboardC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeList: []
    };
  }

  componentWillReceiveProps(props) {
    if (this.props.dashboardData !== props.dashboardData) {
      this.setState({
        employeeList: props.dashboardData.user ? props.dashboardData.user : []
      });
    }
  }

  componentDidMount() {
    this.props.getEmployeeList();
  }

  keyExtractor = (item, index) => {
    return `${index}`;
  };

  renderItem = ({ item }) => {
    return <EmployeeItem item={item} />;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.loginInfo && <Text>Hi {this.props.loginInfo} </Text>}
        <Text style={{ fontSize: 16, color: "blue", marginVertical: 10 }}>
          Employee List:{" "}
        </Text>
        <FlatList
          data={this.state.employeeList}
          keyExtractor={this.keyExtractor}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => {
            return (
              <View style={{ height: 20, backgroundColor: "transparent" }} />
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  dashboardData: state.dashboardReducer.dashboardData,
  loginInfo: state.loginReducer.loginInfo
});

const mapDispatchToProps = dispatch => {
  const allactions = Object.assign({}, dashboardActions);
  const boundActionCreators = bindActionCreators(allactions, dispatch);
  return boundActionCreators;
};

let Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardC);

export { Dashboard };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10
  }
});
