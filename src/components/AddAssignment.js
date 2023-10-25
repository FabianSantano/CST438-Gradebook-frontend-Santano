import React, { useState ,useEffect} from 'react';
import {SERVER_URL} from '../constants';
//import {Link} from 'react-router-dom';


function AddAssignment(props) { 
  const [assignment, setAssignments] = useState({
   
    courseId: '',
    dueDate: '',
    assignmentName: ''
  });
  const [message, setMessage] = useState('');
  const token = sessionStorage.getItem("jwt");
  //const path = window.location.pathname;  // /gradebook/123
 
 
  useEffect(() => {
    // called once after intial render
    fetchAssignments();
   }, [] )
   const fetchAssignments = () => {
    console.log("fetchAssignments");
    fetch(`${SERVER_URL}/assignment`,
    {
      headers: { "Authorization": token }
    })
    .then((response) => response.json() ) 
    .then((data) => { 
      console.log("assignment length "+data.length);
      setAssignments(data);
     }) 
    .catch(err => console.error(err)); 
  }
  const onChangeInput = (e) => {
    setMessage('');
    const { name, value } = e.target;
    const updatedAssignment = { ...assignment };
    // Update the corresponding property based on the input name
    if (name === 'course') {
      // Parse the value as an integer
      updatedAssignment[name] = parseInt(value, 10) || ''; // Use parseInt to convert to an integer
    } else {
      updatedAssignment[name] = value;
    }
    setAssignments(updatedAssignment);
  };
 
  const saveGrades = () => {
    setMessage('');

    const newAssignment = { ...assignment };
    if (newAssignment.course !== '') {
      newAssignment.course = parseInt(newAssignment.course, 10);
    }
  
    fetch(`${SERVER_URL}/assignment`, {
      method: 'POST',
      headers: { "Authorization": token , 'Content-Type': 'application/json' },
      body: JSON.stringify(newAssignment),
    })
      .then((res) => {
        if (res.ok) {
          setMessage('Assignment saved.');
        } else {
          setMessage('Save error. ' + res.status);
          console.error('Save assignment error: ' + res.status);
        }
      })
      .catch((err) => {
        setMessage('Exception. ' + err);
        console.error('Save assignment exception: ' + err);
      });
  };
  

  
  
  
  
  return (
      <div>
       <h3>Create Assignment</h3>
        <div margin="auto">
          <h4 id= "gmessage">{message}&nbsp;</h4>
          <table className="Center">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Due Date</th>
                <th>Assignment Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td>
                  <input
                    name="courseId"
                    value={assignment.courseId || ""}
                    type="number"
                    onChange={(e) => onChangeInput(e)}
                  />
                </td>
                <td>
                  <input
                    name="dueDate"
                    value={assignment.dueDate || ""}
                    type="date"
                    onChange={(e) => onChangeInput(e)}
                  />
                </td>
                <td >
                  <input
                    name="assignmentName"
                    value={assignment.assignmentName || ""}
                    type="text"
                    onChange={(e) => onChangeInput(e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button id="sgrade" type="button" margin="auto" onClick={saveGrades}>Save Assignment </button>
        </div>
      </div>
  ); 
}

export default AddAssignment;