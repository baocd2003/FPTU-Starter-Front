import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import ReactPlayer from "react-player";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function InitStep() {
  //init state project
  const [isLoading, setIsLoading] = useState(false);

  const [thumbnailFile, setThumbnailFile] = useState([]);
  const [liveDemoFile, setLiveDemoFile] = useState([]);
  const [videoSrc, seVideoSrc] = useState("");
  const [po, setPO] = useState({});
  const [thumbnailFormData, setThumbNailFormData] = useState(new FormData());
  const [liveDemoFormData, setLiveDemoFormData] = useState(new FormData());
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const start = Date.now();
  const [startDate, setStartDate] = useState(dayjs(start));
  const [endDate, setEndDate] = useState(dayjs(start));
  const [projectTarget, setProjectTarget] = useState("");
  const [projectBalance, setProjectBalance] = useState(0);
  const [projectBankAccount, setProjectBankAccount] = useState("");
  const [packageName, setPackageName] = useState("");
  const [requiredAmount, setRequiredAmount] = useState(0);
  const [limitQuantity, setLimitQuantity] = useState(0);
  const [packageType, setPackageType] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  //get selected category
  const selectedCategory = location.state?.selectedCate;
  console.log(selectedCategory);
  //get user
  const token = Cookies.get("_auth");
  console.log(token);
  //error message
  const notify = (mess) => {
    toast.warn(mess, {
      position: "bottom-left"
    });
  }
  useEffect(() => {
    Aos.init({ duration: 2000 });
    const fetchUser = async () => {
      await axios
        .get("https://localhost:7235/api/user/user-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setPO(res.data._data);
        });
    };
    fetchUser();
  }, [token]);

  //add project
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (liveDemoFile.length > 0 && thumbnailFile.length > 0) {
      setIsLoading(true);
      try {
        console.log(liveDemoFile[0].file);
        thumbnailFormData.set("thumbnailFile", thumbnailFile[0].file);
        liveDemoFormData.set("liveDemoFile", liveDemoFile[0].file);
        const thumbnailUrl = await fetch(
          "https://localhost:7235/api/projects/add-thumbnail",
          {
            method: "POST",
            body: thumbnailFormData,
          }
        );
        console.log(liveDemoFormData)
        const thumbnailData = await thumbnailUrl.json();
        const liveDemoUrl = await fetch(
          "https://localhost:7235/api/projects/add-live-demo",
          {
            method: "POST",
            body: liveDemoFormData,
          }
        );

        const liveDemoData = await liveDemoUrl.json();
        console.log(thumbnailData);
        console.log(liveDemoData);
        const projectAddRequest = {
          ProjectName: projectName,
          ProjectDescription: projectDescription,
          StartDate: `${startDate.get("year")} - ${startDate.get("month") + 1 < 10
            ? `0${startDate.get("month") + 1}`
            : startDate.get("month") + 1
            } - ${startDate.get("date")}`,
          EndDate: `${endDate.get("year")} - ${endDate.get("month") + 1 < 10
            ? `0${endDate.get("month") + 1}`
            : endDate.get("month") + 1
            } - ${endDate.get("date")}`,
          ProjectTarget: projectTarget,
          ProjectBalance: projectBalance,
          ProjectBankAccount: projectBankAccount,
          ProjectOwnerEmail: po.userEmail,
          SubCategories: selectedCategory,
          ProjectThumbnail: thumbnailData,
          ProjectStatus: 1,
          ProjectLiveDemo: liveDemoData,
        };
        setIsLoading(liveDemoData ? false : true);
        console.log(projectAddRequest);
        navigate("/create-project/second", { state: { projectAddRequest } });
      } catch (error) {
        console.error("Error adding project:", error);
      }
    } else {
      notify("Hãy chọn ảnh nền dự án và video mô tả dự án của bạn");
    }

  };
  return (
    <div className='flex justify-center items-center md:h-[1200px] h-fit md:min-h-[1200px] xl:min-h-0 pt-[100px]'>
      <div className="max-w-fit">
        <ToastContainer />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Typography sx={{ marginBottom: "1rem", fontSize: "40px" }} variant="h4">
          Thông tin cơ bản
        </Typography>
        <Typography sx={{ marginBottom: "3rem" }}>
          Đặt tên cho dự án của bạn, tải lên hình ảnh hoặc video và thiết lập chi
          tiết chiến dịch của bạn.
        </Typography>

        <form onSubmit={handleSubmit} className="container m-4">
          <Grid
            container
            className="items-center justify-center mb-8"
            spacing={4}
          >
            <Grid item xs={6} className="text-left">
              <Typography sx={{ fontSize: "16px", marginBottom: "1rem" }}>
                Tiêu đề dự án
              </Typography>
              <Typography sx={{ fontSize: "14px", opacity: "0.5" }}>
                Viết tiêu đề và phụ đề rõ ràng, ngắn gọn để giúp mọi người nhanh
                chóng hiểu được dự án của bạn. Cả hai sẽ xuất hiện trên các trang
                dự án và trước khi ra mắt của bạn.
              </Typography>
              <Typography sx={{ fontSize: "14px", opacity: "0.5" }}>
                Những người ủng hộ tiềm năng cũng sẽ nhìn thấy chúng nếu dự án của
                bạn xuất hiện trên các trang danh mục, kết quả tìm kiếm hoặc trong
                email chúng tôi gửi tới cộng đồng của mình.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                value={projectName}
                placeholder="Nhập tiêu đề dự án"
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </Grid>
          </Grid>

          <Grid
            container
            className="items-center justify-center mb-6"
            spacing={2}
          >
            <Grid item xs={6} className="text-left">
              Mô tả dự án
              <Typography sx={{ fontSize: "14px", opacity: "0.5" }}>
                Viết tiêu đề và phụ đề rõ ràng, ngắn gọn để giúp mọi người nhanh
                chóng hiểu được dự án của bạn. Cả hai sẽ xuất hiện trên các trang
                dự án và trước khi ra mắt của bạn.
              </Typography>
              <Typography sx={{ fontSize: "14px", opacity: "0.5" }}>
                Những người ủng hộ tiềm năng cũng sẽ nhìn thấy chúng nếu dự án của
                bạn xuất hiện trên các trang danh mục, kết quả tìm kiếm hoặc trong
                email chúng tôi gửi tới cộng đồng của mình.
              </Typography>
            </Grid>
            <Grid item xs={6} className="text-left">
              <TextField
                fullWidth
                value={projectDescription}
                maxRows={4}
                placeholder="Nhập mô tả dự án"
                onChange={(e) => setProjectDescription(e.target.value)}
                required
              />
            </Grid>
          </Grid>

          <Grid container className="items-center justify-center" spacing={2}>
            <Grid item xs={6} className="text-left">
              <Typography>Ngày ra mắt (tùy chọn)</Typography>
            </Grid>
            <Grid item xs={6} className="text-left">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <br />
          <Grid container className="items-center justify-center" spacing={2}>
            <Grid item xs={6} className="text-left">
              <Typography>Ngày kết thúc dự án (tùy chọn)</Typography>
            </Grid>
            <Grid item xs={6} className="text-left">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <br />
          <Grid
            container
            className="items-center justify-center mb-6"
            spacing={2}
          >
            <Grid item xs={6} className="text-left">
              <Typography sx={{ fontSize: "16px", marginBottom: "1rem" }}>
                Mục tiêu dự án
              </Typography>
            </Grid>
            <Grid item xs={6} className="text-left">
              <TextField
                type="number"
                fullWidth
                value={projectTarget}
                placeholder="Nhập số tiền"
                onChange={(e) => setProjectTarget(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          <br />
          <Grid
            container
            className="items-center justify-center mb-6"
            spacing={2}
          >
            <Grid className="text-left" item xs={6}>
              <Typography>Hình ảnh dự án</Typography>
              <Typography sx={{ fontSize: "14px", opacity: "0.5" }}>
                Viết tiêu đề và phụ đề rõ ràng, ngắn gọn để giúp mọi người nhanh
                chóng hiểu được dự án của bạn. Cả hai sẽ xuất hiện trên các trang
                dự án và trước khi ra mắt của bạn.
              </Typography>
              <Typography sx={{ fontSize: "14px", opacity: "0.5" }}>
                Những người ủng hộ tiềm năng cũng sẽ nhìn thấy chúng nếu dự án của
                bạn xuất hiện trên các trang danh mục, kết quả tìm kiếm hoặc trong
                email chúng tôi gửi tới cộng đồng của mình.
              </Typography>
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
          <Grid
            container
            className="items-center justify-center mb-6"
            spacing={2}
          >
            <Grid className="text-left" item xs={6}>
              <Typography
                sx={{ textAlign: "left !important" }}
                className="text-left"
              >
                Live Demo
              </Typography>
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
              {liveDemoFile.length > 0 && (
                <ReactPlayer
                  url={URL.createObjectURL(liveDemoFile[0].file)}
                  width="100%"
                  height="100%"
                  controls={true}
                />
              )}
            </Grid>
          </Grid>
          {/* <label>ThumbNail</label>
          <input type="file" name="thumbnailFile" onChange={handleThumbnailFileChange} /> */}
          {/* <label>Live demo</label>
          <input type="file" name="liveDemoFile" onChange={handleVidChange} /> */}
          <br />
          <button type="submit">Lưu thông tin</button>
        </form>
      </div>
    </div>

  );
}

export default InitStep;
