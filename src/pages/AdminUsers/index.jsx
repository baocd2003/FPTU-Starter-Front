import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
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
import Button from "@mui/material/Button";
import { visuallyHidden } from "@mui/utils";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import SearchBarUsers from "../../components/SearchBarUsers";
import projectApiInstance from "../../utils/apiInstance/projectApiInstance";
import userManagementApiInstance from "../../utils/apiInstance/userManagementApiInstance";

const statuses = ["Hoạt động", "Đã chặn"];

const formatDate = (date) => dayjs(date).format("DD-MM-YYYY HH:mm");

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
  { id: "accountName", numeric: false, label: "Tên tài khoản" },
  { id: "name", numeric: false, label: "Tên người dùng" },
  { id: "email", numeric: false, label: "Email" },
  { id: "phoneNumber", numeric: false, label: "Số điện thoại" },
  { id: "gender", numeric: false, label: "Giới tính" },
  { id: "action", numeric: false, label: "Thao tác" },
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
            {headCell.id == "accountName" ? (
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

// EnhancedTableHead.propTypes = {
//   onRequestSort: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
//   orderBy: PropTypes.string.isRequired,
// };

// Title component
function EnhancedTableToolbar(props) {
  const { usersCount } = props;
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
        Người dùng ({usersCount})
      </Typography>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  usersCount: PropTypes.number.isRequired,
};

function AdminUsers() {
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userList, setUserList] = useState([]);

  const token = Cookies.get("_auth");

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    if (token) {
      try {
        const response = await userManagementApiInstance.get("", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const users = response.data._data;
        setUserList(users);
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

  const visibleRows = React.useMemo(
    () =>
      Array.isArray(userList) && userList.length > 0
        ? stableSort(userList, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
        : [],
    [order, orderBy, page, rowsPerPage, userList]
  );

  const handleOnClickBlock = async (userId) => {
    try {
      const res = await userManagementApiInstance.patch(
        `change-status?id=${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          usersCount={Array.isArray(userList) ? userList.length : 0}
        />
        <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "100%", maxWidth: "1200px" }}>
            <SearchBarUsers
              setUsers={(userList) => setUserList(userList)}
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
                    key={item.userId}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{item.accountName}</TableCell>
                    <TableCell>{item.userName}</TableCell>
                    <TableCell>{item.userEmail}</TableCell>
                    <TableCell>
                      {item.userPhone ? item.userPhone : "N/A"}
                    </TableCell>
                    <TableCell>
                      {item.userGender ? item.userGender : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Button
                        className="btn-block"
                        variant="contained"
                        size="small"
                        sx={{
                          color: "white",
                          backgroundColor: "#FFB30B",
                          "&:hover": {
                            backgroundColor: "white",
                            color: "#FFB30B",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              pointerEvents: "none",
                            },
                          },
                        }}
                        onClick={() => handleOnClickBlock(item.userId)}
                      >
                        {item.userStatus === 0 ? "Chặn" : "Bỏ chặn"}
                      </Button>
                    </TableCell>
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
          count={Array.isArray(userList) ? userList.length : 0}
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

export default AdminUsers;
