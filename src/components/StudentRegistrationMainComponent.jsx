import React from "react";
import StudentRegistrationForm from "./StudentRegistrationForm";
import StudentListingComponent from "./StudentListingComponent";

const StudentRegistrationMainComponent = () => { 
   
    return (

       <div>
            <StudentRegistrationForm/>
            <StudentListingComponent/>
       </div>
    );
}

export default StudentRegistrationMainComponent;