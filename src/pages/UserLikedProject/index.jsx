import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress, Paper, Table } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import userManagementApiInstance from '../../utils/apiInstance/userManagementApiInstance';

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

function UserLikedProject() {
    const { setIsLoading } = useOutletContext();
    const [user, setUser] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const token = Cookies.get("_auth");

    useEffect(() => {
        if (token) {
            fetchUserData();
        }
    }, [token]);

    const fetchUserData = () => {
        userManagementApiInstance.get("/user-profile", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                const userData = response.data._data;
                setUser(userData);
                setUserEmail(userData.userEmail || '');
                setAccountName(userData.accountName || '');
                setUserName(userData.userName || '');
                setUserBirthDate(userData.userBirthDate ? dayjs(userData.userBirthDate) : null);
                setUserPhone(userData.userPhone || '');
                setUserAddress(userData.userAddress || '');
                setSelectedGender(userData.userGender == null ? '' : genderMapping[userData.userGender]);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleKeyUp = (e) => {
        if (e.keyCode === 13 || (e.code === "Enter")) {
            handleSearchChange(e);
        } else if (e.keyCode === 27 || e.code === "Escape") {
            handleCancel();
        }
    };

    //Search Project
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleCancel = () => {
        setSearchValue("");
    };

    return (
        <Paper elevation={3} sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            px: '2rem',
            py: '1.6rem'
        }}>
            {user == null ?
                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 100,
                    }}
                    open={!user || isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                : <>
                    <h1 className='text-left w-full text-[1.2rem] font-bold mb-[3.2rem]'>Các dự án đã thích</h1>
                    <Box flex="1" mb={2} sx={{ width: '100%' }}>
                        <Search
                            key={"SearchBarComponent-root"}
                            style={{
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
                    <Table>

                    </Table>
                </>
            }
        </Paper>
    )
}

export default UserLikedProject