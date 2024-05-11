import FSUAppBar from "../../components/AppBar";
import Footer from "../../components/Footer";
import ProjectCard from "../../components/ProjectCard";
import './index.css';
function HomePage() {
	return (
		<div className="home">
			<FSUAppBar isLogined={true} />
      <BannerCarousel/>
			<div className="mt-[100px]">
				<ProjectCard />
				<ProjectCard />
				<ProjectCard />
				<ProjectCard />
			</div>
			<Footer />
		</div>
	)
}

export default HomePage;