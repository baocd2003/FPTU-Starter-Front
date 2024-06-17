import React, { useState, useEffect } from 'react'
import {
    Box, Typography,
    InputAdornment, IconButton, Input, Grid, Button, Avatar
} from '@mui/material'
import './index.css';
import { IoMdSend } from "react-icons/io";
import projectApiInstance from '../../utils/apiInstance/projectApiInstance';
import CommentBar from '../CommentBar';
import { useNavigate } from "react-router-dom";
import interactionApiInstance from '../../utils/apiInstance/interactionApiInstance';
function CommentSection({ projectId, token }) {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [checkedBacker, setCheckedBacker] = useState(false);
    const navigate = useNavigate();
    //get all comments
    const getProjectComments = () => {
        interactionApiInstance.get(`/get-comments/${projectId}`).then(res => {
            console.log(res.data);
            setComments(res.data.result);
        })
    }
    //check backer
    const checkBacker = () => {
        if (token) {
            projectApiInstance.get(`/check-backer?projectId=${projectId}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                console.log(res.data);
                setCheckedBacker(res.data.result._data);
            });
        }

    }
    useEffect(() => {
        getProjectComments();
        checkBacker();
    }, []);

    console.log(comments)
    // onchange comment
    const handleChangeComment = (e) => {
        setContent(e.target.value);
        console.log(e.target.value)
    }
    //post comment
    const postComment = () => {
        interactionApiInstance.post('/comment-project', {
            'projectId': projectId,
            'content': content
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            console.log(res.data);
            getProjectComments();
        })
    }
    return (
        <Box className='text-left pl-[100px] pt-[50px]'>
            <Typography variant='h5'>Bình luận</Typography>
            <Box className='comment-container'>
                {token == undefined ?
                    <Box className='notice-login'>
                        <Grid container>
                            <Grid item xs={9}>
                                <Typography>
                                    {token !== undefined ? 'Bạn cần trở thành backer để tham gia bình luận dự án này'
                                        : ' Đăng nhập để bình luận'}
                                </Typography>
                                <Typography sx={{ opacity: 0.5, fontSize: '14px', marginTop: '20px' }}>
                                    Bạn phải đăng nhập để bình luận. Chưa có tài khoản ?
                                    <span className='text-[#FBB03B] cursor-pointer' onClick={() => navigate("/register")}>Đăng kí ngay</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={3} className='flex items-center'>
                                <Button onClick={() => navigate("/login")} sx={{ my: 4, color: '#FFF', display: 'block' }} className='c-btn'>Đăng nhập</Button>
                            </Grid>
                        </Grid>
                    </Box>
                    : !checkedBacker ? 
                    <Box className='notice-login'>
                    <Grid container>
                        <Grid item xs={9}>
                            <Typography>
                                {token !== undefined ? 'Bạn cần trở thành backer để tham gia bình luận dự án này'
                                    : ' Đăng nhập để bình luận'}
                            </Typography>
                            <Typography sx={{ opacity: 0.5, fontSize: '14px', marginTop: '20px' }}>
                                Bạn phải trở thành backer để tương tác với dự án.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>:
                    <Input
                        onChange={handleChangeComment}
                        id="input-with-sx" label="With sx"
                        variant="standard" fullWidth
                        className='p-3'
                        startAdornment={
                            <InputAdornment position="start">
                                <Avatar>H</Avatar>
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton><IoMdSend onClick={postComment} /></IconButton>
                            </InputAdornment>
                        } />
                }
                {comments.map((item, i) => (
                    <CommentBar key={i} content={item.content} date={item.createDate} userName={item.userName} avatar={item.avatarUrl} />
                ))}
            </Box>
        </Box>
    )
}

export default CommentSection