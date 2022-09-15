import actionTypes from '../actions/actionTypes';

const initialState = {
   genders:[],
   roleIds: [],
   positions: [],
   isLoadingGenders: false,
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
            let copy1 = {...state};
            copy1.isLoadingGenders = true;
            return{
              ...copy1

                
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
                        let copy2 = {...state};
            copy1.isLoadingGenders = true;
            return{
                ...copy2,
            }
            case actionTypes.FETCH_POSITION_SUCCESS:
                let copyState1= {...state};
                copyState1.positions = action.data;
                return{
                    ...copyState1,
                }
                case actionTypes.FETCH_POSITION_FAILED:
                    return{
                        ...state,
                    }
                    case actionTypes.FETCH_ROLE_START:
                        let copy3 = {...state};
            copy1.isLoadingGenders = true;
                        return{
                            ...copy3,
                        }
                    case actionTypes.FETCH_ROLE_SUCCESS:
                let copyState2= {...state};
                copyState2.roleIds = action.data;
                return{
                    ...copyState2,
                }
                case actionTypes.FETCH_ROLE_FAILED:
                    return{
                        ...state,
                    }

        default:
            return state;
    }
}

export default adminReducer;