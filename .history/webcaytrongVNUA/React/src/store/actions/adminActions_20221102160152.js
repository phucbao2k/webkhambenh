import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHomeService, getAllDoctors
    , saveDetailDoctorService, getAllSpecialty, getAllClinic, getTopClinicHomeService
} from '../../services/userService';
import { toast } from "react-toastify";

//gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetch error: ', e)
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

//position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetch error: ', e)
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})
//roleid
export const fetchRoleIdStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleIdSuccess(res.data));
            } else {
                dispatch(fetchRoleIdFailed());
            }
        } catch (e) {
            dispatch(fetchRoleIdFailed());
            console.log('fetch error: ', e)
        }
    }
}

export const fetchRoleIdSuccess = (roleIdData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleIdData
})
export const fetchRoleIdFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log(' check create user redux: ', res)
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('check err: ', e)
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
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            let res1 = await getTopDoctorHomeService('');
            console.log("check top: ", res1);
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                toast.error("Failed to fetch all users");
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("Failed to fetch all users");
            dispatch(fetchAllUsersFailed());
            console.log("check fetch users failed: ", e);
        }
    }
};
export const fetchAllClinicStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllClinic("CLINIC");
            let res1 = await getTopClinicHomeService('');
            console.log("check top clinic: ", res1);
            if (res && res.errCode === 0) {
                dispatch(fetchAllClinicSuccess(res.users.reverse()))
            } else {
                toast.error("Failed to fetch all clinics");
                dispatch(fetchAllClinicFailed());
            }
        } catch (e) {
            toast.error("Failed to fetch all clinics");
            dispatch(fetchAllClinicFailed());
            console.log("check fetch clinics failed: ", e);
        }
    }
};
export const fetchAllClinicSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
    users: data
})
export const fetchAllClinicFailed = () => ({
    type: actionTypes.FETCH_ALL_CLINIC_FAILED,
})
export const deleteClinic = (clinicId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteClinicService(clinicId);
            if (res && res.errCode === 0) {
                toast.success('Successfully deleted clinic ');
                dispatch(deleteClinicSuccess());
                dispatch(fetchAllClinicStart());

            } else {
                toast.error("Delete the clinic error!");
                dispatch(deleteClinicFailed());
            }
        } catch (e) {
            toast.error("Delete the clinic error!");
            dispatch(deleteClinicFailed());
            console.log('delete clinic Failed', e)
        }
    }
}
export const deleteClinicSuccess = () => ({
    type: actionTypes.DELETE_CLINIC_SUCCESS
})
export const deleteClinicFailed = () => ({
    type: actionTypes.DELETE_CLINIC_FAILED
});
export const editClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editClinicService(data);
            if (res && res.errCode === 0) {
                toast.success('Successfully edited clinic');
                dispatch(editClinicSuccess())
                dispatch(fetchAllClinicStart());
            } else {
                console.log(res.errCode);
                toast.error('Error editing clinic');
                dispatch(editUserFailed());

            }

        }
        catch (e) {
            toast.error("Update the user error!");
            dispatch(editUserFailed());
            console.log('Edit user failed', e)
        }
    }
}
export const editClinicSuccess = () => ({
    type: actionTypes.EDIT_CLINIC_SUCCESS
})
export const editClinicFailed = () => ({
    type: actionTypes.EDIT_CLINIC_FAILED
})
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})
export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Successfully deleted user ');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());

            } else {
                toast.error("Delete the user error!");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete the user error!");
            dispatch(deleteUserFailed());
            console.log('delete User Failed', e)
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
});
export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Successfully edited user');
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                console.log(res.errCode);
                toast.error('Error editing user');
                dispatch(editUserFailed());

            }

        }
        catch (e) {
            toast.error("Update the user error!");
            dispatch(editUserFailed());
            console.log('Edit user failed', e)
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })

                //trong hàm dispatch kia thì object trên chính là action trong redux
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDocs: res.data
                    //dataDocs được sử dụng ở file adminReducer.js
                })

                //trong hàm dispatch kia thì object trên chính là action trong redux
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
        }
    }
}
export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);

            if (res && res.errCode === 0) {
                toast.success("Update success!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                    dataDocs: res.data
                })

                //trong hàm dispatch kia thì object trên chính là action trong redux
            } else {
                toast.error('Error');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            toast.error('Error');
            console.log('SAVE_DETAIL_DOCTOR_FAILED', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}
export const fetchAllScheduleTimes = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}
export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty("SPECIALTY");
            let resClinic = await getAllClinic("CLINIC");
            if( resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0){
let data ={
    resPrice: resPrice.data,
    resPayment: resPayment.data,
    resProvince: resProvince.data,
    resSpecialty: resSpecialty.data,
    resClinic: resClinic.data
}
dispatch(fetchRequiredDoctorInforSuccess(data))
            }else{
                dispatch(fetchRequiredDoctorInforFailed());  
            }

        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log('fetchRequiredDoctorInforFailed', e);
        }
    }
}
export const fetchRequiredDoctorInforSuccess =(allRequiredData) =>({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
})