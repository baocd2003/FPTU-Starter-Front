import React, { useState, useEffect } from 'react'
import ReactApexChart from "react-apexcharts"
import projectApiInstance from "../../utils/apiInstance/projectApiInstance";
import cateApiInstance from "../../utils/apiInstance/categoryApiInstance";
import CardData from '../../components/CardData';
import Grid from '@mui/material/Grid';
import './index.css';
import Box from '@mui/material/Box';
import BarChart from '../../components/BarChart';
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import TableAdmin from '../../components/TableAdmin';
function AdminOverview() {
    const [data, setData] = useState([]);
    const [projectsCount, setProjectCount] = useState(0);
    const [countData, setCountData] = useState([])
    const [isLoading,setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        const fetchTrans = async () => {
            await projectApiInstance.get("/get-trans").then(res => {
                console.log(res.data);
                if (res.data.result._isSuccess) {
                    const sortedData = res.data.result._data.sort((a, b) => new Date(a.createDate) - new Date(b.createDate));
                    setData(sortedData);
                }
            })
            await projectApiInstance.get("/").then(res => {
                console.log(res.data);
                
                if (res.data) {
                    const num = res.data._data.length;
                    setProjectCount(num);
                    setIsLoading(false);
                }
            })
            await cateApiInstance.get("/count-subCates").then(res => {
                console.log(res.data);
                if (res.data.result._isSuccess) {
                    setCountData(res.data.result._data)
                }
            })
        }
        fetchTrans();
    }, []);
    console.log(data);
    console.log(projectsCount)
    console.log(countData)

    //subCateBar
    const subCateNames = countData.map(item => item.name);
    const subCateProjectsCounts = countData.map(item => item.projectsCount);

    console.log(subCateNames);
    console.log(subCateProjectsCounts)
    //test sort by date
    const specifiedDate = new Date("2024-06-07T00:00:00");

    const filteredData = data.filter(item => new Date(item.createdDate) <= specifiedDate);

    console.log(filteredData);
    // Transform data
    const transformedData = data.map(item => {
        return {
            x: item.totalAmount,
            y: new Date(item.createDate).toLocaleDateString()// Format date as YYYY-MM-DD
        };
    });

    console.log(transformedData)

    const bardata = {
        series: [
            {
                name: "Transaction Data",
                data: transformedData.map(item => item.x)
            }
        ],
        options: {
            chart: {
                type: 'area',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                },
                stacked: false,
                height: 350,
            },
            colors: ['#FBB03B', '#FBB03B'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                },
            },
            title: {
                text: 'Transaction Amount Over Time',
                align: 'left'
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            yaxis: {
                labels: {
                    formatter: function (val) {
                        return (val / 1).toFixed(0);
                    },
                },
                title: {
                    text: 'Price'
                },
            },
            xaxis: {
                categories: transformedData.map(item => item.y),
                title: {
                    text: 'Total Amount'
                }
            }
        }
    };
    return (
        <div className='container bg-[#F0F0F0]'>
            <div className='chart-wrap'>
                <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} >
                        <Grid item xs={8} >
                            <Grid container spacing={2} className='mb-4'>
                                <Grid item xs={4} >
                                    <CardData title={'Số lượng giao dịch'} figure={data.length} kpi={100} />
                                </Grid>
                                <Grid item xs={4} >
                                    <CardData title={'Số lượng dự án'} figure={projectsCount} kpi={100} />
                                </Grid>
                                <Grid item xs={4} >
                                    <CardData title={'Số lượng giao dịch'} figure={data.length} kpi={100} />
                                </Grid>
                            </Grid>
                            <ReactApexChart className="grid-chart" options={bardata.options} series={bardata.series} type="area" width={600} height={350} />
                        </Grid>
                        <Grid item xs={4} >
                            <BarChart data={subCateProjectsCounts} title={subCateNames} />
                            <TableAdmin data={data}/>
                        </Grid>
                    </Grid>
                </Box>


            </div>

        </div>
    )
}

export default AdminOverview