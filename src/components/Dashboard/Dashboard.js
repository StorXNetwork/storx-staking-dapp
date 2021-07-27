import React from "react";

import { InitStackableTable } from "../../helpers/responsive";
import { AxiosInstance } from "../../helpers/constant";

import DashboardPresentation from "./Presentational";
import { GetFavorites, ToggleFavorite } from "../../helpers/miscellaneous";

const intialState = {
  data: null,
  node_data: null,
  favorite: GetFavorites(),
  tab: 0,
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = intialState;

    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.setTab = this.setTab.bind(this);
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

  componentDidUpdate() {
    InitStackableTable();
  }

  toggleFavorite(addr) {
    const newFav = ToggleFavorite(addr);
    this.setState({ favorite: newFav });
  }

  setTab(tab) {
    this.setState({ tab });
  }

  render() {
    return (
      <DashboardPresentation
        data={this.state.data}
        node_data={this.state.node_data}
        favorite={this.state.favorite}
        toggleFavorite={this.toggleFavorite}
        setTab={this.setTab}
        tab={this.state.tab}
      />
    );
  }
}

export default Dashboard;
