import React from 'react';
import { Link } from 'react-router-dom'
// import NoteItem from './NoteItem';
import NoteDetail from './NoteDetail';



class NoteList extends React.Component {

    state = {
        notes:{},
        note: {},
        popedOut: false,
        limit:'',
        start:'',
        order: '',
    }

    setVisable = (note) => { 
        console.log(note.title);
        this.setState({
            note
        });
    }

     // handle the change of the filed value
    // we pass in event, event's target is the element
    handleChange = (e) => { 
        console.log(e.target.value);
            this.setState({
                [e.target.name]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.limit === ''){
            this.setState({
            limit: 0
            });    
        }
        if(this.state.start ===''){
           this.setState({
            start: 0
            });              
        }
        // when form is valid. then we loading the page for POST
        this.setState({loading: true});
        // call addNote action function
        const { limit, start, order } = this.state;
        this.props.fetchAllNotes({limit, start, order});

            // .catch((err) => err.response.json().then(
            //     // if error , set loading to false
            //     ({error}) => this.setState({ error: error, loading: false })));
  
    };

    noteList = () => ( 
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <a href="/note/add"><button className="add"> <i className="fa fa-plus"></i>Add</button></a>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="col-md-2">
                        <div>         
                            <input type="radio" name="order" onChange={this.handleChange} value="asc"/> ASC
                        </div>
                        <div>
                            <input className="secondRadio" type="radio" name="order" onChange={this.handleChange} value="desc"/> DESC
                        </div>                                   
                    </div>
                    <div className="col-md-2">
                        <label>Limit: </label><input name='limit' type="text" onChange={this.handleChange} className="form-control input-sm search"  placeholder="Limit..." />                                       
                    </div>
                    <div className="col-md-2">
                         <label>Start:</label><input name='start' type="text" onChange={this.handleChange} className="form-control input-sm search" placeholder="Start..." />                                       
                    </div>
                    <div className="col-md-1">
                        <button type="submit" className="start">Search</button>
                    </div>               
                </form>
            </div>
            <div className="row">  
                <div className="col-md-5">
                    <div>
                        <h1 className="list-title">Note List (Click for Detail)</h1>  
                        <ul className="list-group">                                         
                            {this.props.notes.map(note => 
                            <div key={note._id}>
                                <li className="list-group-item" onClick={this.setVisable.bind(this,note)}>
                                    <h4 className="list-header">{note.title}</h4>
                                    <p className="list-date">{note.date}</p>
                                </li>
                            </div>)}                  
                        </ul>
                    </div>
                </div>


                <div className="col-md-6"> 
                    <NoteDetail note={this.state.note} deleteNote={this.props.deleteNote}/>
                </div>
            </div>
        </div>

    );
    
    render() {
        return (
            <div>
                {this.noteList()}
            </div>
        );
    }

}
NoteList.propTypes = {
    notes: React.PropTypes.array.isRequired,
    deleteNote: React.PropTypes.func.isRequired,
}

export default NoteList;
