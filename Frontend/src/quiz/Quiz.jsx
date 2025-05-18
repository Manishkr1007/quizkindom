import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthProvider";

function QuizPage() {
  const [authUser] = useAuth();
  const { subject } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const baseURL = import.meta.env.VITE_DEV_URL;

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${baseURL}question/question?topic=${subject}`);
        const formattedQuestions = response.data.map((q) => ({
          question: q.question,
          options: Object.values(q.options),
          answer: q.options[q.answer], // Convert 'c' to actual option text
        }));
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [subject]);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, showResult]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer && selectedAnswer === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }
    setSelectedAnswer("");
    setTimeLeft(30);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
      saveResultToBackend(score + (selectedAnswer === questions[currentQuestion].answer ? 1 : 0));
    }
  };

  const saveResultToBackend = (finalScore) => {
    const resultData = {
      name: authUser.fullname,
      subject,
      score: finalScore,
      totalMarks: questions.length,
      percentage: (finalScore / questions.length) * 100,
    };

    axios
      .post(`${baseURL}result/saveResult`, resultData)
      .then((res) => console.log("Result saved:", res.data))
      .catch((err) => console.error("Error saving result:", err));
  };

  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100;
    return percentage >= 70
      ? { message: "Congratulations, You Passed!", color: "text-green-500", bgColor: "bg-green-100" }
      : { message: "Sorry, You Failed.", color: "text-red-500", bgColor: "bg-red-100" };
  };

  if (!questions.length) {
    return <div className="text-center p-10">Loading quiz...</div>;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center dark:bg-slate-900 dark:text-black p-4">
        <Navbar />
        {showResult ? (
          <motion.div
            className={`w-full max-w-2xl p-12 rounded-lg shadow-lg ${getResultMessage().bgColor}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className={`text-4xl font-bold text-center ${getResultMessage().color}`}>
              {getResultMessage().message}
            </h2>
            <p className="mt-4 text-center text-lg">
              Your Score: <span className="font-semibold">{score}</span> / {questions.length}
            </p>
            <p className="mt-4 text-center text-lg">
              Percentage: <span className="font-semibold">{((score / questions.length) * 100).toFixed(2)}%</span>
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="w-full max-w-2xl mx-auto p-10 bg-white shadow-lg rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg">{questions[currentQuestion].question}</p>
              <div className="bg-gray-200 text-gray-900 rounded-full px-4 py-1">
                Time Left: {timeLeft}s
              </div>
            </div>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, idx) => (
                <motion.div key={idx}  whileTap={{ scale: 0.95 }}>
                  <button
                    className={`block w-full px-4 py-3 text-left border rounded ${
                      selectedAnswer === option ? "bg-blue-500 text-white" : "bg-white text-black"
                    }`}
                    onClick={() => handleAnswerSelection(option)}
                  >
                    {option}
                  </button>
                </motion.div>
              ))}
            </div>
            <motion.button
              className="mt-6 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleNextQuestion}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "Submit Quiz"}
            </motion.button>
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default QuizPage;
