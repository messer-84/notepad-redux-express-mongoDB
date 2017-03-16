import React, { Component } from 'react';
import { Link } from 'react-router-dom'
 
class NoteDetail extends Component {

    state={
        hide: true
    }

    hideDetail= () => (
        this.setState = ({
            hide: false
        })
    );

    noteDetail =() =>(   
        <div className="note-detail"> 
            <h1>Note Detail ( Fixed location )</h1>         
            <div className="note right">             
                <div className="title">{this.props.note.title}</div>
                <div className="text">
                    <p>{this.props.note.content} </p>
                </div>
                <div className="row">
                <div className="col-md-6">
                <Link to={`/note/${this.props.note._id}`} type="button" className="btn btn-default link">Edit
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i></Link>
                </div>
                <div className="col-md-6">
                <Link to={'/'} onClick={() => {this.props.deleteNote(this.props.note._id); this.props.hideDetail}} type="button" className="btn btn-default link">Delete
                <i className="fa fa-trash" aria-hidden="true"></i></Link>
                </div>
                </div>
	        </div>
        </div>
    );

    render() {
        return (
            <div>
                {!!this.props.note.title && this.noteDetail()}
            </div>
        );
    }
}

NoteDetail.propTypes = {
  note: React.PropTypes.object.isRequired,
  deleteNote: React.PropTypes.func.isRequired
}
export default NoteDetail;