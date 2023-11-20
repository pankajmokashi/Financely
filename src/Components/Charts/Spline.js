import React from "react";
import "./styles.css";
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function Spline({ transactions }) {
  let filteredData = [];
  transactions.map((item) => filteredData.push({x: new Date(item.date), y: item.amount}));
  filteredData.sort((a, b) => a.x - b.x);

  const options = {
    animationEnabled: true,
    title: {
      text: "Transactions",
    },
    axisX: {
      valueFormatString: "",
    },
    axisY: {
      title: "Transactions",
      prefix: "Rs.",
    },
    data: [
      {
        yValueFormatString: "$#,###",
        xValueFormatString: "",
        type: "spline",
        dataPoints: filteredData,
      },
    ],
  };
  return (
    <div className="chart">
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}
export default Spline;
