// action: fetch notes from the database
export const GET_NOTES = 'SET_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const FETCH_NOTE = 'FETCH_ONE_NOTE';
export const EDIT_NOTE = 'FETCH_ONE_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';

export function setNotes(notes){
    return{
        type: GET_NOTES,
        notes
    }
}

export function fetchNote(note){
    return{
        type: FETCH_NOTE,
        note
    }
}

export function addNote(note){
    return{
        type: ADD_NOTE,
        note
    }
}

export function editNote(note){
    return{
        type: EDIT_NOTE,
        note
    }
}

export function removeNote(id){
    return{
        type: REMOVE_NOTE,
        id
    }
}

// handle errors from the server
export function handleResponse(res){
    // everything fine status is 200
    if(res.ok){
        return res.json();
    }else{
        // error status like 404, catch it in where it call this function
        let error = new Error(res.statusText)
        error.res = res;
        throw error;
    }
}


// get all note action, dispatch, this is GET
export function fetchAllNotes(){
    // funtion(dispatch){} -- leanring now
    return dispatch => {
        // next time will try axios
        fetch('/api/notes')
            .then(res => res.json())
            .then(data => dispatch(setNotes(data.notes)));
    }
}

// take id to fetch note
export function fetchOneNote(id){
    // funtion(dispatch){} -- leanring now
    return dispatch => {
        // next time will try axios
        fetch(`/api/notes/${id}`)
            .then(res => res.json())
            .then(data => dispatch(fetchNote(data.note)));
    }
}

// add note action, dispatch. this is POST
export function createNote(data){
    // funtion(dispatch){} -- leanring now
    return dispatch => {
        // fetch make promise, so we need to return
        return fetch('/api/notes/add', {
            method: 'post',
            // fetch can only handle string,so we need change the json to string
            body: JSON.stringify(data),
            // use fetch you have to specify everything, so we need header here
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
        .then(data=>dispatch(addNote(data.note)));
                  
    }
}

// update the note
export function updateNote(data){
    // funtion(dispatch){} -- leanring now
    return dispatch => {
        // fetch make promise, so we need to return
        return fetch(`/api/notes/${data._id}`, {
            method: 'put',
            // fetch can only handle string,so we need change the json to string
            body: JSON.stringify(data),
            // use fetch you have to specify everything, so we need header here
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
        .then(data=>dispatch(editNote(data.note)));
                  
    }
}


// update the note
export function deleteNote(id){
    // funtion(dispatch){} -- leanring now
    return dispatch => {
        // fetch make promise, so we need to return
        return fetch(`/api/notes/${id}`, {
            method: 'delete',
            // use fetch you have to specify everything, so we need header here
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
        .then(data=>dispatch(removeNote(id)));
                  
    }
}
