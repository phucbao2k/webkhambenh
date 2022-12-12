import axios from '../axios';
//import để gửi dữ liệu từ client lên server
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
    //return mục đích để axios lấy thông tin ta muốn gửi từ phía client về server

}

//USER
const getAllUsers = (inputId) => {
    //Đây là Template string
    // $ dùng để access hoặc truy cập vào 1 biến, và hiển thị ra
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    console.log('data from server: ', data);
    return axios.post('/api/create-new-user', data);
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

//CLINIC
const getAllClinic = () => {
    return axios.get('/api/get-clinic')
}
const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const createNewClinicService = (data) => {
    console.log('data from server: ', data);
    return axios.post('/api/create-new-clinic', data);
}
const showAllClinics = (inputId) => {
    return axios.get(`/api/get-all-clinics?id=${inputId}`)
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
//ALLCODE
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}
//DOCTOR
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
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

//appointment
const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}
const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}
//SPECIALTY
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
const createNewSpecialtyService = (data) => {
    console.log('data from server: ', data);
    return axios.post('/api/create-new-specialty', data)
}
const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`)
}
const showAllSpecialties = (inputId) => {
    return axios.get(`/api/get-all-specialties?id=${inputId}`)
}
const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}
//HANDBOOK
const getAllDetailHandbookById = (data) => {
    return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}`)
}

const getAllHandbook = () => {
    return axios.get('/api/get-handbook')
}
const createNewHandbookService = (data) => {
    console.log('data from server: ', data);
    return axios.post('/api/create-new-handbook', data)
}
const deleteHandbookService = (handbookId) => {
    return axios.delete('/api/delete-handbook', {
        data: {
            id: handbookId
        }
    })
}
const editHandbookService = (inputData) => {
    return axios.put('/api/edit-handbook', inputData
    );
}
const showAllHandbooks = (inputId) => {
    return axios.get(`/api/get-all-handbooks?id=${inputId}`)
}
//BOOKING
const postSendRemedy = (data) => {
    return axios.post('/api/send-remedy', data)
}
const postCancelRemedy = (data) => {
    return axios.post('/api/cancel-remedy', data)
}
const postCancelPatientRemedy = (data) => {
    return axios.post('/api/cancel-patient-remedy', data)
}
const getAllBookingForAdmin =(data) => {
    return axios.get(`/api/get-all-booking-for-admin?date=${data.date}`)
}
const getAllBookings = (inputId) => {
    //Đây là Template string
    // $ dùng để access hoặc truy cập vào 1 biến, và hiển thị ra
    return axios.get(`/api/get-all-bookings?id=${inputId}`)
}
//search
const getSearchBookingForAdminBooking = (phoneNumber) => {
    return axios.get(`/api/get-search-booking-for-admin-booking?phoneNumber=${phoneNumber}`)
}
const getAllBookingForPatient =(data) => {
    return axios.get(`/api/get-all-booking-for-patient?patientId=${data.patientId}&date=${data.date}`)
}
const getAllBookingForAdminBooking = (data) => {
    return axios.get(`/api/get-all-booking-for-admin-booking?statusId=${data.statusId}&date=${data.date}`)
}
const getAllPaidBookingForAdminBooking = (data) => {
    return axios.get(`/api/get-all-paid-booking-for-admin-booking?statusId=${data.statusId}&date=${data.date}`)
}
const postSendSchedule = (data) => {
    return axios.post('/api/send-schedule', data)
}
const postCancelBooking = (data) => {
    return axios.post('/api/cancel-paid-booking', data)
}
//doctor_schedule
const getAllPaidBookingForDoctor = (data) => {
    return axios.get(`/api/get-all-paid-booking-for-doctor?statusId=${data.statusId}&date=${data.date}&doctorId=${data.doctorId}`)
}
const getAllDoneBookingForDoctor = (data) => {
    return axios.get(`/api/get-all-done-booking-for-doctor?statusId=${data.statusId}&date=${data.date}&doctorId=${data.doctorId}`)
}
const postSendDone = (data) => {
    return axios.post('/api/send-done', data)
}
const postReBooking = (data) => {
    return axios.post('/api/re-booking', data)
}
const getHistoryBookingForPatient = (data) => {
    return axios.get(`/api/get-history-booking-for-patient?patientId=${data.patientId}`)
}
const getHistoryBookingForDoctor = (data) => {
    return axios.get(`/api/get-history-booking-for-doctor?doctorId=${data.doctorId}`)
}
const deleteBooking = (bookingId) => {
    return axios.delete('/api/delete-booking', {
        data: {
            id: bookingId
        }
    })
}
const deletePatientBooking = (patientBookingId)=> {
    return axios.delete('/api/delete-patient-booking', {
        data: {
            id: patientBookingId
        }
    })
}
export {
    handleLoginApi,
     getAllUsers,
    createNewUserService,
     deleteUserService,
    editUserService,
     getAllCodeService,
      getTopDoctorHomeService,
    getAllDoctors,
     saveDetailDoctorService,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    createNewSpecialtyService,
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
    editSpecialtyService,
    showAllSpecialties,
    getAllHandbook,
    getAllDetailHandbookById,
    createNewHandbookService,
    deleteHandbookService,
    editHandbookService,
    showAllHandbooks,
    deleteBooking,
    getAllBookings,
    postCancelRemedy,
    deletePatientBooking,
    postCancelPatientRemedy,
    getHistoryBookingForPatient,
    getHistoryBookingForDoctor,
    getAllBookingForAdminBooking,
    getAllPaidBookingForAdminBooking,
    postSendSchedule,
    postCancelBooking,
    getAllPaidBookingForDoctor,
    getAllDoneBookingForDoctor,
    postSendDone,
    postReBooking,
    getSearchBookingForAdminBooking
}//đối với ReactJs, khi export function để nơi khác truy cập, 
//ta không cần export default hay module.export