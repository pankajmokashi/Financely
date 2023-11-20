import React from "react";
import './styles.css';
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function PieChart({ income, expenses, balance, transactions }) {
  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Transactions",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - Rs.{y}",
        dataPoints: [
          { y: balance, label: "Balance" },
          { y: income, label: "Income" },
          { y: expenses, label: "Expense" },
        ],
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
export default PieChart;
