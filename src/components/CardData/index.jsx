import React from 'react'
import ReactApexChart from "react-apexcharts"
import "./index.css"
import { Typography } from '@mui/material';
import { GrProjects } from "react-icons/gr";
function CardData({ title, figure, kpi, icon }) {
  return (
    <div className='cardBox'>
      <div>
        <div className='flex flex-col card-wrapper '>
        <img className='circle-decor' src="https://demo.bootstrapdash.com/purple-admin-free/assets/images/dashboard/circle.svg" alt="circle-image"/>
          <div className='title row items-center justify-center h-[250px] p-6'>
            <Typography sx={{ fontSize: '0.9rem', textAlign: 'left', fontWeight: 400, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              {title}
              {icon ? icon :<GrProjects/>}
            </Typography>
            <Typography sx={{ fontSize: '1.5rem', textAlign: 'left', fontWeight: 600, marginTop:'40px' }}>{figure}</Typography>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CardData