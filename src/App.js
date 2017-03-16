import React, {Component} from 'react';
import './App.css';
import NotePad from './components/NotePad';
import NoteDetail from './components/NoteDetail';

import NoteFormController from './components/NoteFormController';
import { Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={NotePad}/>
        <Route path="/notes/add" component={NoteFormController}/>
        <Route path="/note/:_id" component={NoteFormController}/>
        <Route path="/note/detail/:_id" component={NoteDetail}/>
      </div>
    );
  }
}

export default App;
