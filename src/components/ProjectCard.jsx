import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard(props) {
    const { projectData } = props;
    const projectLink = `project/${projectData.id}`;
    // extracts projectData from props, making it easier to use projectData inside the ProjectCard

    return (
        <div className="project-card">
            <Link to={projectLink}>
                <img src={projectData.image} />
                <h3>{projectData.project_name}</h3>
            </Link>
        </div>
    );
}

export default ProjectCard;