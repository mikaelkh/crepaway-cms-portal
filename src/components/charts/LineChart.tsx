import React from "react";
import { Chart } from "react-google-charts";
import Loading from "../Loading";

interface props {
  data: Array<any>;
}

const options = {
  curveType: "function",
  legend: { position: "top", alignment: "end" },
  animation: {
    startup: true,
    easing: "inAndOut",
    duration: 300, // Animation duration in milliseconds
  },
  chartArea: { width: "80%", height: "80%" },
};

export default function LineChart(props: props) {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="100%"
      data={props.data}
      loader={<Loading />}
      options={options}
    />
  );
}
