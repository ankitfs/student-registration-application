import React, { useState } from "react";
import axios from 'axios';

const StudentRegistrationForm = (props) => {

    const[formData, setFormData] = useState({
        studentName: '',
        studentEmail: '',
        studentPhone: ''
    });

    const handleFormChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
        console.log('Form Data->'+JSON.stringify(formData));   
    }
    
    //function to handle form submit event
    const studentFormSubmitClickHandler = async (event) => {
        event.preventDefault();     
        console.log('Registration Form Clicked');
        console.log(formData);
        try {
            const response = await axios.post('http://localhost:3000/student', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            const apiData = await response.data;
            console.log(apiData);
            if(response.status === 201){
                alert('Student Registered Successfully');    
                window.location.href='/';
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div>
            <p>Student Registration Form</p>
            <form onSubmit={studentFormSubmitClickHandler}>
                <div className="form-row">
                    <label>Name</label>
                    <input type="text" name="studentName" id="student-name" onChange={handleFormChange}/>
                </div>
                <div className="form-row">
                    <label>Email</label>
                    <input type="text" name="studentEmail" id="student-email" onChange={handleFormChange}/>
                </div>
                <div className="form-row">
                    <label>Phone</label>
                    <input type="text" name="studentPhone" id="student-phone" onChange={handleFormChange}/>
                </div>
                <div className="form-submit">
                    <input type="submit" value='Register Student'/>
                </div>
            </form>
        </div>
    );
}

export default StudentRegistrationForm;