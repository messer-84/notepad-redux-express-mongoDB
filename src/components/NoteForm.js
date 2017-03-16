import React, { Component } from 'react';

class NoteForm extends Component {
    state = {
        _id: this.props.note ? this.props.note._id : null,
        title: this.props.note ? this.props.note.title : '',
        content: this.props.note ? this.props.note.content : '',
        category: this.props.note ? this.props.note.category : '',
        image:'',
        error: {},
        loading: false,
    }


    // before render
    componentWillReceiveProps = (nextProps) => {
        this.setState({
        _id: nextProps.note._id,
        title: nextProps.note.title,
        content: nextProps.note.content,
        category: nextProps.note.category,
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
            error.title = "*Title required, can't be empty!";          
        }
        if(this.state.content ===''){
            error.content = "*Content required, can't be empty!";          
        }
        if(this.state.category ===''){
            error.category = "*Category required, can't be empty!";          
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
            const {_id, title, content, category} = this.state;
            this.props.createNote({_id, title, content, category})
                .catch((err) => err.response.json().then(
                    // if error , set loading to false
                    ({error}) => this.setState({ error: error, loading: false })));
        }
    };
    
    render() {
        return(
            <div className="contianer form ">
                <div className="row header">
                    <div className="col-md-8 col-md-offset-5">
                        <h1>Write Your Note</h1>
                        <div className="titleline-icon"></div>
                    </div>                  
                </div>
                <div className="row content center-block">
                    <div className="col-md-8 col-md-offset-3">
                        <form  onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className='form-group'>
                                        <input name='title' value={this.state.title} onChange={this.handleChange} className="form-control" placeholder="Your Name *"/>
                                        <span className="inputError">{this.state.error.title}</span>
                                    </div>
                                    <div className='form-group'>
                                        <input name="category" value={this.state.category} onChange={this.handleChange} className="form-control second" placeholder="Note Category *"/>
                                        <span className="inputError">{this.state.error.category}</span>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className='form-group'>
                                        <textarea name='content' className="form-control" placeholder="Your Notes *" value={this.state.content} onChange={this.handleChange}></textarea>
                                         <span className="inputError">{this.state.error.content}</span>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-md-12 col-md-offset-4">
                                    <button type="submit" className="send">Send Note</button>
                                </div>
                            </div>    
                    </form>
                </div>                
            </div>
        </div>
     
        );
    }
}
 
export default NoteForm;