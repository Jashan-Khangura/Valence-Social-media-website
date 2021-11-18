import * as actionTypes from '../actions/actionTypes';

const initialState = {
    Data: [],
    loading: false,
    currentUser: ''
}

const reducer = (state = initialState, action) => { 
    switch(action.type){
     
      case actionTypes.New_Auth: 
      return {
        ...state,
        currentUser: action.payload,
        loading:false
      }

        case actionTypes.New_Post_Error: 
        return {
          ...state,
          loading:false
        }

        case actionTypes.New_Post_Success: 
        const {Comment, ImageUrl, Date, User} = action.payload.data;
        const id = action.payload.index;
        return {
         ...state,
         loading: false,
         Data: [
           ...state.Data, 
           {Comment, ImageUrl, Date, User, id},
          ],
        }

        case actionTypes.Delete_Post_Success:  
        return {
            ...state,
            loading: false,
            Data: [state.Data.filter((res) => res.id !== action.ID)]
          }

        
          case actionTypes.Delete_Post_Error: 
          return {
            ...state,
            loading:false
          }

        case actionTypes.Fetch_Post_Start: 
        return {
            ...state,
            loading:true
          }

        case actionTypes.Fetch_Post_Error: 
        return {
            ...state,
            loading:false
          }
  
          case actionTypes.Fetch_Post_Success: 
          return {
           ...state,
           loading: false,
           Data: action.payload
          }

     default: return state;
 }
}

export default reducer;