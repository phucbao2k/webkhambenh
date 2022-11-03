import axios from '../axios';
//import để gửi dữ liệu từ client lên server
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
    //return mục đích để axios lấy thông tin ta muốn gửi từ phía client về server

}
const getAllUsers = (inputId) => {
    //Đây là Template string
    // $ dùng để access hoặc truy cập vào 1 biến, và hiển thị ra
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const showAllClinics = (inputId) => {
    return axios.get(`/api/get-all-clinics?id=${inputId}`)
}
const createNewUserService = (data) => {
    console.log('data from server: ', data);
    return axios.post('/api/create-new-user', data);
}
const createNewClinicService = (data) => {
    console.log('data from server: ', data);
    return axios.post('/api/create-new-clinic', data);
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData
    );
}
const deleteClinicService = (clinicId) => {
    return axios.delete('/api/delete-clinic', {
        data: {
            id: clinicId
        }
    })
}
const editClinicService = (inputData) => {
    return axios.put('/api/edit-clinic', inputData
    );
}
const deleteSpecialtyService = (specialtyId) => {
    return axios.delete('/api/delete-specialty', {
        data: {
            id: specialtyId
        }
    })
}
const editSpecialtyService = (inputData) => {
    return axios.put('/api/edit-specialty', inputData
    );
}
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}
const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctors', data)
}
const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}
const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}
const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}
const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}
const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`)
}
const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const getAllClinic = () => {
    return axios.get('/api/get-clinic')
}
const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const postSendRemedy = (data) => {
    return axios.post('/api/send-remedy', data)
}
const getAllBookingForAdmin =(data) => {
    return axios.get(`/api/get-all-booking-for-admin?date=${data.date}`)
}
const getAllBookingForPatient =(data) => {
    return axios.get(`/api/get-all-booking-for-patient?patientId=${data.patientId}&date=${data.date}`)
}

export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUserService,
    editUserService, getAllCodeService, getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctorService,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getAllDetailSpecialtyById,
    getAllClinic,
    getAllDetailClinicById,
    getAllPatientForDoctor,
    postSendRemedy,
    getAllBookingForAdmin,
    getAllBookingForPatient,
    showAllClinics,
    deleteClinicService,
    editClinicService,
    createNewClinicService,
    deleteSpecialtyService,

}//đối với ReactJs, khi export function để nơi khác truy cập, 
//ta không cần export default hay module.export