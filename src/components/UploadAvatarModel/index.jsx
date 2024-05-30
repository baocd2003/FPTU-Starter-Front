import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import setCanvasPreview from '../../setCanvasPreview';
import './index.css';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 240;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { lg: '40%', xs: '90%' },
    height: 'fit-content',
    bgcolor: '#FFFFFF',
    boxShadow: 24,
    borderRadius: '10px',
    outline: 'none',
    p: '3rem',
};

function UploadAvatarModel(props) {
    const fileInputRef = useRef(null);

    const previewCanvasRef = useRef(null);
    const imgRef = useRef(null);

    const [avtSrc, setAvtSrc] = useState(props.userAvatarUrl);
    const [imgSrc, setImgSrc] = useState(null);
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        setAvtSrc(props.userAvatarUrl);
    });

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
                if (error) setError("");
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setError("Ảnh phải có kích cỡ tối thiểu là 240 x 240.");
                    return setImgSrc(null);
                }
            });
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    const handleSaveClick = () => {
        if (imgRef.current && previewCanvasRef.current && crop) {
            const pixelCrop = convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height);
            setCanvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                pixelCrop
            );
            const dataUrl = previewCanvasRef.current.toDataURL();
            props.updateAvatar(dataUrl);
            setImgSrc(null);
            props.handleCloseAvt();
        }
    };

    const onCloseAvt = () => {
        setImgSrc(null);
        props.handleCloseAvt();
    }

    return (
        <div>
            <Modal
                open={props.open}
                onClose={onCloseAvt}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        onClick={onCloseAvt}
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
                    <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center', fontSize: '16px' }}>
                        Tải ảnh lên từ thiết bị của bạn
                    </Typography>
                    <div className='flex justify-center mt-8'>
                        {imgSrc ? (
                            <ReactCrop
                                crop={crop}
                                circularCrop
                                keepSelection
                                aspect={ASPECT_RATIO}
                                onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                                minWidth={MIN_DIMENSION}
                                height={MIN_DIMENSION}
                                style={{
                                    borderRadius: '10px !important'
                                }}
                            >
                                <img
                                    ref={imgRef}
                                    src={imgSrc}
                                    alt='Upload'
                                    style={{ borderRadius: '10px !important' }}
                                    onLoad={onImageLoad}
                                />
                            </ReactCrop>
                        ) : (
                            <Avatar
                                alt="User"
                                src={avtSrc || ''}
                                sx={{ width: '240px', height: '240px' }}
                            />
                        )}
                    </div>
                    {error && <p className="text-red-600 text-[16px] text-center mt-8 font-semibold">{error}</p>}
                    <div className='flex justify-center mt-8 gap-6 modelBtn'>
                        <div className='addImg'>
                            <Button
                                variant="contained"
                                startIcon={<CameraAltIcon />}
                                onClick={handleButtonClick}
                                sx={{
                                    color: "#44494D",
                                    backgroundColor: 'white',
                                    fontWeight: 'bold',
                                    textTransform: 'none !important',
                                    '&:hover': {
                                        backgroundColor: '#FBB03B',
                                        color: 'white',
                                    },
                                    '&:active': {
                                        outline: 'none !important'
                                    },
                                    '&:focus': {
                                        outline: 'none !important'
                                    },
                                }}
                            >
                                Thêm ảnh
                            </Button>
                            <input type="file" ref={fileInputRef} onChange={onSelectFile} style={{ display: 'none' }} />
                        </div>
                        <Button
                            variant="contained"
                            disabled={imgSrc == null}
                            startIcon={<EditIcon />}
                            onClick={handleSaveClick}
                            sx={{
                                color: "#44494D",
                                backgroundColor: 'white',
                                fontWeight: 'bold',
                                textTransform: 'none !important',
                                '&:hover': {
                                    backgroundColor: '#FBB03B',
                                    color: 'white',
                                },
                                '&:active': {
                                    outline: 'none !important'
                                },
                                '&:focus': {
                                    outline: 'none !important'
                                },
                            }}
                        >
                            Lưu thay đổi
                        </Button>
                        {crop && (
                            <canvas
                                ref={previewCanvasRef}
                                className="mt-4"
                                style={{
                                    border: "1px solid black",
                                    display: 'none',
                                    objectFit: "contain",
                                    width: 150,
                                    height: 150,
                                }}
                            />
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default UploadAvatarModel;
