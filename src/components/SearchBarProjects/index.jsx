import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import categoryApiInstance from "../../utils/apiInstance/categoryApiInstance";
import projectApiInstance from "../../utils/apiInstance/projectApiInstance";
import './index.css';

const filteredStatues = [
  { label: 'Chờ duyệt', statusIndex: 1 },
  { label: 'Đang tiến hành', statusIndex: 2 },
  { label: 'Từ chối', statusIndex: 5 },
  { label: 'Thành công', statusIndex: 3 },
  { label: 'Thất bại', statusIndex: 4 },
  { label: 'Đã xóa', statusIndex: 0 },
];

const filteredTarget = [
  { label: 'Từ 0 - 1 triệu', statusIndex: 1 },
  { label: 'Từ 1 triệu - 10 triệu', statusIndex: 2 },
  { label: 'Từ 10 triệu - 100 triệu', statusIndex: 3 },
  { label: '100 triệu trở lên', statusIndex: 4 },
];

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

const SearchBarProjects = ({ setProject }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [projectList, setProjectList] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("");
  const [target, setTarget] = useState("");
  const [categoryName, selectCategoryName] = useState("");
  const token = Cookies.get("_auth");

  useEffect(() => {
    fetchProjects(searchValue, status, target, categoryName);
    getCategories();
  }, [token]);

  const fetchProjects = async (searchValue, status, target, categoryName) => {
    if (token) {
      try {
        const response = await projectApiInstance.get(`user-project?searchName=${searchValue}&projectStatus=${status}&moneyTarget=${target}&categoryName=${categoryName}`, {
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
    }
  };

  const getCategories = async () => {
    try {
      const response = await categoryApiInstance.get("");
      if (response.data.result._data != null) {
        const category = response.data.result._data;
        setCategories(category);
      }
    } catch (error) {
      console.error("Error fetching category list:", error);
    }
  }

  const handleCancel = () => {
    setSearchValue("");
    fetchProjects("", status, target, categoryName);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13 || (e.code === "Enter")) {
      handleSearchChange(e);
    } else if (e.keyCode === 27 || e.code === "Escape") {
      handleCancel();
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    fetchProjects(e.target.value, status, target, categoryName);
  };

  const handleSearchStatus = (statusIndex) => {
    setStatus(statusIndex);
    fetchProjects(searchValue, statusIndex, target, categoryName);
  };

  const handleSearchCategory = (newCategoryName) => {
    selectCategoryName(newCategoryName);
    fetchProjects(searchValue, status, target, newCategoryName);
  };

  const handleSearchTarget = (newTarget) => {
    setTarget(newTarget);
    fetchProjects(searchValue, status, newTarget, categoryName);
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
      <Box flex="1" mb={isSmallScreen ? 2 : 0} width={isSmallScreen ? "100%" : "50%"}>
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
            placeholder={"Bạn đang tìm dự án gì?"}
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
        <Box
          width={isSmallScreen ? "100%" : "auto"}
        >
          <FormControl
            size="small"
            fullWidth={isSmallScreen}
            sx={{
              width: '160px',
              minWidth: 120
            }}
          >
            <InputLabel id="select-small-label">Trạng thái</InputLabel>
            <Select
              labelId="select-small-label"
              id="select-small"
              defaultValue={0}
              label="Trạng thái"
              sx={{ textAlign: 'left' }}
            >
              <MenuItem value={0} sx={{ width: '100%', height: '54px' }}
                onClick={() => handleSearchStatus("")}
              >
                Tất cả
              </MenuItem>
              {filteredStatues.map((item, index) => (
                <MenuItem
                  key={index}
                  sx={{ width: '100%', height: '54px' }}
                  value={index + 1}
                  onClick={() => handleSearchStatus(item.statusIndex)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          width={isSmallScreen ? "100%" : "auto"}
        >
          <FormControl
            sx={{ minWidth: 120, width: '160px' }}
            size="small"
            fullWidth={isSmallScreen}
          >
            <InputLabel id="select-small-label-2">Mục tiêu</InputLabel>
            <Select
              labelId="select-small-label-2"
              id="select-small-2"
              defaultValue={0}
              label="Mục tiêu"
              sx={{ textAlign: 'left' }}
            >
              <MenuItem value={0}
                onClick={() => handleSearchTarget("")}
              >
                Tất cả
              </MenuItem>
              {filteredTarget.map((item, index) => (
                <MenuItem
                  key={index}
                  sx={{ width: '100%', height: '54px' }}
                  value={index + 1}
                  onClick={() => handleSearchTarget(item.statusIndex)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          width={isSmallScreen ? "100%" : "auto"}
        >
          <FormControl
            sx={{ minWidth: 120 }}
            size="small"
            fullWidth={isSmallScreen}
          >
            <InputLabel id="select-small-label-3">Thể loại</InputLabel>
            <Select
              labelId="select-small-label-3"
              id="select-small-3"
              label="Thể loại"
              defaultValue={0}
              sx={{ textAlign: 'left' }}
            >
              <MenuItem value={0}
                sx={{ width: '100%', height: '54px' }}
                onClick={() => handleSearchCategory("")}
              >
                Tất cả
              </MenuItem>
              {categories.map((item, index) => (
                <MenuItem
                  key={index}
                  sx={{ width: '100%', height: '54px' }}
                  value={index + 1}
                  onClick={() => handleSearchCategory(item.name)}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div >
    </Box >
  );
};

export default SearchBarProjects;
