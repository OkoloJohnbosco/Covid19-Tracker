import React, {useState, useEffect} from 'react';
import './LineGraph.css';
import {Line} from 'react-chartjs-2';
import axios from 'axios';

const data = (lineData) => {
  console.log(lineData);
  return {
    labels: Object.keys(lineData).reverse().slice(0, 20).reverse(),
    datasets: [
      {
        label: 'Amount of cases',
        data: Object.values(lineData).reverse().slice(0, 20).reverse(),
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const LineGraph = React.memo(() => {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const url = 'https://disease.sh/v3/covid-19/historical/all?lastdays=120';
    console.log('ran from line graph useEffect');

    axios
      .get(url)
      .then(({data: {cases}}) => {
        setGraphData(cases);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="lineGraph">
      {graphData && <Line data={data(graphData)} options={options} />}
    </div>
  );
});

export default LineGraph;
