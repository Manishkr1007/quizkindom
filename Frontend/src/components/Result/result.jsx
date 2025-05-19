import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  const baseurl = import.meta.env.VITE_DEV_URL;


    // Get user ID from localStorage
    const user = JSON.parse(localStorage.getItem("Users"));
    const userId = user?._id;

    useEffect(() => {
        if (!userId) {
            navigate("/login"); // Redirect to login if user is not found
            return;
        }

        const fetchResults = async () => {
            try {
                const response = await axios.get(
                    `${baseurl}/results/${userId}`
                );
                setResults(response.data.results);
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch results");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [userId, navigate]);

    if (loading) return <p style={styles.loading}>Loading results...</p>;
    if (error) return <p style={styles.error}>{error}</p>;
    if (results.length === 0) return <p style={styles.noResults}>No results found</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Your Results</h2>
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Subject</th>
                            <th style={styles.th}>Score</th>
                            <th style={styles.th}>Total Marks</th>
                            <th style={styles.th}>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result) => (
                            <tr key={result._id}>
                                <td style={styles.td}>{result.subject}</td>
                                <td style={styles.td}>{result.score}</td>
                                <td style={styles.td}>{result.totalMarks}</td>
                                <td style={styles.td}>{result.percentage}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        marginBottom: "20px",
        color: "#333",
    },
    tableWrapper: {
        overflowX: "auto",
    },
    table: {
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        borderCollapse: "collapse",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    th: {
        background: "#007bff",
        color: "white",
        padding: "10px",
        border: "1px solid #ddd",
    },
    td: {
        padding: "10px",
        border: "1px solid #ddd",
        textAlign: "center",
    },
    loading: {
        textAlign: "center",
        fontSize: "18px",
        color: "#555",
    },
    error: {
        textAlign: "center",
        color: "red",
        fontSize: "16px",
    },
    noResults: {
        textAlign: "center",
        color: "#666",
        fontSize: "16px",
    },
};

export default ResultPage;
