import React, { Component } from "react";
import axios from "axios";
import Loading from "./Component/loading";
import Data from "./Component/user_data";

export default class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  getData = () => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      this.setState({ users: res.data, loading: true });
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        {this.state.loading ? <Data users={this.state.users} /> : <Loading />}
      </div>
    );
  }
}