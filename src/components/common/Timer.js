import React, { useState, useEffect } from "react";
import { FormatSecondsTwo } from "../../helpers/constant";

export default function Timer(props) {
  const { startDate = new Date().getTime(), endDate } = props;
  const startTime = new Date(startDate).getTime() / 1000,
    endTime = new Date(endDate).getTime() / 1000;
  const [state, setstate] = useState(endTime - startTime);
  useEffect(() => {
    const ref = setInterval(() => {
      if (state > 1) setstate(state - 1);
    }, 1000);

    return () => clearInterval(ref);
  });
  const x = FormatSecondsTwo(state);
  return <div>{x}</div>;
}
