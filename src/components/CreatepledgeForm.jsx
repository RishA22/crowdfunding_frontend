import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import postCreatepledge from "../api/post-createpledge.js";
import { useAuth } from "../hooks/use-auth.js";

function CreatepledgeForm() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const { id } = useParams();
    const [credentials, setCredentials] = useState({
        amount: "",
        comment: "",
        anonymous: false,
    });

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.amount && credentials.comment) {
            postCreatepledge(
                credentials.amount,
                credentials.comment,
                credentials.anonymous,
                id,
                auth.token
            )
                .then(() => {
                    navigate("/");
                })

        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    type="text"
                    id="amount"
                    placeholder="Enter amount forpledge"
                    onChange={handleChange}
                    value={credentials.amount}
                />
            </div>
            <div>
                <label htmlFor="comment">Comment:</label>
                <input
                    type="text"
                    id="comment"
                    placeholder="comment"
                    onChange={handleChange}
                    value={credentials.comment}
                />
            </div>
            <div className="empty-div"></div>

            <div>
                <label htmlFor="anonymous">
                    <input
                        type="checkbox"
                        id="anonymous"
                        onChange={handleChange}
                        checked={credentials.anonymous}
                    />
                    Pledge Anonymously
                </label>
            </div>
            <div className="empty-div"></div>

            <button type="submit">
                Create
            </button>
        </form>
    );
}

export default CreatepledgeForm;