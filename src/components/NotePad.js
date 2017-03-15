import React, {Component} from 'react';
import {connect} from 'react-redux';
import NoteList from './NoteList';
import { fetchAllNotes, deleteNote } from '../actions/actions';
import '../App.scss';

class NotePad extends Component {

  /*  
  constructor()
  componentWillMount()
  render()
  componentDidMount()
  */
  componentDidMount(){
    this.props.fetchAllNotes();
  }

  render() {
    return (
      <div className="container">
      <h1>NotePad (React Redux NodeJS MongoDB)</h1>
        <div className="row">  
          <div className="col-md-5">       
            <NoteList notes={this.props.notes} deleteNote={this.props.deleteNote}/>
          </div>
        </div>
      </div>
    );
  }
}

// define the props for notepad, need props for rhis component
// make sure all props and fucntions are required
NotePad.propsTypes = {
  notes: React.PropTypes.array.isRequired,
  fetchNotes: React.PropTypes.func.isRequired,
  deleteNote: React.PropTypes.func.isRequired
}

// get the current state of notes
function mapStateToProps(state) {
  return {
    notes: state.notes
  }
}
// connect notepad component to redux get the state from the store and pass the
// state to component as props
export default connect(mapStateToProps, { fetchAllNotes, deleteNote })(NotePad);
