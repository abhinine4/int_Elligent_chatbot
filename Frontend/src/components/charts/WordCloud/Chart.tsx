import React, { useState, useEffect, useRef} from "react";
import Highcharts from "highcharts";
import wordCloud from "highcharts/modules/wordcloud.js";
import HighchartsReact from "highcharts-react-official";

wordCloud(Highcharts);

// var text = "Wikipedia[note 3] is a multilingual free online encyclopedia written and maintained by a community of volunteers through open collaboration and a wiki-based editing system. Its editors are known as Wikipedians. Wikipedia is the largest and most-read reference work in history.[3] It is consistently one of the 10 most popular websites ranked by Similarweb and formerly Alexa; as of 2022, Wikipedia was ranked the 5th most popular site in the world.[4] It is hosted by the Wikimedia Foundation, an American non-profit organization funded mainly through donations.";
// var lines = text.split(/[,\. ]+/g);
// var data1 = Highcharts.reduce(
//   lines,
//   function (arr: any[], word: any) {
//     var obj = Highcharts.find(arr, function (obj: any) {
//       return obj.name === word;
//     });
//     if (obj) {
//       obj.weight += 1;
//     } else {
//       arr.push({
//         name: word,
//         weight: 1,
//       });
//     }
//     return arr;
//   },
//   []
// );

export const WordCloud = (props) => {
  const chartRef = useRef(null);
  const [topic, setTopic] = useState("All");
  const chartData = props.data;

  const options = {
    title: {
      text: undefined,
    },
    series: [
      {
        type: "wordcloud",
        data: chartData,
        rotation: {
          from: 0,
          to: 0,
        },
        minFontSize: 7,
        style: {
          fontFamily: "Arial",
        },
      },
    ],
  };

  const topics = [
    "Healthcare",
    "Education",
    "Technology",
    "Politics",
    "Environment",
    "All",
  ];

  useEffect(() => {
    // console.log("In chart")
  if(topic !== "All"){
  var topicData = chartData.filter(function(value) {
    return value.topic === topic;
  });
  const chart = chartRef.current.chart;

chart.update({
  series: [{
    data: topicData
  }]
});
  }  
});

  const handleTopicChange = (e) => {
    let topic = e.target.value;
    console.log("value of checkbox : ", topic);
    var topicData = chartData.filter(function(value) {
      return value.topic === topic;
    });

    console.log(topicData)
    setTopic(topic);
  //   const chart = chartRef.current.chart;

  // chart.update({
  //   series: [{
  //     data: topicData
  //   }]
  // });
  };

  return (
    <div className="chart">
      <p className="chart-title">Topic Based WordCloud</p>
      <select id="topics" onChange={handleTopicChange}>
      {topics.map((top, index) => {
      return (
            <option
              value={top}
              selected={topic === top}>{top}</option>
      );
    })}
      </select>
      <HighchartsReact highcharts={Highcharts} options={options} constructorType="chart" ref={chartRef}/>
    </div>
  );
};
