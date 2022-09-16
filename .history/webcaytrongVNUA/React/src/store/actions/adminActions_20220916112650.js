import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers,
deleteUserService } from '../../services/userService';
import {toast} from "react-toastify";
//gender
export const fetchGenderStart = () =>{
    return async(dispatch, getState)=>{
        try{
            dispatch({type: actionTypes.FETCH_GENDER_START});
let res = await getAllCodeService("GENDER");
if(res && res.errCode === 0){
    dispatch(fetchGenderSuccess(res.data));
}else{
    dispatch(fetchGenderFailed());
}
        }catch(e){
            dispatch(fetchGenderFailed());
            console.log('fetch error: ', e)
        }
    }
}
export const fetchGenderSuccess =(genderData)=>({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed =()=>({
    type: actionTypes.FETCH_GENDER_FAILED,
})

//position
export const fetchPositionStart = () =>{
    return async(dispatch, getState)=>{
        try{
let res = await getAllCodeService("POSITION");
if(res && res.errCode === 0){
    dispatch(fetchPositionSuccess(res.data));
}else{
    dispatch(fetchPositionFailed());
}
        }catch(e){
            dispatch(fetchPositionFailed());
            console.log('fetch error: ', e)
        }
    }
}
export const fetchPositionSuccess =(positionData)=>({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed =()=>({
    type: actionTypes.FETCH_POSITION_FAILED,
})
//roleid
export const fetchRoleIdStart = () =>{
    return async(dispatch, getState)=>{
        try{
let res = await getAllCodeService("ROLE");
if(res && res.errCode === 0){
    dispatch(fetchRoleIdSuccess(res.data));
}else{
    dispatch(fetchRoleIdFailed());
}
        }catch(e){
            dispatch(fetchRoleIdFailed());
            console.log('fetch error: ', e)
        }
    }
}

export const fetchRoleIdSuccess =(roleIdData)=>({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleIdData
})
export const fetchRoleIdFailed =()=>({
    type: actionTypes.FETCH_ROLE_FAILED,
})
export const createNewUser = (data)=> {
    return async (dispatch, getState)=>{
        try{
let res = await createNewUserService(data);
console.log('Tạ Bảo Phúc tự làm hết- check create user redux: ', res)
if(res && res.errCode ===0){
    toast.success("Create a new user succeed!")
    dispatch(saveUserSuccess());
    dispatch(fetchAllUsersStart());
}else{
    dispatch(saveUserFailed());
}
        }catch(e){
            dispatch(saveUserFailed());
            console.log('check err: ',e)
        }
    }
}
export const saveUserSuccess = () => ({
    type: 'CREATE_USER_SUCCESS',
})
export const saveUserFailed = () => ({
    type: 'CREATE_USER_FAILED',
});
export const fetchAllUsersStart = () => {
    return async (dispatch, getState)=>{
        try{
            let res = await getAllUsers("ALL");
            if(res && res.errCode === 0){
                dispatch(fetchAllUsersSuccess(res.users.revese()))
            }else{
                toast.error("Failed to fetch all users");
                dispatch(fetchAllUsersFailed());
            }
        }catch(e){
            toast.error("Failed to fetch all users");
            dispatch(fetchAllUsersFailed());
            console.log("check fetch users failed: ", e);
        }
    }
};
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})
export const deleteUser = (userId)=>{
    return async(dispatch, getState)=>{
        try{
let res = await deleteUserService(userId);
if(res && res.errCode ===0){
toast.success('Successfully deleted
}
        }catch(e){

        }
    }
}
