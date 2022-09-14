const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    //admin
  FETCH_GENDER_START: 'FETCH_GENDER_START',
  FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
  FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',
  FETCH_POSITION_START: 'FETCH_POSITION_START',
  FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
  FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',
  FETCH_ROLE

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
   USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
   USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
})

export default actionTypes;