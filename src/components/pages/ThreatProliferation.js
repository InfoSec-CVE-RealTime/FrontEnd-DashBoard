import React from "react";
import Navbar from "../Navbar";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useState, useEffect } from 'react';
  
function ThreatProliferation() {
  const [options, setOptions] = useState({
    chart: {
      type: 'column'
  },legend: {
    enabled: false
  }, 
    title: {
      text: "Threat Proliferation"
    },
    xAxis: {
      categories: [],
      title: {
          text: "Date"
      }
  },
  plotOptions: {
    series: {
        color: '#ffca2b'
    }
},
  yAxis: {
    title: {
        text: 'Count',
    },
    labels: {
        overflow: 'justify'
    },
   
},
    series: [{ data: [] }]
  });


  const [xAxisData, setxAxisData] = useState(null)
  const [yAxisData, setyAxisData] = useState(null)

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1.0/threat_proliferation")
     .then((response) => response.json())
     .then((data) => {
      const xAxis=[];
      const yAxis=[];
      for (let i = 0; i < data.length; i++) {
        xAxis.push(data[i].count)
        yAxis.push(data[i].date)
       
    } 
    setxAxisData(xAxis);
    setyAxisData(yAxis);
    setOptions({ xAxis: {
      categories: yAxis,
      title: {
          text: "Date"
      }
  }, series: [{ data: xAxis}] });
    

    })
    
  },[]);
  
  return (
    <div> 
    <Navbar></Navbar>
    <div style={{ }}>
     <HighchartsReact
      highcharts={Highcharts}
      options={options}
      />
      </div>
  </div>
  );
};
  
export default ThreatProliferation;
