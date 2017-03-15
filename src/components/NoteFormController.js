import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNote, fetchOneNote, updateNote } from '../actions/actions';
import { Redirect } from 'react-router-dom';
import NoteForm from './NoteForm';


class NoteFormController extends Component {

    state = {
        redirect: false
    }

    componentDidMount = () => {
        const { match } = this.props;
        if (match.params._id) {
        this.props.fetchOneNote(match.params._id);
    }
  }

    // create a new note, if note already exist then update a note
    createNote = ({_id, title, content})=>{
        if(_id){
            // update note and set loading to true
            return this.props.updateNote({_id, title, content})
                .then(()=>{this.setState({redirect: true})},
                );
        }else{
            return this.props.createNote({title, content})
                .then(()=>{this.setState({redirect: true})},
                ); 
            }  
        }

    render() {
        return (
            <div>
                {this.state.redirect ? <Redirect to='/notePad'/> : 
                <NoteForm note={this.props.note}
                createNote={this.createNote}/>}
            </div>
        );
    }
}

// get the current state of notes
function mapStateToProps(state, props) {
    const { match } = props;
    if (match.params._id) {
    return {
      note: state.notes.find(item => item._id === match.params._id)
    }
  }
  return { note: null };
}

export default connect(mapStateToProps, {createNote, fetchOneNote, updateNote})(NoteFormController);