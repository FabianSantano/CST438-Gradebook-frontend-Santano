import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';


function ListAssignment(props) {

  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
   // called once after intial render
   fetchAssignments();
  }, [] )
 
  const fetchAssignments = () => {
    console.log("fetchAssignments");
    fetch(`${SERVER_URL}/assignment`)
    .then((response) => response.json() ) 
    .then((data) => { 
      console.log("assignment length "+data.length);
      setAssignments(data);
     }) 
    .catch(err => console.error(err)); 
  }
  
  
    const headers = ['Assignment Name', 'Course Title', 'Due Date', ' ', ' ', ' '];
    const deleteAssignment = (assignmentId) => {
      setMessage('');
    
      fetch(`${SERVER_URL}/assignment/${assignmentId}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            setMessage('Assignment deleted.');
            fetchAssignments();
          } else {
            //setMessage();
            res.json().then((data) =>{
              if(window.confirm('Delete error.Assignment has grades , delete anyways?' )){
                fetch(`${SERVER_URL}/assignment/${assignmentId}?force=yes`, {
                  method: 'DELETE',
                })
                  .then((res) => {
                    if (res.ok) {
                      setMessage('Assignment deleted.');
                      fetchAssignments();
                    } else {}
              })
                    .catch((err) => {
                      setMessage('Exception. ' + err);
                      console.error('Delete assignment exception: ' + err);
                    });
              }
            });
            
          }
        })
        .catch((err) => {
          setMessage('Exception. ' + err);
          console.error('Delete assignment exception: ' + err);
        });
    };
    
    return (
      <div>
        <h3>Assignments</h3>
        <div margin="auto" >
          <h4 id = "message">{message}&nbsp;</h4>
              <table className="Center"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.assignmentName}</td>
                      <td>{row.courseTitle}</td>
                      <td>{row.dueDate}</td>
                      <td>
                        <Link to={`/gradeAssignment/${assignments[idx].id}`} >Grade</Link>
                      </td>
                      <td>
                      <Link to={`/updateAssignment/${assignments[idx].id}`} >Edit</Link>
                      </td>
                      <td>
                      <button id ={`dAssignment${assignments[idx].id}`} type="button" margin="auto" onClick={() => deleteAssignment(assignments[idx].id)}>Delete</button>
                      
                       {/* <Link to={`/deleteAssignment/${assignments[idx].id}`} >Delete</Link> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link to={`/createAssignment`} >Create New Assignment</Link>
          </div>
      </div>
    )
}  

export default ListAssignment;