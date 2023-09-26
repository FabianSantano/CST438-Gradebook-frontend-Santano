import './App.css';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import ListAssignment from './components/ListAssignment';
import EditAssignment from './components/EditAssignment';
import GradeAssignment from './components/GradeAssignment';
import AddAssignment from './components/AddAssignment';
//import deleteAssignment from './components/deleteAssignment';


function App() {
  return (
    <div className="App">
      <h2>Gradebook</h2>
      <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={ListAssignment} />
              <Route path="/gradeAssignment" component={GradeAssignment} />
              <Route path="/updateAssignment" component={EditAssignment} />
              <Route path="/createAssignment" component={AddAssignment} />
              <Route path="/deleteAssignment" component={ListAssignment} />
              <Route render={ () => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
