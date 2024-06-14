import React from 'react'
import { Typography, Grid, Avatar, Box } from '@mui/material';
import './index.css'
function CommentBar({ avatar, userName, content, date }) {
    return (
        <Grid container className='px-4 mb-2'>
            <Grid item className='avatar-container'>
                {avatar !== null ? <Avatar src={avatar}/> : <Avatar>H</Avatar>}
            </Grid>
            <Grid item xs={12} sm container className='comment-content'>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Box className='flex items-center'>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                {userName}
                            </Typography>
                            <Typography gutterBottom className='opacity-50' sx={{marginLeft : '1rem !important'}} component="div">
                                {date}
                            </Typography>
                        </Box>
                        <Typography variant="body2" gutterBottom>
                            {content}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CommentBar