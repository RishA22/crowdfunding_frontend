import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './formStyles.css';

import postSignup from "../api/post-signup.js";
import { useAuth } from "../hooks/use-auth.js";

function SignupForm() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        email: "",
    });

    const [errors, setErrors] = useState({});
    const [showTooltip, setShowTooltip] = useState(null);

    // Validation rules
    const validateUsername = (username) => {
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._-]{2,29}$/;
        return usernameRegex.test(username);
    };

    const validatePassword = (password) => {
        return password.length >= 6; // At least 6 characters
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate username and password
        const usernameValid = validateUsername(credentials.username);
        const passwordValid = validatePassword(credentials.password);

        if (!usernameValid || !passwordValid) {
            setErrors({
                username: !usernameValid ? "Invalid username." : null,
                password: !passwordValid ? "Password must be at least 6 characters." : null,
            });
            return;
        }

        setErrors({}); // Clear errors if inputs are valid


        if (credentials.username && credentials.password && credentials.email) {
            postSignup(
                credentials.username,
                credentials.password,
                credentials.email

            ).then((response) => {
                window.localStorage.setItem("token", response.token);
                setAuth({
                    token: response.token,
                });
                navigate("/");

            });
        }
    };
    return (
        <form className="signup-form">
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    onChange={handleChange}
                />
                {errors.username && (
                    <div className="error-message">
                        <p>{errors.username}</p>
                        <div
                            className="tooltip-icon"
                            onMouseEnter={() => setShowTooltip("username")}
                            onMouseLeave={() => setShowTooltip(null)}
                        >
                            ?
                            {showTooltip === "username" && (
                                <div
                                    className="tooltip-text"
                                >
                                    <p>
                                        Starts with a letter<br />
                                        Can include letters, numbers, underscores (`_`), periods (`.`), or hyphens (`-`)<br />
                                        Length: 3–30 characters
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                {errors.password && (
                    <div className="error-message">
                        <p>{errors.password}</p>
                        <div
                            className="tooltip-icon"
                            onMouseEnter={() => setShowTooltip("password")}
                            onMouseLeave={() => setShowTooltip(null)}
                        >
                            ?
                            {showTooltip === "password" && (
                                <div
                                    className="tooltip-text"
                                >
                                    <p>Password must be at least 6 characters long.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Signup
            </button>
        </form >
    );
}

export default SignupForm;