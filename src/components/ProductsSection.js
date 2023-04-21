import React from "react";
import Navbar from "./Navbar";
import NavbarTop from "./NavbarTop";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useState, useEffect } from 'react';

  
function ProductsSection() {
  const [options, setOptions] = useState({
    chart: {
      type: 'column'
  },legend: {
    enabled: false
  }, 
    title: {
      text: "Top Products"
    },
    xAxis: {
      categories: [],
      title: {
          text: "Product"
      }
  },
  plotOptions: {
    series: {
        color: '#ffca2b'
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
    series: [{ data: [] }]
  });


  const [xAxisData, setxAxisData] = useState(null)
  const [yAxisData, setyAxisData] = useState(null)

  useEffect(() => {
    fetch(window.host + "/api/v1.0/top_products")
     .then((response) => response.json())
     .then((data) => {
      const xAxis=[];
      const yAxis=[];
      for (let i = 0; i < data.length; i++) {
        xAxis.push(data[i].count)
        yAxis.push(data[i].product)
       
    } 
    setxAxisData(xAxis);
    setyAxisData(yAxis);
    setOptions({ xAxis: {
      categories: yAxis,
      title: {
          text: "Products"
      }
  }, series: [{ data: xAxis}] });
    

    })
    
  },[]);
  
  return (
    
    <div>
      <Navbar style={{ marginTop:'-15% !important'}}></Navbar>
      <div style={{ marginTop:'24%'}}>
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
  
export default ProductsSection;
