import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React from 'react';
import './index.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { lg: '30%', xs: '90%' },
  height: 'fit-content',
  bgcolor: '#FFFFFF',
  boxShadow: 24,
  borderRadius: '10px',
  outline: 'none',
  p: '3rem',
};

function AuthenticationModal(props) {

  const onCloseModal = () => {
    props.handleCloseModal();
  }

  return (
    <Modal
      open={props.open}
      onClose={onCloseModal}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onCloseModal}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            color: (theme) => theme.palette.grey[500],
            '&:focus': {
              outline: 'none !important',
            },
            '&:hover': {
              color: '#FBB03B',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '24px' }}>
          Tải ảnh lên
        </Typography>
      </Box>
    </Modal>
  )
}

export default AuthenticationModal