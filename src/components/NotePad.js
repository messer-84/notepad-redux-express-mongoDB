import React, { Component } from 'react';
import { connect } from 'react-redux';
import NoteList from './NoteList';
// import NoteDetail from './NoteDetail';
import { fetchAllNotes, deleteNote, fetchNotesUser } from '../actions/actions';

const data = {
  limit: 0,
  start: 0,
  order: 'asc'
}

class NotePad extends Component {
  /*  
  constructor()
  componentWillMount()
  render()
  componentDidMount()
  */
  componentDidMount(){
    this.props.fetchAllNotes(data);
  }

  render() {
      return (
        <div className="container">
        <h1 className="notepad-title">NotePad (React Redux NodeJS MongoDB)</h1>
          <div className="row content">      
              <NoteList notes={this.props.notes} deleteNote={this.props.deleteNote} fetchAllNotes={this.props.fetchAllNotes}/>
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
