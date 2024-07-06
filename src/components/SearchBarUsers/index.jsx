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
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import userManagementApiInstance from "../../utils/apiInstance/userManagementApiInstance";
import projectApiInstance from "../../utils/apiInstance/projectApiInstance";
import "./index.css";

const filteredStatues = [
  { label: "Tất cả", statusIndex: -1 },
  { label: "Hoạt động", statusIndex: 0 },
  { label: "Đã chặn", statusIndex: 1 },
];

// const filteredRole = [
//   { label: "Chủ dự án", roleName: "ProjectOwner" },
//   { label: "Backer", roleName: "Backer" },
// ];

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

const SearchBarUsers = ({ setUsers }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [userList, setUserList] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState(-1);
  const token = Cookies.get("_auth");

  useEffect(() => {
    fetchUsers(searchValue, status);
  }, [token]);

  const fetchUsers = async (searchValue, status) => {
    if (token) {
      try {
        let response;

        response = await userManagementApiInstance.get(
          `?search=${searchValue}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (status !== -1) {
          response = await userManagementApiInstance.get(
            `get-user-by-status?types=${status}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }

        if (response.data._data != null) {
          const users = response.data._data;
          setUserList(users);
          setUsers(users);
        }
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    } else {
      try {
        const response = await userManagementApiInstance.get(
          `?search=${searchValue}`
        );
        if (response.data._data != null) {
          const users = response.data._data;
          setUserList(users);
          setUsers(users);
        }
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    }
  };

  const handleCancel = () => {
    setSearchValue("");
    fetchUsers("", status);
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
    fetchUsers(e.target.value, status);
  };

  const handleSearchStatus = (statusIndex) => {
    setStatus(statusIndex);
    fetchUsers(searchValue, statusIndex);
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
            placeholder={"Bạn đang tìm người dùng nào?"}
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
              width: "160px",
              minWidth: 120,
            }}
          >
            <InputLabel id="select-small-label">Trạng thái</InputLabel>
            <Select
              labelId="select-small-label"
              id="select-small"
              defaultValue={0}
              label="Trạng thái"
              sx={{ textAlign: "left" }}
            >
              {filteredStatues.map((item, index) => (
                <MenuItem
                  key={index}
                  sx={{ width: "100%", height: "54px" }}
                  value={index}
                  onClick={() => handleSearchStatus(item.statusIndex)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    </Box>
  );
};

export default SearchBarUsers;
