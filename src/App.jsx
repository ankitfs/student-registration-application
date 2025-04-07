import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentRegistrationMainComponent from "./components/StudentRegistrationMainComponent"
import StudentRegistrationForm from "./components/StudentRegistrationForm";
import StudentUpdationComponent from "./components/StudentUpdationComponent";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<StudentRegistrationMainComponent />} />
        <Route path="/addstudent" element={<StudentRegistrationForm />} />
        <Route path="/student/:studentId" element={<StudentUpdationComponent />} />
      </Routes>
    </>
  )
}

export default App
