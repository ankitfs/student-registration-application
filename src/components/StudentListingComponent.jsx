import axios from 'axios';
import React, { useState, useEffect } from 'react';

//This component used for listing the student with details
const StudentListingComponent = (props) => {

    const [studentList, setStudentList] = useState([]);

    const isObjectEmpty = (obj) => {

        for(let prop in obj) {
            console.log('>>>>'+prop);
            
            if(obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    }

    console.log(isObjectEmpty(props.studentAdded));

    if(isObjectEmpty(props.studentAdded) === false){
        console.log('Student Added');
        setStudentList([...studentList, props.studentAdded]);

    }
        

//    console.log('>>>>'+JSON.stringify(props.studentAdded).length);
//    console.log('>>>>'+JSON.stringify(props.studentAdded) === '{}');
    

    // const updateStudentListHandler = (student) => {
    //     setStudentList([...studentList, student]);
    // }

    const fetchStudentList = async () => {
        console.log('Fetching Student List');   
        try {
            const fetchStudentAPI = await axios.get('http://localhost:3000/students');
            const fetchStudentDetails = await fetchStudentAPI.data;
            console.log(fetchStudentDetails);
            setStudentList(fetchStudentDetails.map((student) => {
                return {
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

    const updateStudentHandler = ( ) => {
        console.log('Update Student Handler');
    }

    const deleteStudentHandler = ( ) => {
        console.log('Delete Student Handler');
        
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
                                    <td><button type="button" onClick={updateStudentHandler}>Edit</button></td>
                                    <td><button type="button" onClick={deleteStudentHandler}>Delete</button></td>
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