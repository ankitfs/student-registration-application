import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentRegistrationMainComponent from "./components/StudentRegistrationMainComponent"
import StudentRegistrationForm from "./components/StudentRegistrationForm";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<StudentRegistrationMainComponent />} />
        <Route path="/addstudent" element={<StudentRegistrationForm />} />
      </Routes>
    </>
  )
}

export default App
