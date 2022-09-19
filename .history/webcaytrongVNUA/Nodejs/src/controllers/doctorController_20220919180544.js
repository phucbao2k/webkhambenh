import doctorService from '../services/doctorService';
let getTopDoctorHome = async(req, res)=>{
    let limit = req.query.limit;
    if(!limit) limit = 10;
    try{
        let response = await doctorService.getTopDoctorHome(+limit);
        return response.
    }catch(e){

    }
}