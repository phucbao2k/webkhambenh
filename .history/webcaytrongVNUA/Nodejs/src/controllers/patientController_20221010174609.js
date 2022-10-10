import patientService from '../services/patientService';
let postBookAppointment = async (req, res)=>{
    try{
let infor = await patientService.postBookAppointment(req.body)
    }catch(e){

    }
}