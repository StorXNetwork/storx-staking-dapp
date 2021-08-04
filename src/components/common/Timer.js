import React, { useState, useEffect } from "react";
import { FormatSecondsTwo } from "../../helpers/constant";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);

    const { startDate = new Date().getTime(), endDate } = props;
    const startTime = new Date(startDate).getTime() / 1000,
      endTime = new Date(endDate).getTime() / 1000;

    this.state = { count: endTime - startTime };

    this.ref = null;
  }

  componentDidMount() {
    this.ref = setInterval(() => {
      if (this.state.count >= 1) this.setState({ count: this.state.count - 1 });
      else {
        if (this.props.cb) {
          setTimeout(() => this.props.cb(), 10000);
        }
        clearInterval(this.ref);
      }
    }, 1000);
  }

  componentWillUnmount() {
    if (this.ref) clearInterval(this.ref);
  }

  render() {
    const x = FormatSecondsTwo(this.state.count);

    return <div>{x}</div>;
  }
}
