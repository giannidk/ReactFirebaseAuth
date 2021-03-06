import { auth } from '../firebase';

import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER,
    SET_LOGGED_USER,
    GET_LOGIN_STATE
} from './types';


export const setLoggedInState = (user) => {
  return (dispatch) => {
    dispatch(
      { type: SET_LOGGED_USER,
        payload: user
      }
    );
  }
}

export const getLoggedInState = () => {
  return (dispatch) => {
    dispatch({ type: GET_LOGIN_STATE });
    auth.onAuthStateChanged((user) => {
      if(user){
        dispatch(
          { type: SET_LOGGED_USER,
            payload: user
          }
        );
      }
      else{
        console.log('NO USER');
        dispatch({
            type: LOGOUT_USER      
        });
      } 
       
  });
}
}





export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};



export const loginUser = ({ email, password }, callback ) => {
  console.log(email, password)
  return(dispatch) => {
    dispatch({ type: LOGIN_USER });
    auth.signInWithEmailAndPassword(email, password)
    .then(
      user => { 
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: user
        });
        callback();
      },
      error => { 
        console.log( error.message );        
        dispatch({ 
          type: LOGIN_USER_FAIL,
          error: error.message 
        });
      }
    )
  }
}

export const logoutUser = (callback) => {
  console.log('LOGOUT FROM ACTION');
    return (dispatch) => {
      auth.signOut();
        dispatch({
            type: LOGOUT_USER      
        });
          callback();
    };
};
