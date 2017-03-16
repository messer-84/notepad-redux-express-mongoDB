import { GET_NOTES, ADD_NOTE, FETCH_NOTE, EDIT_NOTE, REMOVE_NOTE, GET_NOTE_USER } from '../actions/actions';
// reducers take tow arguments:
// 1. current state
// 2. action to change the state
export default function notes_reducer (state =[], action= {}) {
  // depends what action type (what action?)
  switch(action.type){
    //doing some to change the state
    case GET_NOTES:
      return action.notes;

    case ADD_NOTE:
      return [
        ...state,
        action.note
      ];

    case EDIT_NOTE:
      // replace the old note to the new one from action
      return state.map(item=>{
        if(item._id === action.note._id){
          return action.note;
        }else{
          return item;
        }
      })

      case GET_NOTE_USER:
      // replace the old note to the new one from action
        return action.notes;

    case REMOVE_NOTE:
      // filter out all note which is not the choosen one
      // only left the one with the same id of action returned
      return state.filter(item=>item._id !== action.id);
        

    case FETCH_NOTE:
      // check the state see if note item already exist
      const index = state.findIndex(item=>item._id === action.note._id);
      if(index >= 0){
        // if exist, send back the orinal one
        return state.map(item=>{
          if(item._id === action.note._id){
            return item;
          }
          return action.note;
        });
      }else{
        // otherwise return the fetch one
        return [
          ...state,
          action.note
        ]
      }

    default: 
      return state; // return the new state
  }
}
