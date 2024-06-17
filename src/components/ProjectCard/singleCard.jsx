import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import "./index.css";

function SingleCard({ id, category, imageLink, title, po, amount, progress, daysLeft, goal, likes, backers }) {
  const formattedAmount = new Intl.NumberFormat('vi-VN').format(amount);
  const formattedGoal = new Intl.NumberFormat('vi-VN').format(goal);

  const navigate = useNavigate();

  const handleClickDetail = () => {
    navigate(`/project-detail/${id}`);
  }

  return (
    <Card sx={{ width: '18rem', height: 'fit-content', padding: '20px', boxShadow: '0', borderRadius: '0.8rem', transition: 'all 0.2s', backgroundColor: 'transparent' }} className='project-card'>
      <CardMedia
        sx={{
          height: '12rem', width: '15.5rem', borderRadius: '0.4rem', mb: '1.2rem', position: 'relative', mx: 'auto',
          '&:hover .image-overlay': {
            opacity: '0.5 !important',
          },
          '&:hover .hover-button': {
            display: 'block',
            transition: 'all 0.3s !important',
          },
        }}
        image={imageLink}
      >
        <div
          className="image-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'black',
            opacity: 0,
            transition: 'opacity 0.3s',
            borderRadius: '0.4rem',
          }}
        ></div>
        <Button
          className="hover-button"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'none',
            backgroundColor: '#FFFFFF',
            width: '50%',
            boxShadow: '0.4rem',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            py: '0.6rem',
            color: '#44494D',
            '&:hover': {
              backgroundColor: '#DDDDDD',
            },
            letterSpacing: '0.5px',
            textTransform: 'none'
          }}
          onClick={() => handleClickDetail()}
        >
          Xem dự án
        </Button>
        <Button
          className="hover-button"
          sx={{
            position: 'absolute',
            top: '3%',
            right: '3%',
            display: 'none',
            backgroundColor: '#FFFFFF',
            boxShadow: '0.4rem',
            py: '0.3rem',
            px: '1rem',
            color: '#44494D',
            minWidth: '0',
            '&:hover': {
              backgroundColor: '#DDDDDD',
            },
            letterSpacing: '0.5px'
          }}
        >
          <FavoriteIcon sx={{ fontSize: '1rem' }} />
        </Button>
        <div className='absolute bottom-[-20px] translate-x-[10%]'>
          <Chip icon={<FavoriteIcon sx={{ color: '#FF6969 !important' }} />} label={likes} className='project-chip mr-[0.6rem] select-none !p-[0.2rem]' />
          <Chip icon={<PersonIcon sx={{ color: '#44494D !important' }} />} label={backers} className='project-chip select-none !p-[0.2rem]' />
        </div>
      </CardMedia>
      <CardContent sx={{ px: '0! important', mx: 'auto', paddingBottom: '0 !important' }}>
        <div className='flex flex-row justify-between items-center mb-[0.8rem]'>
          <div className='w-fit max-w-[50%]'>
            <Typography
              sx={{ textAlign: "left", fontSize: '0.8rem', color: '#FFFFFF', fontWeight: 600, backgroundColor: '#FBB03B', padding: '0.2rem 0.8rem', borderRadius: '0.4rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {category}
            </Typography>
          </div>
          <div className='w-fit max-w-[50%] flex flex-row justify-end items-center gap-1'>
            <AccessTimeIcon sx={{ width: '1.1rem', height: '1.1rem', color: '#A7A7A7', fontWeight: 600 }} />
            <Typography variant='h1' sx={{ fontSize: '0.8rem', color: '#A7A7A7', fontWeight: 600 }}>{daysLeft} ngày</Typography>
          </div>
        </div>
        <Typography variant="h5" sx={{
          textAlign: 'left', marginBottom: '0.8rem', fontSize: '1.2rem', display: '-webkit-box', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.5rem', wordWrap: 'break-word', height: '3rem', fontWeight: 600,
          '&:hover': {
            textDecoration: 'underline'
          },
          transition: 'all 0.2s', cursor: 'pointer'
        }}
          onClick={() => handleClickDetail()}
        >
          {title}
        </Typography>
        <Typography variant="h5" sx={{ textAlign: "left", fontSize: '1rem', marginBottom: '0.8rem', color: '#A7A7A7' }}>
          bởi {po}
        </Typography>
        <div className='flex flex-row justify-between items-center mb-[0.2rem]'>
          <Typography variant="h6" sx={{ textAlign: "left", fontSize: '0.9rem', fontWeight: 'bold' }}>
            Ủng hộ: {formattedAmount} VND
          </Typography>
          <Typography sx={{ textAlign: "left", fontSize: '0.9rem', fontWeight: 'bold' }}>
            {progress} %
          </Typography>
        </div>
        <LinearProgress className='progressBar' variant="determinate" value={progress} sx={{ borderRadius: '0.4rem', height: '0.4rem', marginBottom: '0.4rem' }} />
        <Typography variant="h6" sx={{ textAlign: "left", fontSize: '1rem', marginBottom: '0', fontWeight: 'bold' }}>
          Mục tiêu: {formattedGoal} VND
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SingleCard