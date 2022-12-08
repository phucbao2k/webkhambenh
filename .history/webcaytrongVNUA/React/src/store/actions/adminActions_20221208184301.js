import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHomeService, getAllDoctors
    , saveDetailDoctorService, getAllSpecialty, getAllClinic, showAllClinics, deleteClinicService,
    editClinicService, createNewClinicService, createNewSpecialtyService, deleteSpecialtyService, editSpecialtyService, showAllSpecialties,
    createNewHandbookService, deleteHandbookService, editHandbookService, showAllHandbooks, deleteBooking, getAllBookings
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

//USER
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
//ADMIN-BOOKING
export const fetchAllBookingAdminStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllBookings("ALL");
            console.log('check data bookings: ', res);
            if (res && res.errCode === 0) {
                dispatch(fetchAllBookingsSuccess(res.bookings.reverse()))
            } else {
                toast.error("Failed to fetch all bookings");
                dispatch(fetchAllBookingsFailed());
            }
        } catch (e) {
            toast.error("Failed to fetch all bookings");
            dispatch(fetchAllBookingsFailed());
            console.log("check fetch bookings failed: ", e);
        }
    }
};
export const fetchAllBookingsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_BOOKING_SUCCESS,
    bookings: data
})
export const fetchAllBookingsFailed = () => ({
    type: actionTypes.FETCH_ALL_BOOKING_FAILED,
})
export const deleteBookingService = (bookingId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteBooking(bookingId);
            if (res && res.errCode === 0) {
                toast.success('Successfully deleted booking ');
                dispatch(deleteBookingSuccess());
                dispatch(fetchAllBookingAdminStart());

            } else {
                toast.error("Delete the booking error!");
                dispatch(deleteBookingFailed());
            }
        } catch (e) {
            toast.error("Delete the booking error!");
            dispatch(deleteBookingFailed());
            console.log('delete Booking Failed', e)
        }
    }
}
export const deleteBookingSuccess = () => ({
    type: actionTypes.DELETE_BOOKING_SUCCESS
})
export const deleteBookingFailed = () => ({
    type: actionTypes.DELETE_BOOKING_FAILED
});
//USER-BOOKING
// export const fetchAllBookingPatientStart = () => {
//     return async (dispatch, getState) => {
//         try {
//             dispatch({ type: actionTypes.FETCH_BOOKING_PATIENT_START })
//             let resPatient = await getAllBookingForPatient("PATIENT");
//             let resPayment = await getAllBookingForPatient("PAYMENT");
//             let resProvince = await getAllCodeService("PROVINCE");
//             let resSpecialty = await getAllSpecialty("SPECIALTY");
//             let resClinic = await getAllClinic("CLINIC");
//             if (resPrice && resPrice.errCode === 0
//                 && resPayment && resPayment.errCode === 0
//                 && resProvince && resProvince.errCode === 0
//                 && resSpecialty && resSpecialty.errCode === 0
//                 && resClinic && resClinic.errCode === 0) {
//                 let data = {
//                     resPrice: resPrice.data,
//                     resPayment: resPayment.data,
//                     resProvince: resProvince.data,
//                     resSpecialty: resSpecialty.data,
//                     resClinic: resClinic.data
//                 }
//                 dispatch(fetchRequiredDoctorInforSuccess(data))
//             } else {
//                 dispatch(fetchRequiredDoctorInforFailed());
//             }

//         } catch (e) {
//             dispatch(fetchRequiredDoctorInforFailed());
//             console.log('fetchRequiredDoctorInforFailed', e);
//         }
//     }
// };
// export const fetchAllPatientBookingsSuccess = (data) => ({
//     type: actionTypes.FETCH_BOOKING_PATIENT_SUCCESS,
//     patientBookings: data
// })
// export const fetchAllPatientBookingsFailed = () => ({
//     type: actionTypes.FETCH_BOOKING_PATIENT_FAILED,
// })
// export const deleteBookingPatientService = (patientBookingId) => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await deletePatientBooking(patientBookingId);
//             if (res && res.errCode === 0) {
//                 toast.success('Successfully deleted booking ');
//                 dispatch(deletePatientBookingSuccess());
//                  dispatch(fetchAllBookingPatientStart());

