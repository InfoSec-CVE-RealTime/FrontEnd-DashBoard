import React from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useState, useEffect } from 'react';
  
function ThreatProliferation() {
  const [value, setValue] = React.useState('fruit');
  const optionsOne = [
    {label: 'All Time', value: 'all'},
  ];

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const [options, setOptions] = useState({
    chart: {
      type: 'line'
    }, legend: {
      enabled: false
    },
    title: {
      text: ""
    },
    xAxis: {
      categories: [],
      title: {
        text: "Date"
      }
    },
    plotOptions: {
      series: {
        color: '#009bb0'
      }
    },
    yAxis: {
      title: {
        text: 'Vulnerability Count',
      },
      labels: {
        overflow: 'justify'
      },

    },
    series: [{data: []}]
  });



  useEffect(() => {
    let cancel = false;
    fetch(window.host + "/api/v1.0/threat_proliferation")
      .then((response) => response.json())
      .then((data) => {
        if (cancel) return;
        const xAxis=[];
        const yAxis=[];
        for (let i = 0; i < data.length; i++) {
          yAxis.push(data[i].count)
          xAxis.push(data[i].date)

        }
        setOptions({ xAxis: {
          categories: xAxis,
          title: {
              text: "Date"
          }
        }, series: [{ data: yAxis}] });


      })

    return () => {
      cancel = true
    };
    
  },[]);
  
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className="text-selected d-flex flex-column justify-content-end">Total Threats Over Time</h2>

        <select className="dropdown" value={value} onChange={handleChange}>
          {optionsOne.map((optionOne) => (
            <option value={optionOne.value}>{optionOne.label}</option>
          ))}
        </select>
      </div>

      <div className="content-box mt-2 pt-4">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
    </div>
  );
}
  
export default ThreatProliferation;
