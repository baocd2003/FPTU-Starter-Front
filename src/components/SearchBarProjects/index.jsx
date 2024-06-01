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
import PropTypes from "prop-types";
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

const SearchBarProjects = ({
  value,
  onChange,
  placeholder,
  onCancelResearch,
  onSearch,
  className,
  style,
  disabled,
  setProject,
}) => {
  const [internalValue, setInternalValue] = useState(value || "");
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [projectList, setProjectList] = useState([]);
  const [status, setStatus] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryName, selectCategoryName] = useState("");
  const token = Cookies.get("_auth");

  const handleChange = (e) => {
    setInternalValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    fetchProjects();
    getCategories();
  }, [token]);

  const fetchProjects = async () => {
    if (token) {
      try {
        const response = await projectApiInstance.get("user-project", {
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
    setInternalValue("");
    if (onCancelResearch) {
      onCancelResearch(internalValue);
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13 || (e.code === "Enter" && onSearch)) {
      onSearch(internalValue);
    } else if (e.keyCode === 27 || e.code === "Escape") {
      handleCancel();
    }
  };

  const [age, setAge] = React.useState("");

  const handleChangeSelect = (event) => {
    setAge(event.target.value);
  };

  const handleSearchStatus = (statusIndex) => {
    setStatus(statusIndex);
  };

  const handleSearchCategory = (categoryName) => {
    selectCategoryName(categoryName);
    console.log(categoryName)
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
      <Box flex="1" mb={isSmallScreen ? 2 : 0} width={isSmallScreen ? "100%" : "60%"}>
        <Search
          key={"SearchBarComponent-root"}
          style={{
            ...style,
            width: "100%",
            height: "40px",
          }}
          className={`SearchBarComponent-root ${className ? className : ""}`}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            inputProps={{
              onChange: handleChange,
              value: internalValue,
            }}
            placeholder={placeholder || "Bạn đang tìm dự án gì?"}
            onKeyUp={handleKeyUp}
            disabled={disabled}
          />
          {internalValue ? (
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
              <MenuItem value={0} sx={{ width: '100%', height: '54px' }}>
                Tất cả
              </MenuItem>
              {filteredStatues.map((item, index) => (
                <MenuItem
                  key={index}
                  sx={{ width: '100%', height: '54px' }}
                  value={item.value}
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
            sx={{ minWidth: 120 }}
            size="small"
            fullWidth={isSmallScreen}
          >
            <InputLabel id="select-small-label-2">Mục tiêu</InputLabel>
            <Select
              labelId="select-small-label-2"
              id="select-small-2"
              defaultValue={0}
              label="Mục tiêu"
            >
              <MenuItem value={0} sx={{ width: '100%', height: '54px' }}>
                Tất cả
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
              <MenuItem value={0} sx={{ width: '100%', height: '54px' }}>
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

SearchBarProjects.propTypes = {
  // custom top-level class
  className: PropTypes.string,
  // changes the default width of component
  width: PropTypes.node,
  // changes the default height of component
  height: PropTypes.node,
  // override the placeholder
  placeholder: PropTypes.string,
  // value of input text field
  value: PropTypes.string,
  // fired when input value changes
  onChange: PropTypes.func,
  // fired when the search is canceled
  onCancelResearch: PropTypes.func,
  // fired when press enter
  onSearch: PropTypes.func,
  // override styles of the root element
  style: PropTypes.object,
  // disable text field
  disabled: PropTypes.bool,
};

export default SearchBarProjects;
