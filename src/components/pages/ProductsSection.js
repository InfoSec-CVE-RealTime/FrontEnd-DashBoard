import React from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useState, useEffect } from 'react';

  
function ProductsSection() {
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
      type: 'column'
    }, legend: {
      enabled: false
    },
    title: {
      text: ""
    },
    xAxis: {
      categories: [],
      title: {
        text: "Product"
      }
    },
    plotOptions: {
      series: {
        color: '#009bb0'
      }
    },
    yAxis: {
      title: {
        text: 'Counts',
      },
      labels: {
        overflow: 'justify'
      },

    },
    series: [{data: []}]
  });


  useEffect(() => {
    let cancel = false;
    fetch(window.host + "/api/v1.0/top_products")
      .then((response) => response.json())
      .then((data) => {
        if (cancel) return;
        const xAxis=[];
        const yAxis=[];
        for (let i = 0; i < data.length; i++) {
          yAxis.push(data[i].count)
          xAxis.push(data[i].product)

        }
        setOptions({ xAxis: {
          categories: xAxis,
          title: {
              text: "Products"
          }
        }, series: [{ data: yAxis}] });
    

    })

    return () => {
      cancel = true;
    }
    
  },[]);
  
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className="text-selected d-flex flex-column justify-content-end">Top Products</h2>

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
  
export default ProductsSection;
