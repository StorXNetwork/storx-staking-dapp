import React from "react";

import { InitStackableTable, OnScroll } from "../../helpers/responsive";
import { AxiosInstance } from "../../helpers/constant";

import DashboardPresentation from "./Presentational";

const intialState = {
  data: null,
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
  }

  render() {
    return <DashboardPresentation data={this.state.data} />;
  }
}

export default Dashboard;
