import React, { useState, useEffect } from 'react'
import ReactApexChart from "react-apexcharts"
import projectApiInstance from "../../utils/apiInstance/projectApiInstance";
import cateApiInstance from "../../utils/apiInstance/categoryApiInstance";
import CardData from '../../components/CardData';
import Grid from '@mui/material/Grid';
import './index.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import BarChart from '../../components/BarChart';
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import TableAdmin from '../../components/TableAdmin';
import BarCountDonate from '../../components/BarCountDonate';
function AdminOverview() {
    const [data, setData] = useState([]);
    const [projectsCount, setProjectCount] = useState(0);
    const [countData, setCountData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [option, setOption] = useState(0);
    const [donateData, setDonateData] = useState([]);
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
            await cateApiInstance.get("/count-subCates?top=5").then(res => {
                console.log(res.data);
                if (res.data.result._isSuccess) {
                    setCountData(res.data.result._data)
                    setIsLoading(false);
                }
            })

            await projectApiInstance.get("count-donate").then(res => {
                console.log(res.data)
                if(res.data){
                    if(res.data.result._isSuccess){
                        setDonateData(res.data.result._data);
                    }
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

    const specifiedDate = new Date(); // Assuming this is the date you want to use for filtering

    // Get the start and end of the current week
    const getStartOfWeek = (date) => {
        const start = new Date(date);
        const day = start.getDay();
        const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        return new Date(start.setDate(diff));
    };

    const getEndOfWeek = (startOfWeek) => {
        const end = new Date(startOfWeek);
        return new Date(end.setDate(end.getDate() + 6));
    };
    //
    const startOfWeek = getStartOfWeek(new Date());
    const endOfWeek = getEndOfWeek(startOfWeek);

    console.log(startOfWeek);
    console.log(endOfWeek);

    // Get the start and end of the current month
    const getStartOfMonth = (date) => {
        const start = new Date(date.getFullYear(), date.getMonth(), 1);
        return start;
    };

    const getEndOfMonth = (date) => {
        const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return end;
    };

    const startOfMonth = getStartOfMonth(new Date());
    const endOfMonth = getEndOfMonth(new Date());
    // Filter data within this week
    const weekFilteredData = data.filter(item => {
        const itemDate = new Date(item.createDate);
        return itemDate >= startOfWeek && itemDate <= endOfWeek;
    });
    // Filter data with this month
    const monthFilterData = data.filter(item => {
        const itemDate = new Date(item.createDate);
        return itemDate >= startOfMonth && itemDate <= endOfMonth;
    });
    
    console.log(weekFilteredData);
    // Transform data
    const transformedData = data.map(item => {
        return {
            x: item.totalAmount,
            y: new Date(item.createDate).toLocaleDateString()// Format date as YYYY-MM-DD
        };
    });
    // Transform week data
    const transformedWeekData = weekFilteredData.map(item => {
        return {
            x: item.totalAmount,
            y: new Date(item.createDate).toLocaleDateString()// Format date as YYYY-MM-DD
        };
    });
    //Transform month data
    const transformedMonthData = monthFilterData.map(item => {
        return {
            x: item.totalAmount,
            y: new Date(item.createDate).toLocaleDateString()// Format date as YYYY-MM-DD
        };
    });
    //Transform donate data
    const transformedDonateData = donateData.map(item => {
        return {
            x : item.count,
            y : item.projectName
        }
    })

    console.log(weekFilteredData)
    console.log(transformedWeekData)

    console.log(donateData)

    // chart data
    const bardata = {
        series: [
            {
                name: "Transaction Data",
                data: option == 1 ? transformedWeekData.map(item => item.x) 
                : option == 2 ? transformedMonthData.map(item => item.x) 
                : transformedData.map(item => item.x)
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
                categories: option == 1 ? transformedWeekData.map(item => item.y) 
                : option == 2 ? transformedMonthData.map(item => item.y) 
                : transformedData.map(item => item.y),
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
                            <Box className='bg-[#FFFFFF]'>
                                <Button onClick={() => setOption(1)}>This week</Button>
                                <Button onClick={() => setOption(2)}>This month</Button>
                                <ReactApexChart className="grid-chart" options={bardata.options} series={bardata.series} type="area" width={600} height={350} />
                            </Box>
                            <BarCountDonate data={transformedDonateData}/>
                        </Grid>
                        <Grid item xs={4} >
                            <BarChart data={subCateProjectsCounts} title={subCateNames} />
                            <TableAdmin data={data} />
                        </Grid>
                    </Grid>
                </Box>


            </div>

        </div>
    )
}

export default AdminOverview