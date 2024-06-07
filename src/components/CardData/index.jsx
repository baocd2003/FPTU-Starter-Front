import React from 'react'
import ReactApexChart from "react-apexcharts"
import "./index.css"
import { Typography } from '@mui/material';

function CardData({title, figure, kpi}) {
    const data = {
        series: [figure],
        options: {
          chart: {
            height: 150,
            type: "radialBar",
            foreColor: "grey",
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: "58%",
              },
              dataLabels: {
                value: {
                  show: false,
                },
              },
            },
          },
          labels: [`${figure / kpi}%`],
          colors: ["#FFFFFF"],
        },
      }
  return (
    <div className='cardBox p-4'>
         
          <div>
            <div className='flex flex-col'>
              <ReactApexChart options={data.options} series={data.series} type='radialBar' height={250} />
            </div>
            <div className='title row items-center justify-center'>
            <Typography sx={{fontSize : '12px', textAlign :'center', opacity:0.5}}>{title}</Typography>
            <Typography sx={{fontSize : '18px', textAlign :'center', fontWeight:400}}>{figure}</Typography>
            </div>
          </div>
        </div>
  )
}

export default CardData