import React, {Component} from 'react';
import './App.css';
import NotePad from './components/NotePad'
import NoteFormController from './components/NoteFormController'
// newly changed
import {Link, Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="ui container">
       <div className="ui three item menu">
        <Link className="item" to="/">Home</Link>
        <Link className="item" to="/note">NotePad</Link>
        <Link className="item" to="/note/add">Add New Note</Link>
       </div>
        <Route exact path="/note" component={NotePad}/>
        <Route path="/notes/add" component={NoteFormController}/>
        <Route path="/note/:_id" component={NoteFormController}/>
      </div>
    );
  }
}

export default App;
