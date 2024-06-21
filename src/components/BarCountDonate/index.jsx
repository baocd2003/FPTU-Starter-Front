import React from 'react'
import ReactApexChart from "react-apexcharts"

function BarCountDonate({data}) {
    console.log(data);
    const barData = {
        series: [{
            name: 'Số lượng donate',
            data: data.map(item => item.x)
          }],
          options: {
            chart: {
              height: 350,
              type: 'bar',
              toolbar: {
                  show: false
              }
            },
            plotOptions: {
              bar: {
                borderRadius: 10,
                dataLabels: {
                  position: 'top', 
                },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val;
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },
            colors: ['#FBB03B', '#FBB03B'],
            xaxis: {
              categories: data.map(item => item.y),
              position: 'top',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#FBB03B',
                    colorTo: '#FBB03B',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: true,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
                formatter: function (val) {
                  return val;
                }
              }
            
            },
            title: {
              text: 'Trend dự án được ủng hộ nhiều nhất',
              floating: true,
              offsetY: 330,
              align: 'center',
              style: {
                color: '#444'
              }
            }
          },
        
        
        };
  return (
    <div className='bg-[#FFFFFF] mt-4'>
         <ReactApexChart options={barData.options} series={barData.series} type="bar" height={350} />
    </div>
  )
}

export default BarCountDonate