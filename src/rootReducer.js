// combine all reducers togther
import {combineReducers}  from 'redux'
import notes from './reducers/notes_reducer';


export default combineReducers ({
  notes
});
