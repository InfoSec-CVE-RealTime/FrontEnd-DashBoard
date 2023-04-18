import React from "react";
import Navbar from "./Navbar";
import NavbarTop from "./NavbarTop";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useState, useEffect } from 'react';
  
function TopVulnerabilities() {
    const [value, setValue] = React.useState('fruit');
    const optionsOne = [

        { label: 'Fruit', value: 'fruit' },
     
        { label: 'Vegetable', value: 'vegetable' },
     
        { label: 'Meat', value: 'meat' },
     
      ];
    

    const handleChange = (event) => {

    setValue(event.target.value);



 }; const [options, setOptions] = useState({
    chart: {
      type: 'bar'
  },legend: {
    enabled: false
  }, 
    title: {
      text: "Top Vulnerabilities"
    },
    xAxis: {
      categories: [],
      title: {
          text: "CVE ID"
      }
  },
  plotOptions: {
    series: {
        color: '#ffca2b'
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
    series: [{ data: [] }]
  });


  const [xAxisData, setxAxisData] = useState(null)
  const [yAxisData, setyAxisData] = useState(null)

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1.0/top_cves")
     .then((response) => response.json())
     .then((data) => {
      const xAxis=[];
      const yAxis=[];
      for (let i = 0; i < data.length; i++) {
        xAxis.push(data[i].cvss)
        yAxis.push(data[i].cve_id)
       
    } 
    setxAxisData(xAxis);
    setyAxisData(yAxis);
    setOptions({ xAxis: {
      categories: yAxis,
      title: {
          text: "CVE ID"
      }
  }, series: [{ data: xAxis}] });
    

    })
    
  },[]);
  return (
    <div >
      <Navbar></Navbar>
      <div style={{ marginTop:'24%'}}>
      <NavbarTop></NavbarTop>
      </div >
      <div style={{ width:'100%', height:'90px', backgroundColor:'#ffd12b', opacity: '0.6'}}> 
        {/* <div className="relative flex flex-col items-center w-[340px] h-[340px] rounded-lg">
            <button className="bg-yellow-400 p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white">Dropdown</button>
        </div> */}

        <select className="dropdown" value={value} onChange={handleChange}>
        {optionsOne.map((optionOne) => (

            <option value={optionOne.value}>{optionOne.label}</option>

            ))}

        </select>
      <div style={{ }}>
     <HighchartsReact
      highcharts={Highcharts}
      options={options}
      />
      </div>

      
      </div >
      </div>
  );
};
  
export default TopVulnerabilities;
