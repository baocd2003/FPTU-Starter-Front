import { Box, Button, Chip, Divider, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import categoryApiInstance from '../../../utils/apiInstance/categoryApiInstance';
import './index.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import { setStepOne } from '../../../redux/projectStepSlice';
import { setFormData } from '../../../redux/projectFormSlice';


const StepOne = () => {
  const existingData = useSelector((state) => state.projectForm.projectForm.stepOneData)

  const [categories, setCategories] = useState([]);
  const [subCates, setSubCates] = useState([]);
  const [selectedSubcate, setSelectedSubcate] = useState(existingData.SubCategory || [])
  const { register, watch, formState: { errors }, handleSubmit } = useForm(
    {
      defaultValues: existingData ? existingData : null
    }
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  dispatch(setStepOne());


  // TODO: replace with redux query
  const [selectedCateId, setSelectedCateId] = useState(existingData.Category || '')
  useEffect(() => {
    if (selectedCateId) {
      categoryApiInstance.get(`/getSubCates?cateId=${selectedCateId}`)
        .then(res => {
          if (res.data.result._isSuccess) {
            setSubCates(res.data.result._data);
          }
        })
        .catch((err) => {
          console.log(err.response?.data)
        })
    }

  }, [selectedCateId])

  useEffect(() => {
    const fetchCates = async () => {
      await categoryApiInstance.get('').then(res => {
        if (res.data.result._isSuccess) {
          setCategories(res.data.result._data)
        }
      })
    }
    fetchCates();
  }, []);

  const styleLeftGridForm = () => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    pr: 3
  })

  const onSubmit = (data) => {
    dispatch(setFormData({ step: 'stepOneData', data }))
    navigate('/init-project/step-two')
  }

  const handleSubcateSelect = (e) => {
    setSelectedSubcate(
      typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value
    )
  }

  const today = new Date();
  const minStartDate = new Date(today.setDate(today.getDate() + 7)).toISOString().split('T')[0];
  console.log(minStartDate)
  const validateProjectTarget = (value) => value >= 100000 && value % 10000 === 0;
  const validateEndDate = (endDate) => {
    const startDate = watch('startDate');
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffDays = (end - start) / (1000 * 60 * 60 * 24);
      return end > start && diffDays >= 7;
    }
    return false;
  };

  const [formattedProjectTarget, setFormattedProjectTarget] = useState('');
  const handleProjectTargetChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    const formattedValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    setFormattedProjectTarget(formattedValue);
  };

  return (
    <>
      <Box
        component={Paper}
        elevation={5}
        sx={{
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Typography sx={{
          fontSize: '2rem', fontWeight: 'bold', py: 2, px: 6, mb: 5, color: 'white',
          background: '#FBB03B',
          textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.5)'
        }}
        >Thiết lập các thông tin cơ bản</Typography>

        <Box
          sx={{
            px: 6,
            pr: 10,
          }}
        >
          <Grid container>
            <Grid item xs={12} sx={{ m: '0 !important' }}><Divider sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)', }}>Thiết lập danh mục</Divider></Grid>
            <Grid item xs={3} sx={styleLeftGridForm}>
              <Typography
                textAlign='left'
                sx={{
                  fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '.85rem'
                }}
              >Danh mục dự án *</Typography>
              <Typography
                textAlign='left'
                sx={{
                  color: 'rgba(0, 0, 0, 0.5)',
                  fontSize: '.7rem',
                  mt: .2
                }}
              >Phân loại danh mục giúp những người ủng hộ dễ dàng tìm thấy và kết nối đến dự án của bạn.</Typography>
            </Grid>
            <Grid item xs={9} sx={{ display: 'flex', gap: 3 }}>
              <FormControl sx={{ width: '35%' }}>
                <InputLabel id='cate-label'>Danh mục chính</InputLabel>
                <Select
                  labelId='cate-label'
                  label='Danh mục chính'
                  fullWidth
                  error={errors.Category?.type === 'required' ? true : false}
                  defaultValue={existingData ? existingData.Category : ''} {...register('Category', { required: true })}
                  onChange={(e) => setSelectedCateId(e.target.value)}
                >
                  {categories.map((item, index) => (
                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
                {errors.Category?.type === 'required' && (
                  <FormHelperText sx={{ color: 'red' }}>Hãy chọn một danh mục</FormHelperText>
                )}
              </FormControl>
              <FormControl variant='outlined' sx={{ width: '65%' }}>
                <InputLabel id='sub-cate-label'>Danh mục phụ</InputLabel>
                <Select
                  labelId='sub-cate-label'
                  label='Danh mục phụ'
                  fullWidth
                  error={errors.SubCategory?.type === 'required' ? true : false}
                  defaultValue={[]} {...register('SubCategory', { required: true })}
                  multiple value={selectedSubcate}
                  disabled={!subCates.length}
                  sx={{ background: !subCates.length ? "#F0F0F0" : "white" }}
                  onChange={(e) => handleSubcateSelect(e)}
                >
                  {subCates.map((item, index) => (
                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
                {errors.SubCategory?.type === 'required' && (
                  <FormHelperText sx={{ color: 'red' }}>Hãy chọn ít nhất một danh mục phụ</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/******************/}
            {/** Project Dtail */}
            {/******************/}
            <Grid item xs={12} sx={{ m: '0 !important' }}><Divider sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Chi tiết dự án</Divider></Grid>
            <Grid item xs={3} sx={styleLeftGridForm}>
              <Typography
                textAlign='left'
                sx={{
                  fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '.85rem'
                }}
              >Tiêu đề dự án *</Typography>
              <Typography
                textAlign='left'

                sx={{
                  color: 'rgba(0, 0, 0, 0.5)',
                  fontSize: '.7rem',
                  mt: .2
                }}
              >Hãy chọn một tiêu đề ngắn gọn và thu hút</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField {...register('ProjectName', { required: true })}
                placeholder='Tiêu đề..'
                fullWidth
                error={errors.ProjectName?.type === 'required' ? true : false}
                helperText={errors.ProjectName?.type === 'required' && 'Hãy nhập tên dự án của bạn'}
              />
            </Grid>
            <Grid item xs={3} sx={styleLeftGridForm}>
              <Typography
                textAlign='left'
                sx={{
                  fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '.85rem'
                }}
              >Mô tả dự án *</Typography>
              <Typography
                textAlign='left'
                sx={{
                  color: 'rgba(0, 0, 0, 0.5)',
                  fontSize: '.7rem',
                  mt: .2
                }}
              >Hãy viết đoạn mô tả nhỏ để truyền tải sơ lược dự án của bạn</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField {...register('ProjectDescription', { required: true })}
                type='text'
                fullWidth
                placeholder='Mô tả dự án..'
                error={errors.ProjectDescription?.type === 'required' ? true : false}
                helperText={errors.ProjectDescription?.type === 'required' && 'Hãy nhập mô tả dự án của bạn'}
              // multiline rows={2}
              />
            </Grid>
            <Grid item xs={3} sx={styleLeftGridForm}>
              <Typography
                textAlign='left'
                sx={{
                  fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '.85rem'
                }}
              >Mục tiêu dự án *</Typography>
              <Typography
                textAlign='left'
                sx={{
                  color: 'rgba(0, 0, 0, 0.5)',
                  fontSize: '.7rem',
                  mt: .2
                }}
              >Đặt ra mục tiêu cho dự án của bạn</Typography>
            </Grid>
            <Grid item xs={9} sx={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between' }}>
              <TextField {...register('ProjectTarget', {
                required: true,
                validate: validateProjectTarget
              })}
                type='number'
                placeholder='Nhập số tiền'
                sx={{ width: '48%' }}
                onChange={handleProjectTargetChange}
                error={!!errors.ProjectTarget}
                helperText={errors.ProjectTarget?.type === 'required'
                  ? 'Hãy nhập số tiền'
                  : errors.ProjectTarget?.type === 'validate'
                    ? 'Số tiền kêu gọi phải lớn hơn hoặc bằng 100.000đ và chia hết cho 10.000đ'
                    : ''}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>VND</InputAdornment>,
                  inputProps: { min: '0' },
                }}
              />
              {formattedProjectTarget && (
                <Box sx={{ width: '48%', mt: 2 }}>
                  <Typography sx={{ fontSize: '.8rem' }}>{formattedProjectTarget} vnđ (định dạng số tiền)</Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={3} sx={styleLeftGridForm}>
              <Typography
                textAlign='left'
                sx={{
                  fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '.85rem'
                }}
              >Thời gian diễn ra</Typography>
              <Typography
                textAlign='left'
                sx={{
                  color: 'rgba(0, 0, 0, 0.5)',
                  fontSize: '.7rem',
                  mt: .2
                }}
              >Chọn khoảng thời gian mà bạn sẽ kêu gọi sự ủng hộ</Typography>
            </Grid>
            <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextField {...register('startDate', {
                required: true,
                min: minStartDate
              })}
                type='date'
                sx={{ width: '48%' }}
                error={!!errors.startDate}
                helperText={errors.startDate?.type === 'required'
                  ? 'Hãy chọn ngày bắt đầu'
                  : errors.startDate?.type === 'min'
                    ? 'Ngày bắt đầu phải sau 7 ngày từ hôm nay'
                    : ''}
                InputProps={{
                  inputProps: { min: minStartDate },
                }}
              />
              <TextField {...register('endDate', {
                required: true,
                validate: validateEndDate
              })}
                type='date'
                sx={{ width: '48%' }}
                error={!!errors.endDate}
                helperText={errors.endDate?.type === 'required'
                  ? 'Hãy chọn ngày kết thúc'
                  : errors.endDate?.type === 'validate'
                    ? 'Ngày kết thúc phải sau ngày bắt đầu và khoảng cách phải lớn hơn hoặc bằng 7 ngày'
                    : ''}
              />
            </Grid>
          </Grid>

          <Box sx={{ mb: 4, gap: 5, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <Button variant='outlined'
              disableElevation
              disabled
              sx={{
                fontWeight: 'bold',
                borderColor: '#FBB03B',
                color: '#FBB03B',
                '&:hover': {
                  borderColor: '#FBB03B'
                },
                '&:focus': {
                  outline: 'none'
                }
              }}>Quay lại</Button>
            <Button onClick={handleSubmit(onSubmit)} variant='contained'
              disableElevation
              sx={{
                background: '#FBB03B', fontWeight: 'bold',
                '&:hover': {
                  background: '#CC9847'
                },
                '&:focus': {
                  outline: 'none'
                }
              }}>Tiếp theo</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default StepOne;
