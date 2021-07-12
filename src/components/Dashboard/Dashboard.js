import React from "react";

import { InitStackableTable, OnScroll } from "../../helpers/responsive";
import { AxiosInstance } from "../../helpers/constant";

import DashboardPresentation from "./Presentational";

const intialState = {
  data: null,
  node_data: null,
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = intialState;
  }

  componentDidMount() {
    AxiosInstance.get("/get-contract-data")
      .then((resp) => {
        this.setState({ data: resp.data.data }, InitStackableTable);
      })
      .catch(console.error);

    AxiosInstance.get("/get-node-coordinates")
      .then((resp) => {
        this.setState({ node_data: resp.data.data });
      })
      .catch(console.error);
  }

  render() {
    return (
      <DashboardPresentation
        data={this.state.data}
        node_data={this.state.node_data}
      />
    );
  }
}

export default Dashboard;
