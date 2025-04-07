import axios from 'axios';
import React, { useState, useEffect } from 'react';

//This component used for listing the student with details
const StudentListingComponent = (props) => {

    const [studentList, setStudentList] = useState([]);

    const fetchStudentList = async () => {
        console.log('Fetching Student List');   
        try {
            const fetchStudentAPI = await axios.get('http://localhost:3000/students/all');
            const fetchStudentDetails = await fetchStudentAPI.data;
            console.log(fetchStudentDetails);
            setStudentList(fetchStudentDetails.map((student) => {
                return {
                    studentId: student.id,
                    studentName: student.name,
                    studentEmail: student.email,
                    studentPhone: student.phone
                };
            }
            ));                                 
                
        } catch (error) {
            console.log(error);
        }

    }

    const updateStudentHandler = ({studentId,studentName}) => {
        console.log('Update Student Handler'+studentId);
        window.location.href=`/student/${studentId}`;
    }

    const deleteStudentAPI = async (studentId, studentName) => {
        console.log('Delete Student API'+studentId);
        try {
            const deleteStudentAPI = await axios.delete(`http://localhost:3000/students/${studentId}`);
            if(deleteStudentAPI != null && deleteStudentAPI.status == 204) {
                alert(`Student ${studentName} deleted successfully`);
                fetchStudentList();
            }
            else {
                alert(`Student ${studentName} deletion failed. Kindly Try after sometime`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteStudentHandler = ({studentId, studentName}) => {
        console.log(`Delete Student Handler>>>+`+studentId);
        const deleteConfirm = confirm(`Are you sure you want to delete ${studentName} ?`);
        if(deleteConfirm) {
            console.log('Proceed to Delete the Student Record');
            deleteStudentAPI(studentId,studentName);
        }
    }

    useEffect(() => {
        console.log('Student Listing Component Mounted');
        fetchStudentList();
    }
    ,[]);

    return (
        <div>
            <p>List of Students with Details</p>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        studentList.map((student, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{student.studentName}</td>
                                    <td>{student.studentEmail}</td>
                                    <td>{student.studentPhone}</td>
                                    <td><button type="button" onClick={() => {updateStudentHandler(student)}}>Edit</button></td>
                                    <td><button type="button" onClick={() => 
                                        {deleteStudentHandler(student)}}
                                        >Delete</button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default StudentListingComponent;
