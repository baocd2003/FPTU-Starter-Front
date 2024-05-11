import FSUAppBar from "../../components/AppBar"
import BannerCarousel from "../../components/BannerCarousel"
import ProjectCard from "../../components/ProjectCard"
import './index.css'
function HomePage() {
  return (
	<>
	<FSUAppBar isLogined={true}/>
	<div className="container">
		<BannerCarousel/>
		<div className="mt-10">
		<ProjectCard/>
		<ProjectCard/>
		<ProjectCard/>

		</div>
	</div>
  </>
  )
}

export default HomePage