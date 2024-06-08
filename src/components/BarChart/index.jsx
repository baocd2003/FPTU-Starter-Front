import React from 'react'
import ReactApexChart from "react-apexcharts"
import { Typography } from '@mui/material';
function BarChart({ data, title }) {
  console.log(data);
  console.log(title);
  const barData = {
    series: [{
      data: data
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: 'end',
          horizontal: true,
        }
      },
      colors: ['#FBB03B', '#FBB03B'],
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: title,
      }
    },

  }
  return (
    <div className='grid-chart mb-4 p-2'>
      <Typography sx={{ fontSize: '14px', fontWeight: 600, textAlign: 'left', fontFamily: 'Helvetica, Arial, sans-serif' }}>
        Dự án theo danh mục
      </Typography>
      <ReactApexChart options={barData.options} series={barData.series} type="bar" height={350} />
    </div>
  )
}

export default BarChart