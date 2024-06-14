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
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
function SecondStep() {
    const location = useLocation();
    const [secondRequest, setSecondRequest] = useState({});
    const [images, setImages] = useState([]);
    const [storyFiles, setStoryFiles] = useState([]);
    const [storyFormData, setStoryFormData] = useState(new FormData());
    const passRequest = location.state?.projectAddRequest;
    const [banks, setBanks] = useState([]);
    const [selectedBank, setSelectedBank] = useState();
    const [bankAccount, setBankAccount] = useState("");
    const [accountName, setAccountName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true);
            storyFiles.map((sFile, index) => {
                storyFormData.append("storyFiles", sFile.file);
            })
            console.log(storyFiles[0].file);
            const pData = await projectApiInstance.post("/add-story", storyFormData)
            const imageUrls = pData.data;
            console.log(storyFormData);
            console.log(imageUrls);

            // Update images state asynchronously within the function
            const nImages = imageUrls.map((url) => ({ url }));
            console.log(nImages);
            const jsonSecondReq = { ...passRequest, images: nImages };
            console.log(jsonSecondReq);
            setSecondRequest(jsonSecondReq);
            console.log(secondRequest);
            navigate("/create-project/third", { state: { jsonSecondReq } })
        } else {
            console.log(bankAccount, selectedBank);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await uploadStoryFiles();
        console.log(secondRequest);
    }
    const checkBankAccount = async () => {
        const data = {
            bin: selectedBank,
            accountNumber: bankAccount
        }
        await axios.post('https://api.vietqr.io/v2/lookup', data, {
            headers: {
                'x-client-id': '4a055d72-d6ea-4e6d-af6a-6ef1695500dc',
                'x-api-key': '3917cb1f-95f3-44a9-95f2-3ef17bc054af',
            }
        }).then(res => {
            setAccountName(res.data.accountName);
            console.log(res.data);
        })
    }
    console.log(accountName)
    // checkBankAccount();
    return (
        <div className='flex justify-center items-center md:h-[1000px] h-fit md:min-h-[1000px] xl:min-h-0 pt-[100px]'>
            <div className='max-w-fit'>
                <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Container className="container mb-4">
                    <Typography sx={{ marginBottom: '1rem', fontSize: '40px' }} variant='h4'>Thông tin cơ bản</Typography>
                    <Typography sx={{ marginBottom: '3rem' }}>Đặt tên cho dự án của bạn, tải lên hình ảnh hoặc video và thiết lập chi tiết chiến dịch của bạn.</Typography>
                    <div className="filepond-container">
                        <Typography className='text-left' sx={{ marginBottom: '4rem !important' }}>
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

                    <Grid container className='items-center justify-center mb-8' sx={{ marginTop: '100px' }} spacing={4}>
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
                                    label="Chọn"
                                    onChange={(e) => setSelectedBank(e.target.value)}
                                >
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
                            {/* <TextField value={accountName}/> */}
                            <button type="button" style={{ zIndex: 1000, marginTop: '2rem' }} onClick={() => checkBankAccount()}>Kiểm tra tài khoản</button>
                        </Grid>

                    </Grid>
                    <button style={{ marginTop: '100px ' }} type="submit" onClick={uploadStoryFiles}>Lưu thông tin</button>

                </Container>

            </div>
        </div>

    )
}

export default SecondStep