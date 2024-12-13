import { Link } from "react-router-dom";
// import "./ProjectCard.css";
import "./project-card.css";

function ProjectCard(props) {
    const { projectData } = props;
    const projectLink = `project/${projectData.id}`;
    // extracts projectData from props, making it easier to use projectData inside the ProjectCard

    return (
        <div className="project-card">
            <img src={projectData.image} alt={projectData.project_name} />
            <h1>{projectData.project_name}</h1>
            {/* <h3>{projectData.description}</h3> */}
            <Link to={projectLink}>
                <button type="button">Learn More</button>
            </Link>

        </div >
    );
}

export default ProjectCard;