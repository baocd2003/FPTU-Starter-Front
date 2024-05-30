import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
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
import { visuallyHidden } from "@mui/utils";

function createData(id, name, creator, goal, createdAt, status) {
  return { id, name, creator, goal, createdAt, status };
}

const rows = [
  createData(1, "Project A", "Alice", 50000.0, "2023-01-15", "Active"),
  createData(2, "Project B", "Bob", 75000.0, "2023-02-20", "Completed"),
  createData(3, "Project C", "Charlie", 30000.0, "2023-03-10", "Active"),
  createData(4, "Project D", "David", 150000.0, "2023-04-05", "Inactive"),
  createData(5, "Project E", "Eve", 120000.0, "2023-05-15", "Active"),
  createData(6, "Project F", "Frank", 90000.0, "2023-06-10", "Completed"),
  createData(7, "Project G", "Grace", 70000.0, "2023-07-20", "Active"),
  createData(8, "Project H", "Hank", 85000.0, "2023-08-15", "Inactive"),
  createData(9, "Project I", "Ivy", 65000.0, "2023-09-10", "Completed"),
  createData(10, "Project J", "Jack", 110000.0, "2023-10-05", "Active"),
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
  { id: "name", numeric: false, label: "Tên" },
  { id: "creator", numeric: false, label: "Chủ dự án" },
  { id: "goal", numeric: true, label: "Mục tiêu" },
  { id: "createdAt", numeric: false, label: "Ngày tạo" },
  { id: "status", numeric: false, label: "Trạng thái" },
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
            {headCell.id !== "creator" && headCell.id !== "status" ? (
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

//title
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
      {/* <Tooltip title="Filter list">
        <IconButton sx={{ padding: 4 }}>
          <FilterListIcon />
        </IconButton>
      </Tooltip> */}
    </Toolbar>
  );
}

function AdminProjects() {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [projectList, setProjectList] = useState([]);

  const token = Cookies.get("_auth");

  useEffect(() => {
    if (token) {
      projectApiInstance
        .get("", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const projects = response.data._data;
          console.log(projects);

          setProjectList(projects);
        })
        .catch((error) => {
          console.error("Error fetching project list:", error);
        });
    }
  }, [token]);

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

  const visibleRows = React.useMemo(
    () =>
      stableSort(projectList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
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
              {projectList.map((item, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={item.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell component="th" id={labelId} scope="item">
                      {item.projectName}
                    </TableCell>
                    <TableCell>{item.projectOwnerName}</TableCell>
                    <TableCell align="right">{item.projectTarget}</TableCell>
                    <TableCell>{item.startDate}</TableCell>
                    <TableCell>{item.projectStatus}</TableCell>
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
    </Box>
  );
}

export default AdminProjects;
