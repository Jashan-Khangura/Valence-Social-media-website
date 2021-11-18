import axios from '../../axios-comments';
import * as actionTypes from './actionTypes';

export const HandleAuth = (user) => {
    return {
        type: actionTypes.New_Auth,
        payload: user
    }
}

export const NewPostSuccess = (id, postData) => {
    return {
        type: actionTypes.New_Post_Success,
        payload: {
            data: postData,
            index: id
        }
    }
}

export const NewPostError = (error) => {
    return {
        type: actionTypes.New_Post_Error,
        error: error
    }
}


export const NewPost = (postData) => {
         
          return (dispatch) => {
           axios.post('/Data.json', postData)
           .then(response => {
               dispatch(NewPostSuccess(response.data.name, postData));
           })
           .catch(error => {
               dispatch(NewPostError(error));
           })
          }
  }

  
  export const DeletePostSuccess = (id) => {
    return {
        type: actionTypes.Delete_Post_Success,
        ID: id
    }
}


  export const DeletePost = (ID) => {
        return (dispatch) => {
    axios.delete('/Data/'+ ID + '.json')
    .then(response => {
        console.log(response)
        dispatch(DeletePostSuccess(ID));
    })
    .catch(error => {
        dispatch(DeletePostError(error));
    })
            }
  }


  export const DeletePostError = (error) => {
    return {
        type: actionTypes.Delete_Post_Error,
        error: error
    }
}


  export const FetchPostStart = () => {
    return {
        type: actionTypes.Fetch_Post_Start
    };
};

  export const FetchPostSuccess = (fetchedData) => {
    return {
        type: actionTypes.Fetch_Post_Success,
        payload: fetchedData
    }
}

export const FetchPostError = (error) => {
    return {
        type: actionTypes.Fetch_Post_Error,
        error: error
    }
}
  
export const FetchPost = () => {
    return dispatch => {
        dispatch(FetchPostStart());
        axios.get('/Data.json')
        .then(response => {
            const fetchedData = [];
           for(let key in response.data){
                   fetchedData.push({
                   ...response.data[key],
                   id: key
               });
           }
           dispatch(FetchPostSuccess(fetchedData));
        })
    
        .catch(error => {
            dispatch(FetchPostError(error));
        });
    }
}