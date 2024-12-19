import { useParams, Link } from "react-router-dom";
import useProject from "../hooks/use-project";
import "./ProjectPage.css";

function ProjectPage() {
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useProject hook.
    const { id } = useParams();
    // useProject returns three pieces of info, so we need to grab them all here
    const { project, isLoading, error } = useProject(id);

    if (isLoading) {
        return (
            <div className="spinner" />
        );
    }

    if (error) {
        return (
            <div className="error-message">
                <p>{error.message}</p>
                <Link to="/">Go Back to Home</Link>
            </div>
        );
    }

    // Format the created_at date to a human-readable format
    const formattedDate = new Date(project.create_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    // Calculate the total sum of pledge amounts and the number of pledges
    const totalAmount = project.pledges.reduce((sum, pledge) => sum + pledge.amount, 0);
    const numberOfPledges = project.pledges.length;


    return (
        <div className="project-page">
            <div className="project-header">
                {/* Picture Section */}
                <div className="project-image">
                    <img src={project.image || "/default-image.jpg"} alt={project.project_name} />
                </div>
                {/* Name */}
                <div className="project-info"><h1>{project.project_name}</h1></div>

                {/* Metadata Section */}
                <div className="project-metadata">
                    <p><strong>Created at:</strong> {formattedDate}</p>
                    <p><strong>Goal:</strong> ${project.goal}</p>
                    <p><strong>Status:</strong> {project.is_open ? "Open to pledges" : "Closed"}</p>
                    <p><strong>Pledges:</strong> ${totalAmount} from {numberOfPledges}</p>

                    <Link to={`/project/${project.id}/createpledge`}>Create Pledge</Link>

                </div>

                {/* Description */}
                <h2>{project.description}</h2>
            </div >
        </div>
    );

}
export default ProjectPage;