//             } else {
//                 toast.error("Delete the booking error!");
//                 dispatch(deletePatientBookingFailed());
//             }
//         } catch (e) {
//             toast.error("Delete the booking error!");
//             dispatch(deletePatientBookingFailed());
//             console.log('delete Booking Failed', e)
//         }
//     }
// }
// export const deletePatientBookingSuccess = () => ({
//     type: actionTypes.DELETE_PATIENT_BOOKING_SUCCESS
// })
// export const deletePatientBookingFailed = () => ({
//     type: actionTypes.DELETE_PATIENT_BOOKING_FAILED
// });
//CLINIC
export const createNewClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewClinicService(data);
            console.log(' check create clinic redux: ', res)
            if (res && res.errCode === 0) {
                toast.success("Create a new clinic succeed!")
                dispatch(saveClinicSuccess());
                dispatch(fetchAllClinicStart());
            } else {
                dispatch(saveClinicFailed());
            }
        } catch (e) {
            dispatch(saveClinicFailed());
            console.log('check err: ', e)
        }
    }
}
export const saveClinicSuccess = () => ({
    type: 'CREATE_CLINIC_SUCCESS',
})
export const saveClinicFailed = () => ({
    type: 'CREATE_CLINIC_FAILED',
});
export const fetchAllClinicStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await showAllClinics("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllClinicSuccess(res.clinics.reverse()))
            } else {
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
    clinics: data
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
               
                dispatch(editUserFailed());

            }

        }
        catch (e) {
            toast.error("Update the clinic error!");
            dispatch(editUserFailed());
            console.log('Edit clinic failed', e)
        }
    }
}
export const editClinicSuccess = () => ({
    type: actionTypes.EDIT_CLINIC_SUCCESS
})
export const editClinicFailed = () => ({
    type: actionTypes.EDIT_CLINIC_FAILED
})

//HANDBOOK
export const deleteHandbook = (handbookId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteHandbookService(handbookId);
            if (res && res.errCode === 0) {
                toast.success('Successfully deleted handbook ');
                dispatch(deleteHandbookSuccess());
                dispatch(fetchAllHandbookStart());

            } else {
              
                dispatch(deleteHandbookFailed());
            }
        } catch (e) {
            toast.error("Delete the handbook error!");
            dispatch(deleteHandbookFailed());
            console.log('delete handbook Failed', e)
        }
    }
}
export const deleteHandbookSuccess = () => ({
    type: actionTypes.DELETE_HANDBOOK_SUCCESS
})
export const deleteHandbookFailed = () => ({
    type: actionTypes.DELETE_HANDBOOK_FAILED
});
export const createNewHandbook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewHandbookService(data);
            console.log(' check create handbook redux: ', res)
            if (res && res.errCode === 0) {
                toast.success("Create a new handbook succeed!")
                dispatch(saveHandbookSuccess());
                dispatch(fetchAllHandbookStart());
            } else {
                dispatch(saveHandbookFailed());
            }
        } catch (e) {
            dispatch(saveHandbookFailed());
            console.log('check err: ', e)
        }
    }
}
export const saveHandbookSuccess = () => ({
    type: 'CREATE_HANDBOOK_SUCCESS',
})
export const saveHandbookFailed = () => ({
    type: 'CREATE_HANDBOOK_FAILED',
});
export const editHandbook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editHandbookService(data);
            if (res && res.errCode === 0) {
                toast.success('Successfully edited handbook');
                dispatch(editHandbookSuccess())
                dispatch(fetchAllHandbookStart());
            } else {
                console.log(res.errCode);

            }

        }
        catch (e) {
           
            dispatch(editHandbookFailed());
            console.log('Edit handbook failed', e)
        }
    }
}
export const editHandbookSuccess = () => ({
    type: actionTypes.EDIT_HANBOOK_SUCCESS
})
export const editHandbookFailed = () => ({
    type: actionTypes.EDIT_HANBOOK_FAILED
})
export const fetchAllHandbookStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await showAllHandbooks("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllHandbookSuccess(res.handbooks.reverse()))
            } else {
                dispatch(fetchAllHandbookFailed());
            }
        } catch (e) {
            toast.error("Failed to fetch all handbooks");
            dispatch(fetchAllHandbookFailed());
            console.log("check fetch handbooks failed: ", e);
        }
    }
};
export const fetchAllHandbookSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_HANDBOOK_SUCCESS,
    handbooks: data
})
export const fetchAllHandbookFailed = () => ({
    type: actionTypes.FETCH_ALL_HANDBOOK_FAILED,
})

