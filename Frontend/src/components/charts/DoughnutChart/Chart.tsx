import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = (props) => {
  const [chartData, setChartData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    let values: number[] = [];
    let labels: string[] = [];
    for (let key in props.data) {
      labels.push(key);
      values.push(props.data[key]);
    }
    setChartData(values.length ? values : [1]);
    setLabels(labels.length ? labels : ["No Data Available"]);
  }, [props]);

  const data = {
    labels,
    datasets: [
      {
        label: "# of Votes",
        data: chartData,
        backgroundColor:
          labels[0] === "No Data Available"
            ? ["rgb(240, 240, 240)"]
            : [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
        borderColor:
          labels[0] === "No Data Available"
            ? ["rgb(240, 240, 240)"]
            : [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart" style={{ maxWidth: "400px" }}>
      <p className="chart-title">{props.title}</p>
      <Doughnut data={data} />
    </div>
  );
};
