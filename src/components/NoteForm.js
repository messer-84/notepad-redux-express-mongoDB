import React, { Component } from 'react';
import classnames from 'classnames'; // use to combain class names



class NoteForm extends Component {
    state = {
        _id: this.props.note ? this.props.note._id : null,
        title: this.props.note ? this.props.note.title : '',
        content: this.props.note ? this.props.note.content : '',
        image:'',
        error: {},
        loading: false,
    }

    // before render
    componentWillReceiveProps = (nextProps) => {
        this.setState({
        _id: nextProps.note._id,
        title: nextProps.note.title,
        content: nextProps.note.content
    });
  }



    // handle the change of the filed value
    // we pass in event, event's target is the element
    handleChange = (e) => {  
        if (!!this.state.error[e.target.name]) {
            let error = Object.assign({}, this.state.error);
            delete error[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                error: error
        });
        } else {
            this.setState({ 
                [e.target.name]: e.target.value 
            });
        }
    }

    // prevent the default form submit
    // validation, we pnlu submit one the note is not exist
    handleSubmit = (e) => {
        e.preventDefault();
        let error = {};
        if(this.state.title ===''){
            error.title = "Title required, can't be empty!";          
        }
        if(this.state.content ===''){
            error.content = "Content required, can't be empty!";          
        }

        this.setState({
            error: error
        });

        const isValid = Object.keys(error).length === 0;
        //add validation to the form
        if(isValid){
            // when form is valid. then we loading the page for POST
            this.setState({loading: true});
            // call addNote action function
            const {_id, title, content} = this.state;
            this.props.createNote({_id, title, content})
                .catch((err) => err.response.json().then(
                    // if error , set loading to false
                    ({error}) => this.setState({ error: error, loading: false })));
        }
    };
    
    render() {
        return (
            <form className="ui form" onSubmit={this.handleSubmit}>
                <h1>Add New Note</h1>
                {!!this.state.error.global  && <div className="ui negative message">
                <p>{this.state.error.global }</p></div>}
                <div className={classnames('field', {error: !!this.state.error.title})}>
                    <lable htmlFor="title">Title</lable>
                    <input id="title" name='title' value={this.state.title} onChange={this.handleChange}/>
                    <span>{this.state.error.title}</span>
                </div>

                <div className={classnames('field', {error: !!this.state.error.content})}>
                    <lable htmlFor="content">Content</lable>
                <textarea id="content" name='content' value={this.state.content} onChange={this.handleChange}/>
                <span>{this.state.error.content}</span>
                </div>
                
                <div className="field">
                    <button className="ui primary button">Save</button>
                </div>
            </form>          
        );
    }
}
 
export default NoteForm;