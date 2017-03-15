import React from 'react';
import NoteItem from './NoteItem';


class NoteList extends React.Component {

    noteList = () =>(      
        <div classNameName="bootcards-list">
            <div className="panel panel-default">
                <div className="panel-body">
                    <form>
                        <div className="row">
                            <div className="col-xs-9">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Search Title..."/>
                                </div>
                            </div>
                            <div className="col-xs-3">
                                <a className="btn btn-primary btn-block" href="#">
                                <i className="fa fa-plus"></i>
                                Add
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                {console.log(this.props.notes.length)}
                 { this.props.notes.map(note => <NoteItem note={this.props.note} key={this.props.note._id} />) }
                 </div>
            </div>
        </div>
    );

    emptyNoteList = () => (<p>there is no notes in the database</p>);
    
    render() {
        return (
            <div>
                {this.props.notes.length === 0 ? this.emptyNoteList() : this.noteList()}
            </div>
        );
    }}

NoteList.propTypes = {
    notes: React.PropTypes.array.isRequired,
    deleteNote: React.PropTypes.func.isRequired
}

export default NoteList;
