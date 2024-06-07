import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import "./index.css";
function SingleCard({ category, imageLink, title, description, po, amount, progress, daysLeft }) {
  const formattedAmount = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
    amount
  )
  return (
    <Card sx={{ width: 360, height: 520, borderRadius: '20px !important' }}>
      <CardMedia
        sx={{ height: 198, width: 400 }}
        image={imageLink}
        title="Kurumi"
      />
      <CardContent sx={{ mx: '4px' }}>
        <Typography gutterBottom color="text.secondary" component="div"
          sx={{ textAlign: "left", fontSize: '12px', marginBottom: { md: '10px !important' }, color: '#FBB03B', fontWeight: 600 }}>
          {category}
        </Typography>
        <Typography variant="h5" component="div" sx={{ textAlign: "left", marginBottom: { md: '24px !important' } }}>
          {title}
        </Typography>
        <Typography variant="h6" component="div" sx={{ textAlign: "left", marginBottom: { md: '48px !important' } }}>
          {description}
        </Typography>
        <Typography variant="h5" component="div" sx={{ textAlign: "left", fontSize: '12px' }}>
          <span className="text-[#FBB03B] mr-1">bởi</span>{po}
        </Typography>
        <Typography variant="h5" component="div" sx={{ textAlign: "left", fontSize: '12px' }}>
          {formattedAmount}<span className="ml-1">đ đã được ủng hộ</span>
        </Typography>
        <LinearProgress className='progressBar' variant="determinate" value={progress} />
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', mx: '4px' }}>
        <Typography variant='div' size="small" sx={{ flexDirection: 'column', margin: '0 10px' }}>
          <Typography variant='h1' sx={{ color: '#44494D', fontSize: '18px' }}>{daysLeft}</Typography>
          <Typography variant='h2' sx={{ fontSize: '12px', color: '#FCAE3D' }}>Ngày còn lại</Typography>
        </Typography>
        <Typography variant='div' size="small" sx={{ flexDirection: 'column', margin: '0 10px' }}>
          <Typography variant='h1' sx={{ color: '#44494D', fontSize: '18px' }}>100</Typography>
          <Typography variant='h2' sx={{ fontSize: '12px', color: '#FCAE3D' }}>Người ủng hộ</Typography>
        </Typography>
        <Typography variant='div' size="small" sx={{ flexDirection: 'column', margin: '0 10px' }}>
          <Typography variant='h1' sx={{ color: '#44494D', fontSize: '18px' }}>{progress}%</Typography>
          <Typography variant='h2' sx={{ fontSize: '12px', color: '#FCAE3D' }}>Thành công</Typography>
        </Typography>
      </CardActions>
    </Card>
  );
}

export default SingleCard