import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import { GoDot } from 'react-icons/go';
import Kurumi from '../../assets/samplePrj.png';
import SingleCard from '../ProjectCard/singleCard';
import './index.css';

function StepperHomePage() {
    const [subA, setSubA] = React.useState([]);
    const totalItem = 9;
    const itemPerPage = 3;
    const tabNums = Math.ceil(totalItem / itemPerPage);
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const startIndex = (parseInt(newValue, 10) - 1) * itemPerPage;
        const endIndex = Math.min(parseInt(newValue, 10) * itemPerPage, a.length);
        setSubA(a.slice(startIndex, endIndex));
    };

    console.log(subA);
    console.log(tabNums);

    return (
        <Box sx={{ width: '100%', typography: 'body1', display: { xs: 'none', md: 'block' } }}>
            <TabContext value={value}>
                {Array.from({ length: tabNums }, (_, i) => (
                    <TabPanel key={i + 1} value={(i + 1).toString()}>
                        <Container maxWidth="lg" className="my-10">
                            <Box className="mx-15" sx={{
                                display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap',
                                justifyContent: { xs: 'center', md: 'space-between' }, alignItems: 'center'
                            }}>
                                <SingleCard imageLink={Kurumi} progress={50} amount={8000000} po={"paopao"} category="Anime" title="Kurumi" description="Kurumi1" />
                                <SingleCard imageLink={Kurumi} category="Anime" title="Kurumi" description="Kurumi1" />
                                <SingleCard imageLink={Kurumi} category="Anime" title="Kurumi" description="Kurumi1" />
                            </Box>
                        </Container>
                    </TabPanel>
                ))}
                <Box sx={{ justifyContent: 'center' }}>
                    <TabList className="tab" sx={{ justifyContent: 'center' }} onChange={handleChange}>
                        {Array.from({ length: tabNums }, (_, i) => (
                            <Tab key={i + 1} icon={<GoDot />} value={(i + 1).toString()} className='dotBtn' />
                        ))}
                    </TabList>
                </Box>
            </TabContext>
        </Box>
    );
}

export default StepperHomePage;
