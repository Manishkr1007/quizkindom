import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { quizData } from "./quizData"; // Import the quiz data
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function QuizPage() {
  const { subject } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question

  // Get questions for the selected subject
  const questions = quizData[subject] || [];

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion(); // Automatically go to next question when timer reaches zero
    }
  }, [timeLeft, showResult]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Increment score if answer was selected
    if (selectedAnswer) {
      if (selectedAnswer === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
    } else {
      // If no answer is selected, consider it as incorrect
      console.log("No answer selected for question, marking as incorrect.");
    }

    // Reset the state for the next question
    setSelectedAnswer("");
    setTimeLeft(30); // Reset timer for next question

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      // Call to save results when quiz is completed
      saveResultToBackend(score);
    }
  };

  const saveResultToBackend = (finalScore) => {
    const resultData = {
      subject: subject,
      score: finalScore,
      totalQuestions: questions.length,
    };

    axios.post("https://quizkindomserver.vercel.app/api/results", resultData)
      .then((response) => {
        console.log("Result saved to backend:", response.data);
      })
      .catch((error) => {
        console.error("Error saving result to backend:", error);
      });
  };

  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 70) {
      return {
        message: "Congratulations, You Passed!",
        color: "text-green-500",
        bgColor: "bg-green-100",
      };
    } else {
      return {
        message: "Sorry, You Failed.",
        color: "text-red-500",
        bgColor: "bg-red-100",
      };
    }
  };

  if (!questions.length) {
    return <div>No quiz available for this subject.</div>;
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
              Percentage: <span className="font-semibold">{(score / questions.length) * 100}%</span>
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
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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
