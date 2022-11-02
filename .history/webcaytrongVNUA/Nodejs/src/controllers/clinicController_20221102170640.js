import clinicService from '../services/clinicService';
let createClinic = async(req, res) => {
    try{
        let infor = await clinicService.createClinic(req.body);
        return res.status(200).json(
            infor
        )
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })

    }
}
let getAllClinic = async (req, res) => {
    try {
        let infor = await clinicService.getAllClinic();
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })

    }
}
let getDetailClinicById = async (req, res) => {
    try {
        let infor = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })

    }
}
let handleGetAllClinics = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            users: []
        })
    }
    let users = await clinicService.showAllClini(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}
module.exports = {
    createClinic : createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById
}