//SPECIALTY
export const createNewSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewSpecialtyService(data);
            console.log(' check create specialty redux: ', res)
            if (res && res.errCode === 0) {
                toast.success("Create a new specialty succeed!")
                dispatch(saveSpecialtySuccess());
                dispatch(fetchAllSpecialtyStart());
            } else {
                dispatch(saveSpecialtyFailed());
            }
        } catch (e) {
            dispatch(saveSpecialtyFailed());
            console.log('check err: ', e)
        }
    }
}
export const saveSpecialtySuccess = () => ({
    type: 'CREATE_SPECIALTY_SUCCESS',
})
export const saveSpecialtyFailed = () => ({
    type: 'CREATE_SPECIALTY_FAILED',
});
export const fetchAllSpecialtyStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await showAllSpecialties("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllSpecialtySuccess(res.specialties.reverse()))
            } else {
                dispatch(fetchAllSpecialtyFailed());
            }
        } catch (e) {
            toast.error("Failed to fetch all specialties");
            dispatch(fetchAllSpecialtyFailed());
            console.log("check fetch specialties failed: ", e);
        }
    }
};
export const fetchAllSpecialtySuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
    specialties: data
})
export const fetchAllSpecialtyFailed = () => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_FAILED,
})
export const deleteSpecialty = (specialtyId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteSpecialtyService(specialtyId);
            if (res && res.errCode === 0) {
                toast.success('Successfully deleted specialty ');
                dispatch(deleteSpecialtySuccess());
                dispatch(fetchAllSpecialtyStart());

            } else {

                dispatch(deleteSpecialtyFailed());
            }
        } catch (e) {
            toast.error("Delete the specialty error!");
            dispatch(deleteSpecialtyFailed());
            console.log('delete specialty Failed', e)
        }
    }
}
export const deleteSpecialtySuccess = () => ({
    type: actionTypes.DELETE_SPECIALTY_SUCCESS
})
export const deleteSpecialtyFailed = () => ({
    type: actionTypes.DELETE_SPECIALTY_FAILED
});
export const editSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editSpecialtyService(data);
            if (res && res.errCode === 0) {
                toast.success('Successfully edited specialty');
                dispatch(editSpecialtySuccess())
                dispatch(fetchAllSpecialtyStart());
            } else {
                console.log(res.errCode);

                dispatch(editSpecialtyFailed());

            }

        }
        catch (e) {
            toast.error("Update the specialty error!");
            dispatch(editSpecialtyFailed());
            console.log('Edit specialty failed', e)
        }
    }
}
export const editSpecialtySuccess = () => ({
    type: actionTypes.EDIT_SPECIALTY_SUCCESS
})
export const editSpecialtyFailed = () => ({
    type: actionTypes.EDIT_SPECIALTY_FAILED
})

//TOP_DOCTOR
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
//DOCTOR
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


export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            //gán giá trị các biến res mới bằng giá trị biến res trong nodeJS với điều kiện trả về cụ thể.
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

//SCHEDULE
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
