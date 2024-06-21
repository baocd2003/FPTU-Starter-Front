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
import SearchBarTransactions from "../../components/SearchBarTransactions";
import transactionApiInstance from "../../utils/apiInstance/transactionApiInstance";
import projectApiInstance from "../../utils/apiInstance/projectApiInstance";
import userManagementApiInstance from "../../utils/apiInstance/userManagementApiInstance";

const type = [
  "Ủng hộ miễn phí",
  "Ủng hộ theo gói",
  "Nạp tiền",
  "Rút tiền từ ví",
  "Rút tiền từ dự án",
  "Hoàn tiền",
  "Hoa hồng",
];

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
  { id: "description", numeric: false, label: "Mô tả" },
  { id: "total", numeric: true, label: "Tổng tiền" },
  { id: "type", numeric: false, label: "Loại" },
  { id: "createdDate", numeric: false, label: "Ngày giao dịch" },
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
            {headCell.id == "total" || headCell.id == "createdDate" ? (
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
  const { transactionsCount } = props;
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
        Giao dịch ({transactionsCount})
      </Typography>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  transactionsCount: PropTypes.number.isRequired,
};

function AdminTransactions() {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdDate");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [transactionList, setTransactionList] = useState([]);

  const token = Cookies.get("_auth");

  useEffect(() => {
    fetchTransactions();
  }, [token]);

  const fetchTransactions = async () => {
    if (token) {
      try {
        const response = await projectApiInstance.get("get-trans", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const transactions = response.data.result._data;
        console.log(transactions);
        setTransactionList(transactions);
      } catch (error) {
        console.error("Error fetching transaction list:", error);
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
      Array.isArray(transactionList) && transactionList.length > 0
        ? stableSort(transactionList, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
        : [],
    [order, orderBy, page, rowsPerPage, transactionList]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          transactionsCount={
            Array.isArray(transactionList) ? transactionList.length : 0
          }
        />
        <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "100%", maxWidth: "1200px" }}>
            <SearchBarTransactions
              setTransactions={(transactionList) =>
                setUserList(transactionList)
              }
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
                  >
                    <TableCell>{item.backerName}</TableCell>
                    <TableCell sx={{ maxWidth: "400px" }}>
                      {item.description}
                    </TableCell>
                    <TableCell align="right">{item.totalAmount}</TableCell>
                    <TableCell>{type[item.transactionTypes]}</TableCell>
                    <TableCell>{formatDate(item.createDate)}</TableCell>
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
          count={Array.isArray(transactionList) ? transactionList.length : 0}
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

export default AdminTransactions;
