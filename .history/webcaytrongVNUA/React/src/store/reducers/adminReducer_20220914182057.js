import actionTypes from '../actions/actionTypes';

const initialState = {
   genders:[],
   roles: [],
   position: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // case actionTypes.ADMIN_LOGIN_SUCCESS:
        //     return {
        //         ...state,
        //         isLoggedIn: true,
        //         adminInfo: action.adminInfo
        //     }
        // case actionTypes.ADMIN_LOGIN_FAIL:
        //     return {
        //         ...state,
        //         isLoggedIn: false,
        //         adminInfo: null
        //     }
        // case actionTypes.PROCESS_LOGOUT:
        //     return {
        //         ...state,
        //         isLoggedIn: false,
        //         adminInfo: null
        //     }
        case actionTypes.FETCH_GENDER_START:
            return{
                ...state,
            }
            case actionTypes.FETCH_GENDER_SUCCESS:
                let copyState= {...state};
                copyState.genders = action.data;
                return{
                    ...copyState,
                }
                case actionTypes.FETCH_GENDER_FAILED:
                    return{
                        ...state,
                    }
                    case actionTypes.FETCH_POSITION_START:
            return{
                ...state,
            }
            case actionTypes.FETCH_POSITION_SUCCESS:
                let copyState1= {...state};
                copyState.positions = action.data;
                return{
                    ...copyState1,
                }
                case actionTypes.FETCH_POSITION_FAILED:
                    return{
                        ...state,
                    }
                    

        default:
            return state;
    }
}

export default adminReducer;