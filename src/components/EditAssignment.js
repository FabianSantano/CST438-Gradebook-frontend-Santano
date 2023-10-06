import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../constants';

function EditAssignment(props) { 

  const [assignment, setAssignments] = useState({});
  let assignmentId=0;
  const [message, setMessage] = useState('');
  
  const path = window.location.pathname;  // /gradebook/123
  const s = /\d+$/.exec(path)[0];
  console.log("Grade assignmentId="+s);
  assignmentId=s;

  useEffect(() => {
    fetchAssignment()
   }, [] )

 
  const fetchAssignment = ( ) => {
      setMessage('');
    
      fetch(`${SERVER_URL}/assignment/${assignmentId}`)
      .then((response) => response.json()) 
      .then((data) => { setAssignments(data) })        
      .catch(err => { 
        setMessage("Exception. "+err);
        console.error("fetch grades error "+ err);
      });
    };
    
  
    const saveGrades = ( ) => {
      setMessage(''); 
      console.log("Gradebook.save ");     
      fetch(`${SERVER_URL}/assignment/${assignmentId}` , 
          {  
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json', }, 
            body: JSON.stringify( assignment )
          } )
      .then(res => {
          if (res.ok) {
            fetchAssignment();
            setMessage("Assignment saved.");
          } else {
            setMessage("Save error. "+res.status);
            console.error('Save grades error =' + res.status);
      }})
        .catch(err => {
            setMessage("Exception. "+err);
            console.error('Save grades exception =' + err);
        });
   }   ;

   const onChangeInput = (e) => {
    setMessage('');
    const { name, value } = e.target;
  
    // Create a copy of the assignment object
    const updatedAssignment = { ...assignment };
  
    // Update the corresponding property based on the input name
    updatedAssignment[name] = value;
  
    // Update the state with the modified assignment object
    setAssignments(updatedAssignment);
  }
  

 
    const headers = ['Name', 'DueDate']
    return (
      <div>
        <h3>Assignment to update</h3>
        <div margin="auto">
          <h4 id="gmessage">{message}&nbsp;</h4>
          <table className="Center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    name="assignmentName"
                    value={assignment.assignmentName || ""}
                    type="text"
                    onChange={(e) => onChangeInput(e, 0)}
                  />
                </td>
                <td>
                  <input
                    name="dueDate"
                    value={assignment.dueDate || ""}
                    type="date"
                    onChange={(e) => onChangeInput(e, 0)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button id="sgrade" type="button" margin="auto" onClick={saveGrades}>
            Save Assignment
          </button>
        </div>
      </div>
    )
    
}

export default EditAssignment;