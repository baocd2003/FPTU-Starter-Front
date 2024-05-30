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
    // "packageName": "string",
    // "requiredAmount": 0,
    // "limitQuantity": 0,
    // "packageType": "string",
    // "projectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    // "rewardItems": [
    //   {
    //     "name": "string",
    //     "imageUrl": "string",
    //     "description": "string",
    //     "quantity": 0
    //   }
    // ]
    return (
        <Card sx={{ display: 'flex', width: { lg: 620, xs: 500 }, height: { lg: 300, xs: 500 }, borderRadius: '20px !important', marginBottom: '3rem' }} >
            

            
            <CardMedia
                component="img"
                sx={{ width: 200, border: '2px solid #FBB03B', padding: '10px', margin: '10px' }}
                image="http://res.cloudinary.com/diak7ssve/image/upload/v1717062086/lddccbvk6u4wgz3y9csq.jpg"
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
                        This reward contains the Bloody Business expansion for Scarface 1920, including all the reveals we are presenting during the campaign. You can choose the language version of the expansion.
                    </Typography>
                    <Button onClick={handleOpen}>Items information</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>
                           {pack.rewardItems.map((item, i) => (
                                <div key={i}>
                                  <div>{item.name}</div>
                                   <div>{item.imageUrl}</div>
                                   <div>{item.description}</div>
                                   <div>{item.quantity}</div>
                                 </div>
                               ))}
                            <Button onClick={handleClose}>Close Child Modal</Button>
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