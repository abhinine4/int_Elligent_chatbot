import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

export const LineChart = (props: any) => {
  const [chartData, setChartData] = useState({
    "chitchat": [],
    "reddit": [],
    "wiki": []
  });
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [id, setID] = useState(1);

  useEffect(() => {
    if (Object.keys(props.data).length > 0) {
      setID(id => id + 1);
      var newLabels = chartLabels;
      newLabels.push("Q" + id);
      setChartLabels(newLabels);

      var newChartData = chartData;
      newChartData["chitchat"].push(props.data["chitchat"] as never);
      newChartData["reddit"].push(props.data["reddit"] as never);
      newChartData["wiki"].push(props.data["wiki"] as never);
      setChartData(newChartData);
    }
  }, [chartData, props.data]);

  const data = {
    labels: chartLabels,
    datasets:
      props.labels && props.labels.length
        ? [
            {
              label: props.labels[0],
              data: chartData["chitchat"],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: props.labels[1],
              data: chartData["reddit"],
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
              label: props.labels[2],
              data: chartData["wiki"],
              borderColor:  "rgba(255, 206, 86, 1)",
              backgroundColor: "rgba(255, 206, 86, 0.5)",
            },
          ]
        : [],
  };
  return (
    <div className="chart">
      <p className="chart-title">{props.title}</p>
      <Line options={options} data={data} />
    </div>
  );
};
