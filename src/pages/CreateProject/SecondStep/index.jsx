import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { FilePond, registerPlugin } from 'react-filepond';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import projectApiInstance from '../../../utils/apiInstance/projectApiInstance';
function SecondStep() {
    const location = useLocation();
    const [secondRequest, setSecondRequest] = useState({});
    const [images, setImages] = useState([{
        url: ""
    }]);
    const [storyFiles, setStoryFiles] = useState([]);
    const [storyFormData, setStoryFormData] = useState(new FormData());
    const passRequest = location.state?.projectAddRequest;
    useEffect(() => {
        const passRequest = location.state?.projectAddRequest;
        setSecondRequest({ ...passRequest, images: images });
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
            }).catch(err => {
                console.log(err);
            })
            console.log(images);
        }
    }
    return (
        <div className='max-w-fit'>
            <Container className="container">
                <Typography sx={{ marginBottom: '1rem', fontSize: '40px' }} variant='h4'>Thông tin cơ bản</Typography>
                <Typography sx={{ marginBottom: '3rem' }}>Đặt tên cho dự án của bạn, tải lên hình ảnh hoặc video và thiết lập chi tiết chiến dịch của bạn.</Typography>
                <FilePond
                    files={storyFiles}
                    onupdatefiles={setStoryFiles}
                    allowMultiple={true}
                    maxFiles={4}
                    // server="/api"
                    // disabled={true}
                    name="files"
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
                <button type="submit" onClick={uploadStoryFiles}>Tiep theo</button>
            </Container>

        </div>
    )
}

export default SecondStep