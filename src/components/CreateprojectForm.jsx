import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postCreateproject from "../api/post-createproject.js";
import { useAuth } from "../hooks/use-auth.js";

function CreateprojectForm() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const [credentials, setCredentials] = useState({
        project_name: "",
        description: "",
        image: "",
        goal: "",
        is_open: true,
        create_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 10 * 86400000).toISOString()
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.project_name && credentials.description && credentials.image && credentials.goal) {
            postCreateproject(
                credentials.project_name,
                credentials.description,
                credentials.image,
                credentials.goal,
                credentials.is_open,
                credentials.create_date,
                credentials.end_date,
                auth.token
            )
                .then(() => {
                    navigate("/");
                })

        }
    };
    return (
        <form onClick={handleSubmit}>
            <div>
                <label htmlFor="project_name">Project Name:</label>
                <input
                    type="text"
                    id="project_name"
                    placeholder="Enter project name"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    placeholder="description"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="text"
                    id="image"
                    placeholder="image"
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="goal">Goal:</label>
                <input
                    type="text"
                    id="goal"
                    placeholder="goal"
                    onChange={handleChange}
                />
            </div>

            <button type="submit">
                Create
            </button>
        </form>
    );
}

export default CreateprojectForm;