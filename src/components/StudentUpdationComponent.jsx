import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

//This component is used for updating the student details
const StudentUpdationComponent = (props) => {

    const [formData, setFormData] = useState({
        studentName: '',
        studentEmail: '',
        studentPhone: ''
    });

    const params = useParams();

    const fetchStudentDetails = async () => {
        try {
            const fetchStudentAPI = await axios.get(`http://localhost:3000/students/${params.studentId}`);
            const fetchStudentDetails = await fetchStudentAPI.data;
            console.log(fetchStudentDetails);
            setFormData({
                studentName: fetchStudentDetails.name,
                studentEmail: fetchStudentDetails.email,
                studentPhone: fetchStudentDetails.phone
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {   
        console.log('Get Student Details for ID:'+params.studentId);
        fetchStudentDetails();
    }
    , []);

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
        console.log('Updation Form Clicked');
        console.log(formData);
        const data = {
            id: params.studentId,
            name: formData.studentName,
            email: formData.studentEmail,
            phone: formData.studentPhone
        }
        try {
            const response = await axios.put(`http://localhost:3000/students/${params.studentId}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            const apiData = await response.data;
            console.log(apiData);
            if(response.status === 200){
                alert('Student Updated Successfully');
                window.location.href='/';
            }
        }
        catch (error) {
            console.log(error);
        }   
    }

    return (
        <>
            <p>Student Updation Form</p>
            <form onSubmit={studentFormSubmitClickHandler}>
                <div className="form-row">
                    <label>Name</label>
                    <input type="text" name="studentName" id="student-name" value={formData.studentName} onChange={handleFormChange}/>
                </div>
                <div className="form-row">
                    <label>Email</label>
                    <input type="text" name="studentEmail" id="student-email" value={formData.studentEmail} onChange={handleFormChange}/>
                </div>
                <div className="form-row">
                    <label>Phone</label>
                    <input type="text" name="studentPhone" id="student-phone" value={formData.studentPhone} onChange={handleFormChange}/>
                </div>
                <div className="form-submit">
                    <button type="submit">Update Student</button>
                </div>
            </form>
        </>
    );

};

export default StudentUpdationComponent;