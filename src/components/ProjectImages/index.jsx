import ReactPlayer from "react-player";
import { Carousel } from "react-responsive-carousel";
import './index.css';
import { Box } from "@mui/material";
import { Children, useEffect, useRef, useState } from "react";


function ProjectImages({ thumbNail, images, liveDemo }) {
  if (!images || images.length === 0) {
    return null;
  }

  const medias = [
    { type: 'video', src: liveDemo },
    { type: 'image', src: thumbNail },
    ...images.map(image => ({ type: 'image', src: image }))
  ];
  // console.table(medias)

  const customRenderThumb = () => {
    return medias.map((media, index) => (
      media.type === 'video'
        ? (
          <video key={index} height={'5rem !important'} muted>
            <source src={media.src} type="video/mp4" />
          </video>
        )
        : (
          <img key={index} src={media.src} alt={`thumb-${index}`} />
        )
    ));
  };


  return (
    <div>
      <Carousel showArrows={false} showIndicators={false} interval={3000}
        transitionTime={500} showStatus={false} renderThumbs={customRenderThumb}>
        {medias.map((media, index) => (
          <Box key={index}
            sx={{
              height: '30rem', borderRadius: '.2rem', overflow: 'hidden',
            }}
          >
            {media.type === 'video' ? (
              // <ReactPlayer url={media.src} width={'100%'} height={'50rem !important'} playing controls />
              // <canvas ref={canvasRef} className="carousel-canvas" />
              <video
                controls
                autoPlay
                muted
                loop
                playsInline
                width="100%"
                height="auto"
              >
                <source src={media.src} type="video/mp4" />
              </video>
            ) : (
              <img src={media.src} alt={`carousel-item-${index}`} />
            )}
          </Box>
        ))}
      </Carousel>
    </div>

  )
}

export default ProjectImages;