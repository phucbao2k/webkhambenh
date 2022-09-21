import doctorService from '../services/doctorService';
let getTopDoctorHome = async(req, res)=>{
    let limit = req.query.limit;
    if(!limit) limit = 10;
    try{
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    }catch(e){
console.log(e);
return res.status(200).json({
    errCode: -1,
    message: 'Error from server...'
})
    }
}
let getAllDoctors = (req, res)=>{
try{

}catch(e){
    console.log(e)
    return res.
}
}
module.exports={
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
}