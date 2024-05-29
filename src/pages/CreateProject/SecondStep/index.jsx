import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { FilePond, registerPlugin } from 'react-filepond';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import './index.css';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from "react-router-dom";
import projectApiInstance from '../../../utils/apiInstance/projectApiInstance';
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview
);
import TextField from '@mui/material/TextField';
function SecondStep() {
    const location = useLocation();
    const [secondRequest, setSecondRequest] = useState({});
    const [images, setImages] = useState([{
        url: ""
    }]);
    const [storyFiles, setStoryFiles] = useState([]);
    const [storyFormData, setStoryFormData] = useState(new FormData());
    const passRequest = location.state?.projectAddRequest;
    const [banks, setBanks] = useState([]);
    const [selectedBank, setSelectedBank] = useState();
    const [bankAccount, setBankAccount] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const passRequest = location.state?.projectAddRequest;
        setSecondRequest({ ...passRequest, images: images });
        const banksResult = axios.get("https://api.vietqr.io/v2/banks").then(res => {
            setBanks(res.data.data);
            console.log(res.data.data);
        })
    }, [])
    console.log(secondRequest);

    const uploadStoryFiles = async () => {
        if (storyFiles.length > 0) {
            storyFiles.map((sFile, index) => {
                storyFormData.append("storyFiles", sFile.file);
            })
            await projectApiInstance.post("/add-story", storyFormData).then(res => {
                const imageUrls = res.data; // Assuming response.data contains the array of URLs
                setImages(imageUrls.map((url) => ({ url })));
                // setStoryFormData(new FormData());
                console.log(secondRequest);
            }).catch(err => {
                console.log(err);
            })
            console.log(images);
            setSecondRequest({ ...passRequest, images: images });
            console.log(secondRequest);

        }
    }

    // const checkBankAccount = async () => {
    //     var data = JSON.stringify({
    //         "bankCode": "TPBANK",
    //         "accountNo": "13210013240000",
    //         "accountType": "account",
    //         "partnerRefId": "P199212928",
    //         "signature": "b5bb9a6e9c71281fb1e06d"
    //     });
    //     await axios.post('https://gateway.dev.appotapay.com/api/v1/service/transfer/bank/account/info', data, {
    //         headers: {
    //             "X-APPOTAPAY-AUTH": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJwYW9wYW8xIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiYmFvY2QxNUBnbWFpbC5jb20iLCJqdGkiOiJKY21GOHVqMklTdmVMNUZ2dk5rNHBucDh4cmhJTno4LTE2MTQyMjU2MjQiLCJhcGlfa2V5IjoiSmNtRjh1ajJJU3ZlTDVGdnZOazRwbnA4eHJoSU56OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkJhY2tlciIsImV4cCI6MTcxNzM5ODk5OCwiaXNzIjoiQVBQT1RBUEFZIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo3MjM1In0.8nzY53gK02by19XgjzASRt8HrJcoZWJmlJQlIbajjmM`,
    //             "Content-Type": "application/json"
    //         }
    //     }
    //     ).then(res => {
    //         console.log(res.data);
    //     })
    //     console.log(data)
    // }
    // checkBankAccount();
    return (
        <div className='flex justify-center items-center md:h-[700px] h-fit md:min-h-[700px] xl:min-h-0 pt-[100px]'>
            <div className='max-w-fit'>
                <Container className="container">
                    <Typography sx={{ marginBottom: '1rem', fontSize: '40px' }} variant='h4'>Thông tin cơ bản</Typography>
                    <Typography sx={{ marginBottom: '3rem' }}>Đặt tên cho dự án của bạn, tải lên hình ảnh hoặc video và thiết lập chi tiết chiến dịch của bạn.</Typography>
                    <div className="filepond-container">
                        <Typography className='text-left' sx={{marginBottom :'4rem !important'}}>
                            <Typography sx={{ fontSize: '16px', marginBottom: '1rem' }}>Câu chuyện dự án</Typography>
                            <Typography sx={{ fontSize: '14px', opacity: '0.5' }}>Mô tả những gì bạn đang gây quỹ để làm, tại sao bạn quan tâm đến nó, bạn dự định thực hiện nó như thế nào và bạn là ai. Đọc thêm về cách kể câu chuyện của bạn.</Typography>
                        </Typography>

                        <FilePond
                            files={storyFiles}
                            onupdatefiles={setStoryFiles}
                            allowMultiple={true}
                            maxFiles={4}
                            // server="/api"
                            // disabled={true}
                            name="files"
                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                            styleButtonProcessItemPosition="right"
                            class="filepond--flex-container"
                        />
                    </div>

                    <Grid container className='items-center justify-center mb-8' sx={{marginTop:'100px'}} spacing={4}>
                        <Grid item xs={6} className="text-left">
                            <Typography sx={{ fontSize: '16px', marginBottom: '1rem' }} >Tài khoản ngân hàng</Typography>
                            <Typography sx={{ fontSize: '14px', opacity: '0.5' }}>Thêm tài khoản séc nơi bạn muốn nhận tiền. Tài khoản này phải được đặt tại Bỉ và có thể nhận tiền gửi trực tiếp bằng loại tiền mà bạn gây quỹ. Các dự án gây quỹ bằng đồng euro có thể sử dụng tài khoản ngân hàng ở các quốc gia Châu Âu hiện hành. Chúng tôi không hỗ trợ chuyển khoản ngân hàng, tài khoản tiết kiệm hoặc tài khoản ngân hàng ảo.
                            </Typography>
                            <Typography sx={{ fontSize: '14px', opacity: '0.5' }}>Bạn tuyên bố rằng bạn được ủy quyền liên kết tài khoản ngân hàng này với dự án này. Nếu bạn đang gây quỹ với tư cách cá nhân, tài khoản sẽ được đăng ký dưới tên của bạn. Nếu đó là thay mặt cho một doanh nghiệp hoặc tổ chức phi lợi nhuận thì tài khoản sẽ được đăng ký dưới tên của tổ chức đó.
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className="w-full" sx={{ marginBottom: '2rem !important' }} >
                                <InputLabel id="demo-simple-select-label">Chọn--</InputLabel>
                                <Select
                                    value={selectedBank}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Chọn">
                                    {banks.map((bank, index) => (
                                        <MenuItem key={index} value={bank.bin}>{bank.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                type="number"
                                value={bankAccount}
                                onChange={(e) => setBankAccount(e.target.value)} />
                        </Grid>

                    </Grid>
                    <button style={{marginTop:'100px '}} type="submit" onClick={() => uploadStoryFiles()}>Tiep theo</button>
                </Container>

            </div>
        </div>

    )
}

export default SecondStep