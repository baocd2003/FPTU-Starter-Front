import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import SearchBarProjects from "../../components/SearchBarProjects";
import projectApiInstance from "../../utils/apiInstance/projectApiInstance";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { visuallyHidden } from "@mui/utils";

const statuses = [
  "Đã xóa",
  "Chờ duyệt",
  "Đang tiến hành",
  "Thành công",
  "Thất bại",
  "Từ chối",
];

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
  { id: "startDate", numeric: false, label: "Ngày tạo" },
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

  const token = Cookies.get("_auth");

  console.log(projectList);

  useEffect(() => {
    fetchProjects();
  }, [token]);

  const fetchProjects = async () => {
    if (token) {
      try {
        const response = await projectApiInstance.get("", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const projects = response.data._data;
        setProjectList(projects);
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
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProject(null);
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

  const visibleRows = React.useMemo(
    () =>
      stableSort(projectList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, projectList]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar projectsCount={projectList.length} />
        <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "100%", maxWidth: "1200px" }}>
            <SearchBarProjects width="100%" />
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
                      {dayjs(item.createdDate).format("YYYY-MM-DD HH:mm")}
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
          count={projectList.length}
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
            marginTop: "10%",
            width: "50%",
            borderRadius: 1,
          }}
        >
          {selectedProject && (
            <>
              <Typography id="modal-title" variant="h6" component="h2">
                {selectedProject.projectName}
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                Miêu tả: {selectedProject.projectDescription}
              </Typography>
              <Typography>
                Chủ dự án: {selectedProject.projectOwnerName}
              </Typography>
              <Typography>Mục tiêu: {selectedProject.projectTarget}</Typography>
              <Typography>
                Ngày tạo:{" "}
                {dayjs(selectedProject.createdDate).format("YYYY-MM-DD HH:mm")}
              </Typography>
              <Typography>
                Ngày bắt đầu:{" "}
                {dayjs(selectedProject.startDate).format("YYYY-MM-DD HH:mm")}
              </Typography>
              <Typography>
                Ngày kết thúc:{" "}
                {dayjs(selectedProject.endDate).format("YYYY-MM-DD HH:mm")}
              </Typography>
              <Typography>Số dư: {selectedProject.projectBalance}</Typography>
              <Typography>
                Tài khoản ngân hàng: {selectedProject.projectBankAccount}
              </Typography>
              <Typography>
                Trạng thái: {statuses[selectedProject.projectStatus]}
              </Typography>

              {selectedProject.projectStatus === 1 && (
                <>
                  <Button
                    variant="contained"
                    sx={{
                      color: "#44494D",
                      backgroundColor: "white",
                      mt: { xs: "40px", lg: "32px" },
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
                      mt: { xs: "40px", lg: "32px" },
                      ml: { xs: "0px", lg: "32px" },
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
                </>
              )}
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default AdminProjects;
