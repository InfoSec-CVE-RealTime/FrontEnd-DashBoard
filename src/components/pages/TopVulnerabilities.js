import React from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {useState, useEffect} from 'react';

function TopVulnerabilities() {
  const [value, setValue] = React.useState('fruit');
  const optionsOne = [

    {label: 'All Time', value: 'all'},
    {label: 'Last Day', value: '1d'},
    {label: 'Last 4 Days', value: '4d'},
    {label: 'Last Week', value: '1w'},
    {label: 'Last Month', value: '1m'},
    {label: 'Last 3 Months', value: '3m'},
    {label: 'Last 6 Months', value: '6m'},
    {label: 'Last Year', value: '1y'},
    {label: 'Last 3 Years', value: '3y'},
    {label: 'Last 5 Years', value: '5y'},
    {label: 'Last 10 Years', value: '10y'}

  ];


  const handleChange = (event) => {

    setValue(event.target.value);


  };
  const [options, setOptions] = useState({
    chart: {
      type: 'bar'
    }, legend: {
      enabled: false
    },
    title: {
      text: ""
    },
    xAxis: {
      categories: [],
      title: {
        text: "CVE ID"
      }
    },
    plotOptions: {
      series: {
        color: '#009bb0'
      }
    },
    yAxis: {
      title: {
        text: 'CVS Score',
      },
      labels: {
        overflow: 'justify'
      },

    },
    series: [{data: []}]
  });


  const [xAxisData, setxAxisData] = useState(null)
  const [yAxisData, setyAxisData] = useState(null)

  useEffect(() => {
    fetch(window.host + "/api/v1.0/top_cves")
      .then((response) => response.json())
      .then((data) => {
        const xAxis = [];
        const yAxis = [];
        for (let i = 0; i < data.length; i++) {
          xAxis.push(data[i].cvss)
          yAxis.push(data[i].cve_id)

        }
        setxAxisData(xAxis);
        setyAxisData(yAxis);
        setOptions({
          xAxis: {
            categories: yAxis,
            title: {
              text: "CVE ID"
            }
          }, series: [{data: xAxis}]
        });


      })

  }, []);
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3 className="text-selected d-flex flex-column justify-content-end">Top Vulnerabilities</h3>

        <select className="dropdown" value={value} onChange={handleChange}>
          {optionsOne.map((optionOne) => (
            <option value={optionOne.value}>{optionOne.label}</option>
          ))}
        </select>
      </div>

      <div className="content-box mt-2">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
    </div>
  );
}

export default TopVulnerabilities;
