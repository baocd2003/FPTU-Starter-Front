import ReactPlayer from "react-player";
import { Carousel } from "react-responsive-carousel";
import './index.css';
function ProjectImages({ thumbNail, images, liveDemo }) {

  if (!images || images.length === 0) {
    return null;
  }
  console.log(liveDemo)
  // const [firstImg, ...remainingImgs] = images;

  return (
    <div>
      <Carousel showArrows={false} showIndicators={false} interval={3000} transitionTime={500} showStatus={false}>
        <div className="h-[500px] liveContain">
          <ReactPlayer url={liveDemo} playing controls className='live-video' />
          <img className="carousel-image w-full liveThumb hidden" src={thumbNail} />
        </div>
        {images.map((item, index) => (
          <div className="h-[500px]" key={index}>
            <img className="carousel-image" src={item} alt={`carousel-item-${index}`} />
          </div>
        ))}
      </Carousel>
    </div>

  )
}

export default ProjectImages;