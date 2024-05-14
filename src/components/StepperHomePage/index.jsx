import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SingleCard from '../ProjectCard/singleCard';
import Container from '@mui/material/Container';
import { GoDot } from "react-icons/go";
import './index.css'
import Kurumi from '../../assets/kurumi.jpg';

function StepperHomePage() {
    const [subA, setSubA] = React.useState([]);
    const totalItem = 9;
    const itemPerPage = 3;
    const tabNums = Math.ceil(totalItem / itemPerPage)
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const startIndex = (newValue - 1) * itemPerPage;
        const endIndex = Math.min(newValue * itemPerPage, a.length);
        setSubA(a.slice(startIndex, endIndex));
    };
    console.log(subA);
    console.log(tabNums)

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <TabPanel value={1} maxWidth="lg">
                    <Container maxWidth="lg" className="my-10">
                        <Box className="mx-15" sx={{
                            display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap'
                            , justifyContent: { xs: 'center', md: 'space-between' }, alignItems: 'center'
                        }}>
                            <SingleCard imageLink={Kurumi} progress={50} amount={8000000} po={"paopao"} category="Anime" title="Kurumi" description="Kurumi1" />
                            <SingleCard imageLink={Kurumi} category="Anime" title="Kurumi" description="Kurumi1" />
                            <SingleCard imageLink={Kurumi} category="Anime" title="Kurumi" description="Kurumi1" />
                        </Box>
                    </Container>
                </TabPanel>
                <TabPanel value={2}>
                    <Container maxWidth="lg" className="my-10">
                        <Box className="mx-15" sx={{
                            display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap'
                            , justifyContent: { xs: 'center', md: 'space-between' }, alignItems: 'center'
                        }}>
                            <SingleCard imageLink={Kurumi} category="Anime" title="Kurumi" description="Kurumi1" />
                            <SingleCard imageLink={Kurumi} category="Anime" title="Kurumi" description="Kurumi1" />
                            <SingleCard imageLink={Kurumi} category="Anime" title="Kurumi" description="Kurumi1" />
                        </Box>
                    </Container>
                </TabPanel>
                <TabPanel value={3}>
                    <Container maxWidth="lg" className="my-10">
                        <Box className="mx-15" sx={{
                            display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap'
                            , justifyContent: { xs: 'center', md: 'space-between' }, alignItems: 'center'
                        }}>
                            <SingleCard imageLink={Kurumi} category="Anime" title="Kurumi" description="Kurumi1" />
                            <SingleCard imageLink={Kurumi} category="Anime" title="Kurumi" description="Kurumi1" />
                            <SingleCard imageLink={Kurumi} category="Anime" title="Kurumi" description="Kurumi1" />
                        </Box>
                    </Container>
                </TabPanel>
                <Box sx={{justifyContent:'center'}}>
                    <TabList className="tab" sx={{justifyContent:'center'}} onChange={handleChange}>
                        {Array.from({ length: tabNums }, (_, i) => (
                            <Tab icon={<GoDot />} value={i + 1} className='dotBtn'></Tab>
                        ))}
                    </TabList>
                </Box>
            </TabContext>
        </Box>
    )
}

export default StepperHomePage