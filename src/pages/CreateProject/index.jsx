import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import dayjs from 'dayjs';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import { useLocation } from 'react-router-dom';
import FSUAppBar from '../../components/AppBar';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
function CreateProject({ selectedCate }) {

  //init state project
  const [thumbnailFile, setThumbnailFile] = useState([]);
  const [liveDemoFile, setLiveDemoFile] = useState([]);
  const [videoSrc, seVideoSrc] = useState("");
  const [po, setPO] = useState({});
  const [thumbnailFormData, setThumbNailFormData] = useState(new FormData());
  const [liveDemoFormData, setLiveDemoFormData] = useState(new FormData());
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const start = Date.now();
  const [startDate, setStartDate] = useState(dayjs(start));
  const [endDate, setEndDate] = useState(dayjs(start));
  const [projectTarget, setProjectTarget] = useState('');
  const [projectBalance, setProjectBalance] = useState(0);
  const [projectBankAccount, setProjectBankAccount] = useState('');
  const [projectOwnerEmail, setProjectOwnerEmail] = useState('');
  const [packageName, setPackageName] = useState('');
  const [requiredAmount, setRequiredAmount] = useState(0);
  const [limitQuantity, setLimitQuantity] = useState(0);
  const [packageType, setPackageType] = useState('');
  const location = useLocation();
  //get selected category
  const token = Cookies.get("_auth");
  console.log(token);
  useEffect(() => {
    const fetchUser = async () => {
      await axios.get("https://localhost:7235/api/UserManagement/user-profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => {
        console.log(res.data);
        setPO(res.data._data)
      })
    }
    fetchUser();
  }, [token])
  const selectedCategory = location.state?.selectedCate;
  console.log(selectedCategory);

  const handleVidChange = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const url = event.target.result;
      seVideoSrc(url);
    };

    reader.onerror = (error) => {
      console.error('Error reading video file:', error);
    };

    reader.readAsDataURL(file); // Read the video content
  };
  console.log()
  // handleVidChange(liveDemoFile[0] ? liveDemoFile[0].file : "aa");
  console.log(videoSrc);
  //add project
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      thumbnailFormData.set('thumbnailFile', thumbnailFile[0].file);
      liveDemoFormData.set('liveDemoFile', liveDemoFile[0].file);
      const thumbnailUrl = await fetch('https://localhost:7235/api/projects/add-thumbnail', {
        method: 'POST',
        body: thumbnailFormData
      });

      const thumbnailData = await thumbnailUrl.json();
      const liveDemoUrl = await fetch('https://localhost:7235/api/projects/add-live-demo', {
        method: 'POST',
        body: liveDemoFormData
      });


      const liveDemoData = await liveDemoUrl.json();
      console.log(thumbnailData);
      console.log(liveDemoData);
      const projectAddRequest = {
        ProjectName: projectName,
        ProjectDescription: projectDescription,
        StartDate: `${startDate.get('year')} - ${startDate.get('month') + 1 < 10 ? `0${startDate.get('month') + 1}` : startDate.get('month') + 1} - ${startDate.get('date')}`,
        EndDate: `${endDate.get('year')} - ${endDate.get('month') + 1 < 10 ? `0${endDate.get('month') + 1}` : endDate.get('month') + 1} - ${endDate.get('date')}`,
        ProjectTarget: projectTarget,
        ProjectBalance: projectBalance,
        ProjectBankAccount: projectBankAccount,
        ProjectOwnerEmail: po.userEmail,
        CategoryId: selectedCategory,
        ProjectThumbnail: thumbnailData,
        ProjectLiveDemo: liveDemoData,
        Packages: [
          {
            PackageName: packageName,
            RequiredAmount: requiredAmount,
            LimitQuantity: limitQuantity,
            PackageType: packageType
          }
        ]
      };
      console.log(projectAddRequest)
      const response = await fetch('https://localhost:7235/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectAddRequest)
      }).then(response => {
        if (response.ok) {
          console.log('Project added successfully!');
        } else {
          console.error('Error adding project:', response.statusText); // Log error message from response
        }
        return response;
      })
        .catch(error => {
          console.error('Network error or other error:', error); // Log the error object
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Project added successfully:', data);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div className="home">
      <FSUAppBar isLogined={Cookies.get('_auth') !== undefined} />
      <div className="mt-[100px]">
        <div className='flex justify-center items-center md:h-[1200px] h-fit md:min-h-[1200px] xl:min-h-0 pt-[100px]'>
          <div className='max-w-fit'>
            <Typography sx={{ marginBottom: '1rem', fontSize: '40px' }} variant='h4'>Thông tin cơ bản</Typography>
            <Typography sx={{ marginBottom: '3rem' }}>Đặt tên cho dự án của bạn, tải lên hình ảnh hoặc video và thiết lập chi tiết chiến dịch của bạn.</Typography>

            <form onSubmit={handleSubmit} className="container">

              <Grid container className='items-center justify-center mb-8' spacing={4}>
                <Grid item xs={6} className="text-left">
                  <Typography sx={{ fontSize: '16px', marginBottom: '1rem' }}>Tiêu đề dự án</Typography>
                  <Typography sx={{ fontSize: '14px', opacity: '0.5' }}>Viết tiêu đề và phụ đề rõ ràng, ngắn gọn để giúp mọi người nhanh chóng hiểu được dự án của bạn. Cả hai sẽ
                    xuất hiện trên các trang dự án và trước khi ra mắt của bạn.
                  </Typography>
                  <Typography sx={{ fontSize: '14px', opacity: '0.5' }}>Những người ủng hộ tiềm năng cũng sẽ nhìn thấy chúng nếu dự án của bạn xuất hiện trên các trang danh mục, kết quả tìm kiếm
                    hoặc trong email chúng tôi gửi tới cộng đồng của mình.
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="text"
                    value={projectName}
                    placeholder="Nhập tiêu đề dự án"
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Grid container className='items-center justify-center mb-6' spacing={2}>
                <Grid item xs={6} className="text-left">
                  Mô tả dự án
                </Grid>
                <Grid item xs={6} className="text-left">
                  <TextField
                    fullWidth
                    value={projectDescription}
                    placeholder="Nhập mô tả dự án"
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Grid container className='items-center justify-center' spacing={2}>
                <Grid item xs={6} className="text-left">
                  <Typography>Ngày ra mắt (tùy chọn)</Typography>
                </Grid>
                <Grid item xs={6} className="text-left">
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                    />
                  </LocalizationProvider>

                </Grid>
              </Grid>

              <br />
              <Grid container className='items-center justify-center' spacing={2}>
                <Grid item xs={6} className="text-left">
                  <Typography>Ngày kết thúc dự án (tùy chọn)</Typography>
                </Grid>
                <Grid item xs={6} className="text-left">
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                    />
                  </LocalizationProvider>

                </Grid>
              </Grid>
              <br />
              <Grid container className='items-center justify-center mb-6' spacing={2}>
                <Grid item xs={6} className="text-left">
                  <Typography sx={{ fontSize: '16px', marginBottom: '1rem' }}>Mục tiêu dự án</Typography>
                  <Typography sx={{ fontSize: '14px', opacity: '0.5' }}>Đặt mục tiêu có thể đạt được bao gồm
                    những gì bạn cần để hoàn thành dự án của mình.
                  </Typography>
                  <Typography sx={{ fontSize: '14px', opacity: '0.5' }}>Nguồn tài trợ là tất cả hoặc không có gì. Nếu bạn không đạt
                    được mục tiêu của mình, bạn sẽ không nhận được tiền.
                  </Typography>
                </Grid>
                <Grid item xs={6} className="text-left">
                  <TextField
                    type="text"
                    fullWidth
                    value={projectTarget}
                    placeholder='Nhập số tiền'
                    onChange={(e) => setProjectTarget(e.target.value)}
                  />
                </Grid>
              </Grid>
              <br />

              <br />
              <Grid container className='items-center justify-center mb-6' spacing={2}>
                <Grid className="text-left" item xs={6}>
                  <Typography>Hình ảnh dự án</Typography>
                </Grid>
                <Grid className="text-left" item xs={6}>
                  <FilePond
                    files={thumbnailFile}
                    onupdatefiles={setThumbnailFile}
                    allowMultiple={false}
                    maxFiles={1}
                    onChange={() => console.log(thumbnailFile)}
                    // server="/api"
                    name="files"
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                  />
                </Grid>
              </Grid>
              <Grid container className='items-center justify-center mb-6' spacing={2}>
                <Grid item xs={6}>
                  <Typography>Live Demo</Typography>
                </Grid>
                <Grid item xs={6}>
                  <FilePond
                    files={liveDemoFile}
                    onupdatefiles={setLiveDemoFile}
                    allowMultiple={false}
                    maxFiles={1}
                    // server="/api"
                    name="files"
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                  />
                </Grid>
              </Grid>
              {/* <label>ThumbNail</label>
              <input type="file" name="thumbnailFile" onChange={handleThumbnailFileChange} /> */}
              {/* <label>Live demo</label>
              <input type="file" name="liveDemoFile" onChange={handleVidChange} /> */}
              <br />
              <button type="submit">Khởi tạo dự án</button>
            </form>
          </div>
        </div>

      </div>

    </div>

  );
}

export default CreateProject