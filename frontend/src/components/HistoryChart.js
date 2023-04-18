import React from "react";
import {Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Legend} from "chart.js";
import {Line} from "react-chartjs-2";

const HistoryChart = (props) =>{
    ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Legend)

    const labels = []
    const userResults = []

    props.graphData.forEach(value => {
        labels.push(value.date)
        userResults.push(value.value)
    });

    const dataObj = {
      labels,
      datasets: [
        {
          label: 'Your Results',
          data: userResults,
          borderColor: 'rgb(0, 0, 0)',
          backgroundColor: 'rgba(0, 0, 0)',
        },
          {
          label: 'Optimal Lower Range',
          data: Array(props.graphData.length).fill(props.graphData[0].Marker.optimal_lower),
          borderColor: 'rgb(50, 168, 62)',
          backgroundColor: 'rgba(50, 168, 62)',
        },
        {
          label: 'Optimal Upper Range',
          data: Array(props.graphData.length).fill(props.graphData[0].Marker.optimal_upper),
          borderColor: 'rgb(50, 168, 62)',
          backgroundColor: 'rgba(50, 168, 62)',
        },
          {
          label: 'Below Standard Upper Range',
          data: Array(props.graphData.length).fill(props.graphData[0].Marker.below_standard_upper),
          borderColor: 'rgb(242, 146, 2)',
          backgroundColor: 'rgba(242, 146, 2)',
        },
          {
          label: 'Above Standard Lower Range',
          data: Array(props.graphData.length).fill(props.graphData[0].Marker.above_standard_lower),
          borderColor: 'rgb(242, 146, 2)',
          backgroundColor: 'rgba(242, 146, 2)',
        },
          {
          label: 'Below Scale Range',
          data: Array(props.graphData.length).fill(props.graphData[0].Marker.below_standard_lower),
          borderColor: 'rgb(252, 5, 13)',
          backgroundColor: 'rgba(252, 5, 13)',
        },
          {
          label: 'Above Scale Range',
          data: Array(props.graphData.length).fill(props.graphData[0].Marker.above_standard_upper),
          borderColor: 'rgb(252, 5, 13)',
          backgroundColor: 'rgba(252, 5, 13)',
        },

      ],
    };
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart',
        },
      },
    };

    return (
        <Line data={dataObj} options={options} />
    )
}

export default HistoryChart;