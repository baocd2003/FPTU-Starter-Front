import React, { useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";

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

const SearchBar = ({
  value,
  width,
  onChange,
  placeholder,
  height,
  onCancelResearch,
  onSearch,
  className,
  style,
  disabled,
}) => {
  const [internalValue, setInternalValue] = useState(value || "");
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    setInternalValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

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

  return (
    <Box
      display="flex"
      flexDirection={isSmallScreen ? "column" : "row"}
      alignItems="center"
      justifyContent="center"
      width={isSmallScreen ? "100%" : "auto"}
      p={isSmallScreen ? 2 : 0}
    >
      <Box flex="1" mb={isSmallScreen ? 2 : 0} width="100%">
        <Search
          key={"SearchBarComponent-root"}
          style={{
            ...style,
            width: width || "100%",
            height: height || "40px",
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
      <Box
        ml={isSmallScreen ? 0 : 2}
        mr={isSmallScreen ? 0 : 2}
        my={isSmallScreen ? 2 : 0}
        width="auto"
      >
        <FormControl
          sx={{ minWidth: 120 }}
          size="small"
          fullWidth={isSmallScreen}
        >
          <InputLabel id="select-small-label">Age</InputLabel>
          <Select
            labelId="select-small-label"
            id="select-small"
            value={age}
            label="Age"
            onChange={handleChangeSelect}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        ml={isSmallScreen ? 0 : 2}
        mr={isSmallScreen ? 0 : 2}
        my={isSmallScreen ? 2 : 0}
        width="auto"
      >
        <FormControl
          sx={{ minWidth: 120 }}
          size="small"
          fullWidth={isSmallScreen}
        >
          <InputLabel id="select-small-label-2">Age</InputLabel>
          <Select
            labelId="select-small-label-2"
            id="select-small-2"
            value={age}
            label="Age"
            onChange={handleChangeSelect}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        ml={isSmallScreen ? 0 : 2}
        mr={isSmallScreen ? 0 : 2}
        my={isSmallScreen ? 2 : 0}
        width="auto"
      >
        <FormControl
          sx={{ minWidth: 120 }}
          size="small"
          fullWidth={isSmallScreen}
        >
          <InputLabel id="select-small-label-3">Age</InputLabel>
          <Select
            labelId="select-small-label-3"
            id="select-small-3"
            value={age}
            label="Age"
            onChange={handleChangeSelect}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

SearchBar.propTypes = {
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

export default SearchBar;
