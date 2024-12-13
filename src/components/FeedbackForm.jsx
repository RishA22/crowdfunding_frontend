import { useState } from "react";
import "./FeedbackForm.css"

//props
function FeedbackForm() {
    const [feedback, setFeedback] = useState("");

    const handleSubmit = () => {
        alert("Thank you for your feedback: " + feedback);
        setFeedback(""); // Clear the feedback form after submission
    };

    return (
        <div className="feedback-form">
            <h3>Your Feedback is Crucial!</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Write your feedback here..."
                ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default FeedbackForm;
