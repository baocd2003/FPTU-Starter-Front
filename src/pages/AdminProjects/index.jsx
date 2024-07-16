import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import LinearProgress from "@mui/material/LinearProgress";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BackerList from "../../components/BackerList";
import SearchBarProjects from "../../components/SearchBarProjects";
import projectApiInstance from "../../utils/apiInstance/projectApiInstance";
import transactionApiInstance from "../../utils/apiInstance/transactionApiInstance";
import "./index.css";

const statuses = [
  "Đã xóa",
  "Chờ duyệt",
  "Đang tiến hành",
  "Thành công",
  "Thất bại",
  "Từ chối",
  "Đã duyệt",
];

const backgroundColor = [
  "#C6C6C6",
  "#3F51B5",
  "#FBB03B",
  "#368D59",
  "#DB3700",
  "#9E9E9E",
  "#00CED1",
];

const currentDate = Date.parse(new Date().toString());

const formatDate = (date) => dayjs(date).format("DD-MM-YYYY HH:mm");

const progressPercentage = (startDate, endDate) => {
  const totalDuration = endDate - startDate;
  const elapsedDuration = currentDate - startDate;

  return Math.min(Math.max((elapsedDuration / totalDuration) * 100, 0), 100);
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "projectName", numeric: false, label: "Tên" },
  { id: "projectOwnerName", numeric: false, label: "Chủ dự án" },
  { id: "projectTarget", numeric: true, label: "Mục tiêu" },
  { id: "createdDate", numeric: false, label: "Ngày tạo" },
  { id: "projectStatus", numeric: false, label: "Trạng thái" },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
          >
            {headCell.id !== "projectOwnerName" &&
            headCell.id !== "projectStatus" ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

// Title component
function EnhancedTableToolbar(props) {
  const { projectsCount } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%", textAlign: "left", padding: 2 }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Dự án ({projectsCount})
      </Typography>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  projectsCount: PropTypes.number.isRequired,
};

function AdminProjects() {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdDate");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [projectList, setProjectList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRewardItems, setCurrentRewardItems] = useState([]);
  const [openPopover, setOpenPopover] = useState(false);
  const [backerList, setBackerList] = useState([]);

  const token = Cookies.get("_auth");

  const timeLineProgress = (selectedProject) => {
    if (selectedProject) {
      const startDate = Date.parse(selectedProject.startDate);
      const endDate = Date.parse(selectedProject.endDate);

      const totalDuration = endDate - startDate;
      const elapsedDuration = currentDate - startDate;
      const progressPercentage = Math.min(
        Math.max((elapsedDuration / totalDuration) * 100, 0),
        100
      );

      if (startDate > currentDate) {
        setProgressValue(null);
        setProgressText("Chưa bắt đầu");
      } else if (endDate < currentDate) {
        setProgressValue(100);
        setProgressText("Đã kết thúc");
      } else {
        setProgressValue(progressPercentage);
        setProgressText(`${progressPercentage.toFixed(2)}%`);
      }
    }
  };

  const fetchProjects = async () => {
    if (token) {
      try {
        const response = await projectApiInstance.get(`user-project`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data._data != null) {
          const projects = response.data._data;
          setProjectList(projects);
          setProject(projects);
        }
      } catch (error) {
        console.error("Error fetching project list:", error);
      }
    } else {
      try {
        const response = await projectApiInstance.get(`user-project`);
        if (response.data._data != null) {
          const projects = response.data._data;
          setProjectList(projects);
          setProject(projects);
        }
      } catch (error) {
        console.error("Error fetching project list:", error);
      }
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (project) => {
    setSelectedProject(project);
    setOpenModal(true);
    timeLineProgress(project);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProject(null);
    setTabValue(0);
    // console.log("Hihi");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePopoverOpen = (event, rewardItems) => {
    setAnchorEl(event.currentTarget);
    setCurrentRewardItems(rewardItems);
    setOpenPopover(true);
  };

  const handlePopoverClose = () => {
    setOpenPopover(false);
    setAnchorEl(null);
  };

  const setProject = (projectList) => {
    setProjectList(projectList);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOnClickReject = async (projectId) => {
    console.log("Rejected project ID:", projectId);

    try {
      const response = await projectApiInstance.put(
        `update-project-status?id=${projectId}&projectStatus=${5}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response);

      if (response.data._isSuccess) {
        handleCloseModal();

        Swal.fire({
          title: "Thành công",
          text: "Cập nhật thành công",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        fetchProjects();
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleOnClickApprove = async (projectId) => {
    console.log("Approved project ID:", projectId);

    try {
      const response = await projectApiInstance.put(
        `update-project-status?id=${projectId}&projectStatus=${2}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response);

      if (response.data._isSuccess) {
        handleCloseModal();

        Swal.fire({
          title: "Thành công",
          text: "Cập nhật thành công",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        fetchProjects();
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleOnClicRefund = async (projectId) => {
    console.log("Refund project ID:", projectId);

    try {
      const response = await transactionApiInstance.post(
        `refund/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.result._isSuccess) {
        console.log(response.data);
        handleCloseModal();

        Swal.fire({
          title: "Thành công",
          text: "Hoàn tiền thành công",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        fetchProjects();
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const visibleRows = React.useMemo(
    () =>
      Array.isArray(projectList) && projectList.length > 0
        ? stableSort(projectList, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
        : [],
    [order, orderBy, page, rowsPerPage, projectList]
  );

  //get backers
  const getBackers = (projectId) => {
    projectApiInstance
      .get(`/get-project-backer?projectId=${projectId}`)
      .then((res) => {
        if (res.data) {
          setBackerList(res.data.result._data);
        }
      });
  };

  useEffect(() => {
    if (tabValue === 4 && selectedProject) {
      console.log(selectedProject);
      getBackers(selectedProject.id);
    }
  }, [tabValue, selectedProject]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          projectsCount={Array.isArray(projectList) ? projectList.length : 0}
        />
        <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "100%", maxWidth: "1200px" }}>
            <SearchBarProjects
              setProject={setProject}
              searchType="all"
              width="100%"
            />
          </Box>
        </Box>
        <TableContainer sx={{ padding: 4 }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((item, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={item.id}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleRowClick(item)}
                  >
                    <TableCell component="th" id={labelId} scope="item">
                      {item.projectName}
                    </TableCell>
                    <TableCell>{item.projectOwnerName}</TableCell>
                    <TableCell align="right">{item.projectTarget}</TableCell>
                    <TableCell>
                      {dayjs(item.createdDate).format("DD-MM-YYYY HH:mm")}
                    </TableCell>
                    <TableCell>{statuses[item.projectStatus]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ margin: 4 }}
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={Array.isArray(projectList) ? projectList.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} của ${count !== -1 ? count : `hơn ${to}`}`
          }
        />
      </Paper>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            padding: 4,
            backgroundColor: "white",
            margin: "auto",
            marginTop: "5%",
            width: "50%",
            borderRadius: 1,
            maxHeight: "75vh",
            overflowY: "auto",
          }}
        >
          <Tabs value={tabValue} onChange={handleChangeTab}>
            <Tab label="Tổng quan" className="tab-project" />
            <Tab label="Video demo" className="tab-project" />
            <Tab label="Hình ảnh" className="tab-project" />
            <Tab label="Gói" className="tab-project" />
            <Tab label="Danh sách ủng hộ" className="tab-project" />
          </Tabs>

          {tabValue === 0 && selectedProject && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4} sx={{ mt: "16px !important" }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: 0,
                      paddingBottom: "100%", // This creates a square box.
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: `url(${selectedProject.projectThumbnail})`,
                      position: "relative",
                      cursor: "pointer",
                      "&:hover .zoomIcon": {
                        display: "flex",
                      },
                    }}
                    onClick={handleOpen}
                  >
                    <IconButton
                      className="zoomIcon"
                      sx={{
                        display: "none",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                        },
                      }}
                    >
                      <ZoomInIcon fontSize="large" />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: `${
                        backgroundColor[selectedProject.projectStatus]
                      }`,
                    }}
                    className="text-center mt-4 p-1 text-slate-100 font-medium rounded"
                  >
                    {statuses[selectedProject.projectStatus]}
                  </Box>
                </Grid>
                <Grid item xs={12} md={8} sx={{ mt: "16px !important" }}>
                  <Box
                    sx={{
                      marginBottom: 2,
                      textAlign: "right",
                    }}
                  >
                    <Typography className="!text-sm italic ">
                      Tạo ngày{" "}
                      <span style={{ color: "#FBB03B" }}>
                        {dayjs(selectedProject.createdDate).format(
                          "DD-MM-YYYY HH:mm"
                        )}
                      </span>{" "}
                      bởi{" "}
                      <span style={{ color: "#FBB03B" }}>
                        {selectedProject.projectOwnerName}
                      </span>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      marginBottom: 1,
                    }}
                  >
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={selectedProject.categories[0].name}
                        sx={{ backgroundColor: "#FBB03B", color: "white" }}
                      />
                      {selectedProject.subCategories.map((subCategory) => (
                        <Chip key={subCategory.id} label={subCategory.name} />
                      ))}
                    </Stack>
                  </Box>
                  <Box
                    sx={{
                      marginBottom: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h2"
                      className="!font-bold"
                    >
                      {selectedProject.projectName}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ mt: 1 }}>
                      {selectedProject.projectDescription}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box>
                <Typography
                  sx={{ color: "#FBB03B" }}
                  className="!font-semibold text-base"
                >
                  <AccessTimeIcon fontSize="small" /> Thời gian
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography variant="body2" color="textSecondary">
                    {formatDate(selectedProject.startDate)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {formatDate(selectedProject.endDate)}
                  </Typography>
                </Box>
                <LinearProgress
                  sx={{
                    backgroundColor: "#f0f0f0",
                    "& .MuiLinearProgress-barColorPrimary": {
                      backgroundColor: "#FBB03B",
                    },
                  }}
                  variant={
                    selectedProject.startDate > currentDate
                      ? "indeterminate"
                      : "determinate"
                  }
                  value={progressValue}
                />
                <Box display="flex" justifyContent="center" mt={1}>
                  <Typography variant="body2" color="textSecondary">
                    {progressText}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography
                  sx={{ color: "#FBB03B" }}
                  className="!font-semibold text-base"
                >
                  <MonetizationOnOutlinedIcon fontSize="small" /> Mục tiêu
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography variant="body2" color="textSecondary">
                    0
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedProject.projectTarget}
                  </Typography>
                </Box>
                <LinearProgress
                  sx={{
                    backgroundColor: "#f0f0f0",
                    "& .MuiLinearProgress-barColorPrimary": {
                      backgroundColor: "#FBB03B",
                    },
                  }}
                  variant={"determinate"}
                  value={
                    selectedProject.projectBalance <
                    selectedProject.projectTarget
                      ? Math.min(
                          Math.max(
                            (selectedProject.projectBalance /
                              selectedProject.projectTarget) *
                              100,
                            0
                          ),
                          100
                        )
                      : 100
                  }
                />
                <Box display="flex" justifyContent="center" mt={1}>
                  <Typography variant="body2" color="textSecondary">
                    {selectedProject.projectBalance} đã được ủng hộ
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography
                  sx={{ color: "#FBB03B" }}
                  className="!font-semibold text-base"
                >
                  <AccountBalanceOutlinedIcon fontSize="small" /> Tài khoản ngân
                  hàng
                </Typography>
                <Box display="flex" flexDirection={"column"} mt={1}>
                  <Typography variant="body2" mb={1}>
                    Ngân hàng:{" "}
                    <span className="!font-medium">
                      {selectedProject.bankAccountName}
                    </span>
                  </Typography>
                  <Typography variant="body2" mb={1}>
                    Số tài khoản:{" "}
                    <span className="!font-medium">
                      {selectedProject.bankAccountNumber}
                    </span>
                  </Typography>
                  <Typography variant="body2" mb={1}>
                    Tên người thụ hưởng:{" "}
                    <span className="!font-medium">
                      {selectedProject.bankOwnerName}
                    </span>
                  </Typography>
                </Box>
              </Box>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "white",
                    boxShadow: 24,
                    maxWidth: "90%",
                    maxHeight: "90%",
                    overflow: "auto",
                  }}
                >
                  <img
                    src={selectedProject.projectThumbnail}
                    alt="Project Full Size"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </Modal>
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <Box sx={{ marginTop: "16px" }}>
                <video width="100%" controls>
                  <source
                    src={selectedProject.projectLiveDemo}
                    type="video/mp4"
                  />
                </video>
              </Box>
            </Box>
          )}

          {tabValue === 2 && (
            <Box>
              <ImageList variant="masonry" cols={3} gap={8} sx={{ mt: "16px" }}>
                {selectedProject.images?.map((image, index) => (
                  <ImageListItem key={index}>
                    <img
                      srcSet={`${image.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${image.url}?w=248&fit=crop&auto=format`}
                      alt={image.url}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          )}

          {tabValue === 3 && selectedProject && (
            <Box
              sx={{ marginTop: "16px", gap: 2 }}
              display={"flex"}
              flexWrap={"wrap"}
            >
              {selectedProject.packageViewResponses.map(
                (projectPackage, index) => (
                  <Card
                    sx={{ maxWidth: 220, position: "relative" }}
                    key={index}
                  >
                    <CardMedia
                      component="img"
                      alt="package image"
                      height="160"
                      image="https://t4.ftcdn.net/jpg/03/03/46/39/360_F_303463981_i1CiZU5VYclryudt7VI7YSEDw9mgkSqJ.jpg"
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: "25%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {projectPackage.requiredAmount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      </Typography>
                    </Box>
                    <CardContent>
                      <Typography
                        gutterbottom="true"
                        sx={{ textAlign: "left", fontSize: "1rem" }}
                      >
                        {projectPackage.packageName}
                      </Typography>
                      <Typography
                        gutterbottom="true"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "left",
                          fontSize: "1.2rem",
                        }}
                      >
                        {projectPackage.requiredAmount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        VND
                      </Typography>
                      <Typography
                        gutterbottom="true"
                        sx={{ textAlign: "left", fontSize: ".8rem" }}
                      >
                        {projectPackage.packageDescription}
                      </Typography>
                      <Divider gutterbottom="true" sx={{ marginTop: 1 }} />
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                      <Button
                        size="small"
                        sx={{ color: "#FFB30B" }}
                        onMouseEnter={(e) =>
                          handlePopoverOpen(e, projectPackage.rewardItems)
                        }
                        onMouseLeave={handlePopoverClose}
                      >
                        Xem quà
                      </Button>
                      <Popover
                        sx={{
                          pointerEvents: "none",
                        }}
                        open={openPopover}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                      >
                        {currentRewardItems.length > 0 ? (
                          currentRewardItems.map((reward, index) => (
                            <Box
                              sx={{
                                p: 2,
                                display: "flex",
                              }}
                              key={index}
                            >
                              <Box
                                sx={{
                                  width: "100px",
                                  height: "100px",
                                  overflow: "hidden",
                                  flexShrink: 0,
                                }}
                              >
                                <CardMedia
                                  component="img"
                                  alt="reward image"
                                  height="140"
                                  image="https://atlas-content-cdn.pixelsquid.com/stock-images/giftbox-yellow-gift-box-ZeaGEQ7-600.jpg"
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </Box>
                              <Box sx={{ ml: 2 }}>
                                <Typography variant="h6">
                                  {reward.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {reward.description}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Số lượng: {reward.quantity}
                                </Typography>
                              </Box>
                            </Box>
                          ))
                        ) : (
                          <Box sx={{ padding: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                              Không có quà
                            </Typography>
                          </Box>
                        )}
                      </Popover>
                    </CardActions>
                  </Card>
                )
              )}
            </Box>
          )}

          {tabValue === 4 && (
            <Box>
              <BackerList data={backerList} />
            </Box>
          )}

          {selectedProject?.projectStatus === 1 && (
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{
                  color: "#44494D",
                  backgroundColor: "white",
                  textTransform: "none !important",
                  "&:hover": {
                    backgroundColor: "#DD5746",
                    color: "white",
                  },
                  "&:active": {
                    outline: "none !important",
                  },
                  "&:focus": {
                    outline: "none !important",
                  },
                  fontWeight: "bold",
                }}
                onClick={() => handleOnClickReject(selectedProject.id)}
              >
                Từ chối
              </Button>
              <Button
                variant="contained"
                sx={{
                  color: "#44494D",
                  backgroundColor: "white",
                  ml: 2,
                  textTransform: "none !important",
                  "&:hover": {
                    backgroundColor: "#368D59",
                    color: "white",
                  },
                  "&:active": {
                    outline: "none !important",
                  },
                  "&:focus": {
                    outline: "none !important",
                  },
                  fontWeight: "bold",
                }}
                onClick={() => handleOnClickApprove(selectedProject.id)}
              >
                Duyệt
              </Button>
            </Box>
          )}

          {selectedProject?.projectStatus === 4 &&
            selectedProject?.projectBalance > 0 && (
              <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                    color: "#44494D",
                    backgroundColor: "white",
                    textTransform: "none !important",
                    "&:hover": {
                      backgroundColor: "#FBB03B",
                      color: "white",
                    },
                    "&:active": {
                      outline: "none !important",
                    },
                    "&:focus": {
                      outline: "none !important",
                    },
                    fontWeight: "bold",
                  }}
                  onClick={() => handleOnClicRefund(selectedProject.id)}
                >
                  Hoàn tiền
                </Button>
              </Box>
            )}
        </Box>
      </Modal>
    </Box>
  );
}

export default AdminProjects;
