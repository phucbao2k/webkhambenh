import specialtyService from "../services/specialtyService";
let createSpecialty = async(req, res) => {
    try{
let infor = await specialtyService.createSpecialty(req.body);
    }catch(e){

    }
}