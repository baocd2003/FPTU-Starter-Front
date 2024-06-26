import CloseIcon from '@mui/icons-material/Close';
import { TabContext, TabPanel } from '@mui/lab';
import { Box, Grid, useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import SwipeableViews from "react-swipeable-views-react-18-fix";
import SignInModal from '../../pages/SignInModal';
import SignUpModal from '../../pages/SignUpModal';
import './index.css';

function AuthenticationModal(props) {
  const [tabValue, setTabValue] = useState(0);
  const modelProps = useSpring({ opacity: props.open ? 1 : 0, config: { duration: 250 } });
  const theme = useTheme();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: 'fit-content',
    minHeight: !isSmallScreen ? '85vh' : 'none',
    bgcolor: '#FFFFFF',
    boxShadow: 24,
    borderRadius: '1rem',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
  };

  const onCloseModal = () => {
    props.handleCloseModal();
  };

  useEffect(() => {
    setTabValue(props.tabValue !== undefined ? props.tabValue : 0);
  }, [props.tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Modal
      open={props.open}
      onClose={onCloseModal}
    >
      <animated.div style={modelProps}>
        <Box sx={modalStyle}>
          <IconButton
            onClick={onCloseModal}
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
              width: 40,
              height: 40,
              paddingTop: 0,
              borderRadius: '50%',
              display: { lg: 'block', xs: 'none' },
              color: (theme) => theme.palette.grey[500],
              '&:focus': {
                outline: 'none !important',
              },
              '&:hover': {
                color: '#44494D',
              },
              zIndex: 2
            }}
          >
            <CloseIcon />
          </IconButton>
          <Grid container columnSpacing={1} sx={{ width: '100%', marginLeft: 0 }}>
            {!isSmallScreen && (
              <Grid item xs={12} lg={6} sx={{ margin: '0 !important', paddingLeft: '0 !important' }}>
                <div className='w-full h-full bg-white rounded-[1rem] flex justify-center items-center p-[2rem]'>
                  <img
                    src='https://i.ibb.co/DrsJDbF/00d73641-11ea-43c0-a843-097b3eb62409.jpg'
                    alt='AuthenBanner'
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      minHeight: '85vh',
                      borderRadius: '1rem'
                    }}
                  />
                </div>
              </Grid>
            )}
            <Grid item xs={12} lg={6} sx={{ paddingLeft: '0 !important', mx: { xs: '1.6rem', lg: '0' } }}>
              <div className='flex flex-col justify-center !h-full right-section'>
                <TabContext value={tabValue.toString()} sx={{ height: '100%' }}>
                  <Box sx={{ borderBottom: '0', borderColor: 'divider', borderWidth: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} sx={{
                      [`& .MuiTabs-indicator`]: {
                        backgroundColor: '#44494D',
                      },
                    }}>
                      <Tab label="Đăng nhập" className='authTab !text-[1rem]' value={0} sx={{
                        '&.Mui-selected': {
                          color: '#44494D !important'
                        }
                      }} />
                      <Tab label="Đăng ký" className='authTab !text-[1rem]' value={1} sx={{
                        '&.Mui-selected': {
                          color: '#44494D !important'
                        }
                      }} />
                    </Tabs>
                  </Box>
                  <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={tabValue}
                    className='authenSwiper'
                    containerStyle={{
                      transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s'
                    }}
                  >
                    <TabPanel value={tabValue.toString()} index={0} dir={theme.direction} sx={{ height: '100%' }}>
                      <SignInModal />
                    </TabPanel>
                    <TabPanel value={tabValue.toString()} index={1} dir={theme.direction} sx={{ height: '100%' }}>
                      <SignUpModal />
                    </TabPanel>
                  </SwipeableViews>
                </TabContext>
              </div>
            </Grid>
          </Grid>
        </Box>
      </animated.div>
    </Modal>
  );
}

export default AuthenticationModal;