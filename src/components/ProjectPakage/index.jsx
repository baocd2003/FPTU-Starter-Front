import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { IoMdCloseCircle } from "react-icons/io";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Kurumi from '../../assets/samplePrj.png';

function ProjectPackage({ pack, closeClick }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius : '20px',
        pt: 2,
        px: 4,
        pb: 3,
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const formattedAmount = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
        pack.requiredAmount
    )
    return (
        <Card sx={{ display: 'flex',justifyContent:'space-between', width: { lg: 620, xs: 500 }, height: { lg: 300, xs: 500 }, borderRadius: '20px !important', marginBottom: '3rem' }} >     
            <CardMedia
                component="img"
                sx={{ width: 250, border: '2px solid #FBB03B', padding: '10px', margin: '10px' }}
                image={Kurumi}
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', textAlign: 'left' }}>
                    <Typography component="div" variant="h3" sx={{ fontWeight: '400', fontSize: '24px', marginBottom: '1rem' }}>
                        {pack.packageName}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: '400', fontSize: '24px', marginBottom: '1rem' }} color="text.secondary" component="div">
                        {formattedAmount}
                    </Typography>
                    <Typography sx={{ fontSize: '16px' }} component="div" className="text-left">
                        {pack.packageDescription}
                    </Typography>
                    <Button onClick={handleOpen} sx={{color :'#FBB03B'}}>Thông tin vật phẩm</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                        sx={{border :'2px solid #FBB03B'}}
                    >
                        <Box sx={{ ...style, width: 400,border :'2px solid #FBB03B' }}>
                           <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tên vật phẩm</TableCell>
                                        <TableCell>Mô tả vật phẩm</TableCell>
                                        <TableCell>Số lượng</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {pack.rewardItems.map((item, i) => (
                                <TableRow key={i}>
                                  <TableCell>{item.name}</TableCell>
                                   <TableCell>{item.description}</TableCell>
                                   <TableCell>{item.quantity}</TableCell>
                                 </TableRow>
                               ))}
                                </TableBody>
                           </Table>
                           
                        </Box>
                    </Modal>
                    
                </CardContent>
                
            </Box>
            <CardHeader
                action={
                    <IoMdCloseCircle onClick={closeClick} sx={{marginLeft : 'auto'}}/>
                }
            />
        </Card>
    )
}

export default ProjectPackage