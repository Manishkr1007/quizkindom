import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import QuizPage from "./quiz/Quiz";
import CheckoutPage from "./checkOut/checkoutpage";
import Contact from "./contacts/contact";
import About from "./about/about";
import ComingSoon from "./coming_soon/comingsoon";
import Profile from "./components/Profile/profile";
function App() {
  const [authUser, setAuthUser] = useAuth();
 
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/quiz/:subject" element={<QuizPage />} />
          <Route path="/checkout/:id" element={<CheckoutPage />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/coming-soon/:id" element={<ComingSoon />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
