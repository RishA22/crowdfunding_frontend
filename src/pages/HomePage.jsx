import useProjects from "../hooks/use-projects";
import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import FeedbackForm from "../components/FeedbackForm"; // Import the feedback form component
import "./HomePage.css";
import hero_image from "../assets/hero_image.png";

function HomePage() {
    const { projects } = useProjects();
    // console.log(projects)
    const [showProjects, setShowProjects] = useState(false); // State to toggle projects visibility

    const handleShowProjects = () => {
        setShowProjects(!showProjects); // Toggle the visibility of projects
    };
    return (
        <div>

            {/* Hero Section */}
            <section id="hero">
                <img
                    src={hero_image}
                    alt="Hero Section"
                    className="hero-image"
                />
                <h1>
                    Welcome to <span> <div id="animated-word">
                        <span className="letter">U</span>
                        <span className="letter">p</span>
                        <span className="letter">l</span>
                        <span className="letter">i</span>
                        <span className="letter">f</span>
                        <span className="letter">t</span>
                    </div></span>
                </h1>

                <p>Your one-stop platform to explore and fund innovative projects!</p>
                <button onClick={handleShowProjects} className="show-projects-btn">
                    {showProjects ? "Hide Projects" : "Show Projects"} {/* Conditionally set button text */}
                </button>
            </section>

            {/* Project List */}
            {showProjects && (
                <div id="project-list">
                    {projects.map((projectData, key) => (
                        <ProjectCard key={key} projectData={projectData} />
                    ))}
                </div>
            )}
            {/* Feedback Form (Always Visible) */}
            <FeedbackForm />

            <footer className="footer">
                <p>&copy; 2024 UpliftU. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;