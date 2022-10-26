import clinicService from '../services/clinicService';
let createClinic = async(req, res) => {
    try{
        let infor = await clinicService.createClinic(req.body);
        return res.status(200).json
    }catch(e){

    }
}