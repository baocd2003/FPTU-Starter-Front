import React, { useState, useEffect } from 'react'
import categoryApiInstance from '../../../utils/apiInstance/categoryApiInstance';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FSUAppBar from '../../../components/AppBar';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
function ChooseSubCates() {
    const navigate = useNavigate();
    const location = useLocation();
    //get selected category

    const [subCates, setSubCates] = useState([]);
    const [selectedSubCateId, setSelectedSubCateId] = useState(null);
    const [second, setSecond] = useState(null);
    const [selectedSubCate, setSelectedCate] = useState([]);
    const handleFirstSelectChange = (event) => {
        const {
            target: { value },
          } = event;
          setSelectedCate(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
    };

    const handleSecondSelectChange = (event) => {
        const selectedSubCateId = event.target.value;
        setSecond(selectedSubCateId);
    };

    const isSecondSelectDisabled = selectedSubCateId !== null;
    useEffect(() => {
        const selectedCategory = location.state?.selectedCate;
        const result = categoryApiInstance.get(`/getSubCates?cateId=${selectedCategory}`).then(res => {
            console.log(res.data);
            if (res.data.result._isSuccess) {
                setSubCates(res.data.result._data);
            }
        })
    }, [])
    const upperFirstLetter = (str) => {
        if (typeof str !== 'string') {
            return str;
        }

        return str[0].toUpperCase() + str.slice(1);
    }

    const handleNext = () => {
        if (selectedSubCate) { // Check if a category is selected before navigation
            const selectedCate = selectedSubCate.map((id)=> ({id}))
            console.log(selectedCate);
            console.log(selectedSubCate);
            navigate("/create-project", { state: { selectedCate } });
        } else {
          // Handle no category selected (optional: display an error message)
          console.error("Please select a category before proceeding.");
        }
      };
    return (
        <div className='home'>
            <FSUAppBar isLogined={Cookies.get('_auth') !== undefined} />
            <div className="mt-[100px]">
                <div className='flex flex-col justify-center items-center md:h-[300px] h-fit md:min-h-[300px] xl:min-h-0 pt-[100px]'>
                    <div className='xl:w-screen/4*3 max-w-fit'>
                        <Container className="w-full flex flex-column justify-center items-center">
                            <Typography variant='h4' sx={{ marginBottom: '2rem !important' }}>Trước tiên, hãy thiết lập dự án</Typography>
                            <Typography variant='h5' sx={{ marginBottom: '1rem !important' }}>Chọn danh mục chính và danh mục phụ cho dự án mới của bạn.</Typography>
                            <Typography sx={{ marginBottom: '1rem !important' }}>Những điều này sẽ giúp những người ủng hộ tìm thấy dự án của bạn và bạn có thể thay đổi chúng sau này nếu cần.</Typography>
                           
                                <FormControl className="w-[300px] flex">
                                    <InputLabel id="demo-simple-select-label">Chọn--</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Chọn"
                                        value={selectedSubCate}
                                        multiple
                                        onChange={handleFirstSelectChange}
                                    >
                                        {subCates.map((item, index) => (
                                            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                        </Container>
                    </div>
                    <Typography className="flex justify-end items-center next-but text-right w-full container p-6 mt-6" onClick={handleNext}>Tiếp <FaLongArrowAltRight /></Typography>

                </div>
            </div>
        </div>
    )
}

export default ChooseSubCates