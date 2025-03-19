import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    // Sample user data (Replace with actual user data)
    const user = {
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: "https://via.placeholder.com/150",
        id: "12345", // Replace with actual user ID
    };

    const handleViewResults = () => {
        navigate(`/results`); // Navigate to Results Page
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <img src={user.avatar} alt="User Avatar" style={styles.avatar} />
                <h2>{user.name}</h2>
                <p style={styles.email}>{user.email}</p>
                <button
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
                    onMouseOut={(e) => (e.target.style.background = styles.button.background)}
                    onClick={handleViewResults}
                >
                    View Results
                </button>
            </div>
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f4f9",
    },
    card: {
        textAlign: "center",
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "350px",
    },
    avatar: {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        border: "3px solid #007bff",
        marginBottom: "15px",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
    },
    email: {
        color: "#666",
        fontSize: "14px",
        marginBottom: "15px",
    },
    button: {
        background: "#007bff",
        color: "white",
        border: "none",
        padding: "10px 12px",
        fontSize: "16px",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "0.3s",
        width: "100%",
    },
    buttonHover: {
        background: "#0056b3",
    },
};

export default Profile;
