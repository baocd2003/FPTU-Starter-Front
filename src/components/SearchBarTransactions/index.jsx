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

const filteredTime = [
  { label: "1 tuần", time: "week" },
  { label: "1 tháng", time: "month" },
  { label: "1 năm", time: "year" },
];

const filteredType = [
  { label: "Ủng hộ miễn phí", type: 0 },
  { label: "Ủng hộ theo gói", type: 1 },
  { label: "Nạp tiền", type: 2 },
  { label: "Rút tiền từ ví", type: 3 },
  { label: "Rút tiền từ dự án", type: 4 },
  { label: "Hoàn tiền", type: 5 },
  { label: "Hoa hồng", type: 6 },
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

const SearchBarTransactions = ({ setTransactions }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [transactionList, setTransactionList] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("");
  const token = Cookies.get("_auth");

  useEffect(() => {
    fetchTransactions(searchValue, status);
  }, [token]);

  const fetchTransactions = async (searchValue, status) => {
    if (token) {
      try {
        const response = await projectApiInstance.get(
          `get-trans?search=${searchValue}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data._data != null) {
          const transactions = response.data._data;
          setTransactionList(transactions);
          setTransactions(transactions);
        }
      } catch (error) {
        console.error("Error fetching project list:", error);
      }
    } else {
      try {
        const response = await projectApiInstance.get(
          `get-trans?search=${searchValue}`
        );
        if (response.data._data != null) {
          const transactions = response.data._data;
          setTransactionList(transactions);
          setTransactions(transactions);
        }
      } catch (error) {
        console.error("Error fetching project list:", error);
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
            placeholder={"Bạn đang tìm giao dịch nào?"}
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
            <InputLabel id="select-small-label">Thời gian</InputLabel>
            <Select
              labelId="select-small-label"
              id="select-small"
              defaultValue={0}
              label="Thời gian"
              sx={{ textAlign: "left" }}
            >
              <MenuItem
                value={0}
                sx={{ width: "100%", height: "54px" }}
                onClick={() => handleSearchStatus("")}
              >
                Tất cả
              </MenuItem>
              {filteredTime.map((item, index) => (
                <MenuItem
                  key={index}
                  sx={{ width: "100%", height: "54px" }}
                  value={item.time}
                  onClick={() => handleSearchStatus(item.time)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box width={isSmallScreen ? "100%" : "auto"}>
          <FormControl
            sx={{ minWidth: 120, width: "160px" }}
            size="small"
            fullWidth={isSmallScreen}
          >
            <InputLabel id="select-small-label-2">Loại</InputLabel>
            <Select
              labelId="select-small-label-2"
              id="select-small-2"
              defaultValue={0}
              label="Loại"
              sx={{ textAlign: "left" }}
            >
              <MenuItem value={0} onClick={() => handleSearchTarget("")}>
                Tất cả
              </MenuItem>
              {filteredType.map((item, index) => (
                <MenuItem
                  key={index}
                  sx={{ width: "100%", height: "54px" }}
                  value={item.type}
                  onClick={() => handleSearchTarget(item.roleName)}
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

export default SearchBarTransactions;
