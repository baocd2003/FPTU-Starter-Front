import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import SearchBarCategories from "../../components/SearchBarCategories";
import categoryApiInstance from "../../utils/apiInstance/categoryApiInstance";
import "./index.css";

// Row component to display each category and its subcategories
function Row(props) {
  const { row, onAddSubCategory } = props;
  const [open, setOpen] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState("");

  const handleAddSubCategory = async (e) => {
    if (e.key === "Enter" && newSubCategory.trim() !== "") {
      try {
        const res = await categoryApiInstance.post(
          `create-sub-caetgory?categoryId=${row.id}`,
          {
            name: newSubCategory,
          }
        );
        if (res.data._isSuccess === true) {
          onAddSubCategory(row.id, newSubCategory);
          setNewSubCategory("");
        } else {
          console.error("Error creating subcategory:", res.data.result._error);
        }
      } catch (error) {
        console.error("Error creating subcategory:", error);
      }
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            className="ib-arrow"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.subCategories.length}</TableCell>
        <TableCell>
          <Button
            variant="text"
            size="small"
            sx={{
              color: "#FFB30B",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => setOpen(true)}
            className="btn-add-subcate"
          >
            Thêm
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="subcategories">
                <TableBody>
                  {row.subCategories.map((subCategory) => (
                    <TableRow key={subCategory.id}>
                      <TableCell component="th" scope="row">
                        {subCategory.name}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <input
                        type="text"
                        value={newSubCategory}
                        onChange={(e) => setNewSubCategory(e.target.value)}
                        onKeyDown={handleAddSubCategory}
                        placeholder="Thêm danh mục phụ"
                        className="input-sub"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    subCategories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onAddSubCategory: PropTypes.func.isRequired,
};

// Title component
function EnhancedTableToolbar(props) {
  const { categoriesCount } = props;
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
        Danh mục ({categoriesCount})
      </Typography>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  categoriesCount: PropTypes.number.isRequired,
};

// Main AdminCategories component
function AdminCategories() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const res = await categoryApiInstance.get(``);
      if (res.data.result._isSuccess === true) {
        setCategoriesList(res.data.result._data);
      }
    } catch (error) {
      console.error("Error fetching project category:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddSubCategory = (categoryId, subCategoryName) => {
    setCategoriesList((prevCategoriesList) =>
      prevCategoriesList.map((category) =>
        category.id === categoryId
          ? {
            ...category,
            subCategories: [
              ...category.subCategories,
              {
                id: `${category.subCategories.length + 1}`,
                name: subCategoryName,
              },
            ],
          }
          : category
      )
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          categoriesCount={
            Array.isArray(categoriesList) ? categoriesList.length : 0
          }
        />
        <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "100%", maxWidth: "1200px" }}>
            <SearchBarCategories
              setCategories={(categoriesList) =>
                setCategoriesList(categoriesList)
              }
              width="100%"
            />
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Tên danh mục</TableCell>
                <TableCell>Số lượng danh mục phụ</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoriesList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category) => (
                  <Row
                    key={category.id}
                    row={category}
                    onAddSubCategory={handleAddSubCategory}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ margin: 4 }}
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={categoriesList.length}
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

export default AdminCategories;
