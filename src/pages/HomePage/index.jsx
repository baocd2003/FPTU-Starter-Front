import FSUAppBar from "../../components/AppBar"
import ProjectCard from "../../components/ProjectCard"

function HomePage() {
  return (
	<>
	<FSUAppBar isLogined={true}/>
	<div className="mt-10">
		<ProjectCard/>
	</div>
  </>
  )
}

export default HomePage