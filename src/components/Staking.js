import React from "react";

const InitialState = {
  stake: null,
};

class Staking extends React.Component {
  constructor(props) {
    super(props);

    this.state = InitialState;
  }

  componentDidMount() {}

  render() {
    return <div className="staking component-panel"></div>;
  }
}

export default Staking;
