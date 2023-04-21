import React from "react";
import Navbar from "../Navbar";
import NavbarTop from "../NavbarTop";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useState, useEffect } from 'react';


function VendorsSection() {
  const [options, setOptions] = useState({
    chart: {
      type: 'column'
  },legend: {
    enabled: false
  }, 
    title: {
      text: "Top Vendors"
    },
    xAxis: {
      categories: [],
      title: {
          text: "Vendors"
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
    fetch("http://127.0.0.1:5000/api/v1.0/top_vendors")
     .then((response) => response.json())
     .then((data) => {
      const xAxis=[];
      const yAxis=[];
      for (let i = 0; i < data.length; i++) {
        xAxis.push(data[i].count)
        yAxis.push(data[i].vendor)
       
    } 
    setxAxisData(xAxis);
    setyAxisData(yAxis);
    setOptions({ xAxis: {
      categories: yAxis,
      title: {
          text: "Vendors"
      }
  }, series: [{ data: xAxis}] });
    

    })
    
  },[]);
  return (
    <div>
      <Navbar></Navbar>
      <div style={{ marginTop:'24%' }}>
      <NavbarTop></NavbarTop>
      <div style={{ }}>
     <HighchartsReact
      highcharts={Highcharts}
      options={options}
      />
      </div>
      </div>
      </div>
    
    
  );
};
  
export default VendorsSection;
