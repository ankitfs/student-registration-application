import React from "react";
import StudentRegistrationForm from "./StudentRegistrationForm";
import StudentListingComponent from "./StudentListingComponent";
import { NavLink } from "react-router-dom";

const StudentRegistrationMainComponent = () => { 
   
    return (

       <div>
            {/* <StudentRegistrationForm/> */}
            <p>
                <NavLink to="/addstudent">Add Student</NavLink>
            </p>
            <StudentListingComponent/>
       </div>
    );
}

export default StudentRegistrationMainComponent;