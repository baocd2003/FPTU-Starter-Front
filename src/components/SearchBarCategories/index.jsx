import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import userManagementApiInstance from "../../utils/apiInstance/userManagementApiInstance";
import categoryApiInstance from "../../utils/apiInstance/categoryApiInstance";
import "./index.css";

const Search = styled("div")(() => ({
  borderRadius: "5px",
  backgroundColor: "#F2F2F2",
  position: "relative",
  width: "100%",
  height: "40px",

  "&:hover": {
    backgroundColor: alpha("#F2F2F2", 0.85),
  },
}));

const SearchIconWrapper = styled("div")(() => ({
  height: "100%",
  position: "absolute",
  padding: "0 10px",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const CloseIconWrapper = styled("div")(() => ({
  position: "absolute",
  height: "100%",
  right: 0,
  top: 0,
  padding: "0 10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    cursor: "pointer",
  },
}));

const StyledInputBase = styled(InputBase)(() => ({
  color: "inherit",
  width: "100%",
  paddingLeft: "40px",
  paddingRight: "40px",
  paddingTop: "3px",
  height: "100%",
}));

const CategoryModal = ({ open, handleClose, handleSave }) => {
  const [categoryName, setCategoryName] = useState("");
  const [subcategories, setSubcategories] = useState([""]);

  const handleAddSubcategory = () => {
    setSubcategories([...subcategories, ""]);
  };

  const handleRemoveSubcategory = (index) => {
    const newSubcategories = subcategories.filter((_, i) => i !== index);
    setSubcategories(newSubcategories);
  };

  const handleChangeSubcategory = (index, value) => {
    const newSubcategories = subcategories.map((subcat, i) =>
      i === index ? value : subcat
    );
    setSubcategories(newSubcategories);
  };

  const handleSaveClick = () => {
    handleSave(categoryName, subcategories);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxHeight: "75vh",
          overflowY: "auto",
        }}
        className="rounded"
      >
        <h2>Thêm danh mục</h2>
        <TextField
          fullWidth
          label="Tên danh mục"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          margin="normal"
        />
        {subcategories.map((subcat, index) => (
          <Box key={index} display="flex" alignItems="center">
            <TextField
              fullWidth
              label={`Danh mục phụ ${index + 1}`}
              value={subcat}
              onChange={(e) => handleChangeSubcategory(index, e.target.value)}
              margin="normal"
            />
            <IconButton onClick={() => handleRemoveSubcategory(index)}>
              <RemoveCircleIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          onClick={handleAddSubcategory}
          startIcon={<AddCircleIcon />}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Thêm danh mục phụ
        </Button>
        <Button
          onClick={handleSaveClick}
          variant="contained"
          sx={{
            mt: 2,
            ml: 2,
            backgroundColor: "#FFB30B",
            "&:hover": {
              backgroundColor: "white",
              color: "#FFB30B",
            },
          }}
        >
          Lưu
        </Button>
      </Box>
    </Modal>
  );
};

const SearchBarCategories = ({ setCategories }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [categoryList, setCategoryList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const token = Cookies.get("_auth");

  useEffect(() => {
    fetchCategories(searchValue);
  }, [token]);

  const fetchCategories = async (searchValue) => {
    if (token) {
      try {
        const response = await categoryApiInstance.get(
          `?search=${searchValue}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.result._data != null) {
          const categories = response.data.result._data;
          setCategoryList(categories);
          setCategories(categories);
        }
      } catch (error) {
        console.error("Error fetching category list:", error);
      }
    } else {
      try {
        const response = await categoryApiInstance.get(
          `?search=${searchValue}`
        );
        if (response.data.result._data != null) {
          const categories = response.data.result._data;
          setCategoryList(categories);
          setCategories(categories);
        }
      } catch (error) {
        console.error("Error fetching category list:", error);
      }
    }
  };

  const handleCancel = () => {
    setSearchValue("");
    fetchCategories("");
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13 || e.code === "Enter") {
      handleSearchChange(e);
    } else if (e.keyCode === 27 || e.code === "Escape") {
      handleCancel();
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    fetchCategories(e.target.value);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveCategory = (categoryName, subcategories) => {
    console.log("Category Name:", categoryName);
    console.log("Subcategories:", subcategories);
    // Handle saving category and subcategories
  };

  return (
    <Box
      display="flex"
      flexDirection={isSmallScreen ? "column" : "row"}
      alignItems="center"
      justifyContent={isSmallScreen ? "center" : "space-evenly"}
      width="100%"
      gap={isSmallScreen ? 0 : 8}
    >
      <Box
        flex="1"
        mb={isSmallScreen ? 2 : 0}
        width={isSmallScreen ? "100%" : "50%"}
      >
        <Search
          key={"SearchBarComponent-root"}
          style={{
            width: "100%",
            height: "40px",
          }}
          className={`SearchBarComponent-root`}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            inputProps={{
              onChange: handleSearchChange,
              value: searchValue,
            }}
            placeholder={"Bạn đang tìm danh mục nào?"}
            onKeyUp={handleKeyUp}
          />
          {searchValue ? (
            <CloseIconWrapper onClick={handleCancel}>
              <CloseIcon />
            </CloseIconWrapper>
          ) : null}
        </Search>
      </Box>
      <div className="flex gap-6 searchSelection">
        <Box width={isSmallScreen ? "100%" : "auto"}>
          <FormControl
            size="small"
            fullWidth={isSmallScreen}
            sx={{
              width: "180px",
              minWidth: 120,
            }}
          >
            <Button
              variant="contained"
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
                    border: "1px solid #FFB30B",
                    pointerEvents: "none",
                  },
                },
              }}
              onClick={handleOpenModal}
            >
              Thêm danh mục
            </Button>
            <CategoryModal
              open={modalOpen}
              handleClose={handleCloseModal}
              handleSave={handleSaveCategory}
            />
          </FormControl>
        </Box>
      </div>
    </Box>
  );
};

export default SearchBarCategories;
