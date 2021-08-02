import React from "react";
import _ from "lodash";

import { InitStackableTable } from "../../helpers/responsive";
import { AxiosInstance } from "../../helpers/constant";

import DashboardPresentation from "./Presentational";
import { GetFavorites, ToggleFavorite } from "../../helpers/miscellaneous";
import { fromXdcAddress, toXdcAddress } from "../../wallets/xinpay";

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
    this.filterData = this.filterData.bind(this);
  }

  componentDidMount() {
    AxiosInstance.get("/get-contract-data")
      .then((resp) => {
        const allStakeholders = resp.data.data.stakeHolders;
        this.setState(
          { data: { ...resp.data.data, allStakeholders } },
          InitStackableTable
        );
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

  filterData(filter) {
    if (!this.state.data) return;
    const data =
      this.state.data.allStakeholders || this.state.data.stakeHolders;
    const filtered = Object.keys(data).reduce((acc, curr) => {
      if (toXdcAddress(curr).toLowerCase().includes(toXdcAddress(filter).toLowerCase())) {
        acc[curr] = data[curr];
      }
      return acc;
    }, {});

    this.setState({
      data: {
        ...this.state.data,
        stakeHolders: filtered,
      },
    });
  }

  render() {
    return (
      <DashboardPresentation
        data={this.state.data}
        node_data={this.state.node_data}
        favorite={this.state.favorite}
        toggleFavorite={this.toggleFavorite}
        filterData={this.filterData}
        setTab={this.setTab}
        tab={this.state.tab}
      />
    );
  }
}

export default Dashboard;
